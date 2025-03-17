
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { google } from "npm:googleapis@127.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Get Google OAuth2 client
async function getGoogleAuthClient() {
  console.log("Getting Google auth client");
  
  // Get the most recent tokens from the database
  const { data: tokens, error } = await supabase
    .from("google_tokens")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !tokens || tokens.length === 0) {
    console.error("No Google tokens found:", error);
    throw new Error("No Google authentication tokens found. Please connect your Google Calendar first.");
  }

  const token = tokens[0];
  console.log("Found token with expiry:", token.expiry);
  
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
          updated_at: new Date().toISOString()
        })
        .eq("id", token.id);
        
      console.log("Token refreshed successfully");
    } catch (refreshError) {
      console.error("Failed to refresh token:", refreshError);
      throw new Error("Failed to refresh Google authentication token. Please reconnect your Google Calendar.");
    }
  }

  return oauth2Client;
}

// Create a calendar event
async function createCalendarEvent(appointment) {
  try {
    console.log("Creating calendar event for appointment:", appointment);
    
    const auth = await getGoogleAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });
    
    // Parse date and time
    const [year, month, day] = appointment.date.split('-').map(Number);
    const [hours, minutes] = appointment.time.split(':').map(Number);
    
    // Create start and end time (1 hour duration)
    const startTime = new Date(year, month - 1, day, hours, minutes);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Add 1 hour
    
    // Format event description
    const description = `
Name: ${appointment.name}
Email: ${appointment.email}
Phone: ${appointment.phone}
Service: ${appointment.service}
${appointment.message ? `Message: ${appointment.message}` : ''}
`;
    
    // Create event
    console.log("Creating event with start time:", startTime.toISOString());
    console.log("End time:", endTime.toISOString());
    
    const event = {
      summary: `Symphony Smart Homes: ${appointment.service} Consultation`,
      location: 'Symphony Smart Homes Office',
      description: description.trim(),
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'America/Denver',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'America/Denver',
      },
      attendees: [
        { email: appointment.email, displayName: appointment.name },
        { email: 'info@symphonysh.com' } // Company email
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }      // 1 hour before
        ],
      },
    };
    
    // Insert the event
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all', // Send email notifications to attendees
    });
    
    console.log("Calendar event created successfully:", response.data.htmlLink);
    return response.data;
  } catch (error) {
    console.error("Failed to create calendar event:", error);
    throw error;
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
    console.log("Calendar event function triggered");
    
    // Parse the request body
    const requestData = await req.json();
    const { appointment } = requestData;
    
    console.log("Appointment data for calendar:", JSON.stringify(appointment));
    
    if (!appointment) {
      throw new Error("No appointment data provided");
    }
    
    // Create the calendar event
    const calendarEvent = await createCalendarEvent(appointment);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Calendar event created successfully",
        data: {
          eventId: calendarEvent.id,
          eventLink: calendarEvent.htmlLink,
          status: "created"
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Calendar function error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
