
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";
import { google } from "npm:googleapis@126.0.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Default time slots if we can't connect to Google Calendar
const DEFAULT_TIME_SLOTS = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

// Business hours
const BUSINESS_START_HOUR = 9; // 9 AM
const BUSINESS_END_HOUR = 17;  // 5 PM
const APPOINTMENT_DURATION = 60; // Duration in minutes

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

async function getGoogleAuthClient() {
  // Get the most recent refresh token from database
  const { data: tokens, error } = await supabase
    .from("google_tokens")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !tokens || tokens.length === 0) {
    console.error("No Google tokens found:", error);
    return null;
  }

  const token = tokens[0];
  
  // Create OAuth2 client
  const oauth2Client = new google.auth.OAuth2(
    Deno.env.get("GOOGLE_OAUTH_CLIENT_ID"),
    Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET"),
    `${supabaseUrl}/functions/v1/google-auth-callback`
  );

  // Set credentials
  oauth2Client.setCredentials({
    refresh_token: token.refresh_token,
    access_token: token.access_token,
    expiry_date: new Date(token.expiry).getTime(),
  });

  // Check if token is expired and refresh if needed
  if (new Date().getTime() > new Date(token.expiry).getTime()) {
    try {
      console.log("Token expired, refreshing...");
      const response = await oauth2Client.refreshAccessToken();
      const newTokens = response.credentials;
      
      // Update token in database
      await supabase
        .from("google_tokens")
        .update({
          access_token: newTokens.access_token,
          expiry: new Date(newTokens.expiry_date).toISOString(),
        })
        .eq("id", token.id);
        
      console.log("Token refreshed successfully");
    } catch (refreshError) {
      console.error("Failed to refresh token:", refreshError);
      return null;
    }
  }

  return oauth2Client;
}

async function checkGoogleCalendarAvailability(date: string) {
  try {
    const auth = await getGoogleAuthClient();
    if (!auth) {
      console.warn("Could not get Google auth client, returning default time slots");
      return DEFAULT_TIME_SLOTS;
    }

    const calendar = google.calendar({ version: 'v3', auth });
    
    // Get start and end of the day in the correct timezone
    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59`);
    
    // Get events for the specified date
    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    console.log(`Found ${events.length} events for ${date}`);
    
    // Generate all business hour slots
    const allPossibleSlots = [];
    for (let hour = BUSINESS_START_HOUR; hour < BUSINESS_END_HOUR; hour++) {
      allPossibleSlots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    
    // Mark slots as unavailable if they overlap with events
    const unavailableSlots = new Set();
    
    events.forEach(event => {
      if (event.start?.dateTime && event.end?.dateTime) {
        const eventStart = new Date(event.start.dateTime);
        const eventEnd = new Date(event.end.dateTime);
        
        // Check all slots to see if they overlap with this event
        allPossibleSlots.forEach(slot => {
          const [slotHour, slotMinute] = slot.split(':').map(Number);
          
          const slotStart = new Date(startOfDay);
          slotStart.setHours(slotHour, slotMinute, 0);
          
          const slotEnd = new Date(slotStart);
          slotEnd.setMinutes(slotStart.getMinutes() + APPOINTMENT_DURATION);
          
          // If slot overlaps with event, mark as unavailable
          if (
            (slotStart >= eventStart && slotStart < eventEnd) ||
            (slotEnd > eventStart && slotEnd <= eventEnd) ||
            (slotStart <= eventStart && slotEnd >= eventEnd)
          ) {
            unavailableSlots.add(slot);
          }
        });
      }
    });
    
    // Filter available slots
    const availableSlots = allPossibleSlots.filter(slot => !unavailableSlots.has(slot));
    console.log("Available slots from Google Calendar:", availableSlots);
    
    return availableSlots.length > 0 ? availableSlots : DEFAULT_TIME_SLOTS;
  } catch (error) {
    console.error("Error checking Google Calendar:", error);
    return DEFAULT_TIME_SLOTS;
  }
}

async function getBookedAppointmentTimes(date: string) {
  try {
    // Get all appointments for the specified date
    const { data: appointments, error } = await supabase
      .from("appointments")
      .select("time")
      .eq("date", date)
      .not("status", "eq", "cancelled");
    
    if (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
    
    // Format times as HH:MM
    return appointments.map(app => {
      const timeStr = app.time;
      // Handle different time formats
      if (timeStr.includes(":")) {
        const [hours, minutes] = timeStr.split(":");
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      }
      return timeStr;
    });
  } catch (error) {
    console.error("Error processing appointments:", error);
    return [];
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }
  
  try {
    // Parse the request body
    const requestData = await req.json();
    const { date } = requestData;
    
    if (!date) {
      return new Response(
        JSON.stringify({ error: "Date is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    
    console.log(`Processing available slots for date: ${date}`);
    
    // Get slots that are available in Google Calendar
    const calendarAvailableSlots = await checkGoogleCalendarAvailability(date);
    
    // Get slots that are already booked in our database
    const bookedAppointmentTimes = await getBookedAppointmentTimes(date);
    console.log("Booked appointment times:", bookedAppointmentTimes);
    
    // Filter out booked slots
    const availableSlots = calendarAvailableSlots.filter(
      slot => !bookedAppointmentTimes.includes(slot)
    );
    
    console.log("Final available slots:", availableSlots);
    
    return new Response(
      JSON.stringify({ availableSlots }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
