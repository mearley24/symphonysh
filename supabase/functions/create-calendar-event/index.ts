
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { google } from "npm:googleapis@127.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Google OAuth Credentials
const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID") || "";
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET") || "";
const REDIRECT_URI = "https://bxsdjxkbhjtdrrtjtyto.supabase.co/functions/v1/google-auth-callback";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Service name lookup
function getServiceName(serviceId: string) {
  const services = {
    "home-integration": "Home Automation",
    "audio-entertainment": "Audio & Entertainment",
    "smart-lighting": "Smart Lighting",
    "shades": "Smart Shades",
    "networking": "Networking",
    "climate-control": "Climate Control",
    "security-systems": "Security Systems",
    "maintenance": "Troubleshooting & Maintenance",
    "matterport-scan": "Matterport Scan",
  };
  
  return services[serviceId as keyof typeof services] || serviceId;
}

// Get Google OAuth2 client
function getOAuth2Client() {
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
  );
}

// Get the latest tokens from the database
async function getLatestTokens() {
  const { data, error } = await supabase
    .from("google_tokens")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    console.error("Error fetching tokens:", error);
    throw new Error("No Google access tokens found");
  }

  return data[0];
}

// Function to update token in database
async function updateToken(id: string, accessToken: string, refreshToken?: string, expiry?: Date) {
  const updates: any = { access_token: accessToken };
  
  if (refreshToken) {
    updates.refresh_token = refreshToken;
  }
  
  if (expiry) {
    updates.expiry = expiry.toISOString();
  }
  
  const { error } = await supabase
    .from("google_tokens")
    .update(updates)
    .eq("id", id);
  
  if (error) {
    console.error("Error updating token:", error);
    throw new Error("Failed to update token");
  }
}

// Get the latest appointment from the database
async function getLatestAppointment() {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error || !data || data.length === 0) {
    console.error("Error fetching appointment:", error);
    throw new Error("No appointments found");
  }

  return data[0];
}

// Create calendar event
async function createCalendarEvent(auth: any, appointment: any) {
  try {
    const calendar = google.calendar({ version: 'v3', auth });
    
    // Parse the date and time
    const [year, month, day] = appointment.date.split('-').map(Number);
    const [hour, minute] = appointment.time.split(':').map(Number);
    
    // Create start and end dates (appointments are 1 hour long)
    const startDate = new Date(year, month - 1, day, hour, minute);
    const endDate = new Date(year, month - 1, day, hour + 1, minute);
    
    const serviceName = getServiceName(appointment.service);
    
    // Create the event
    const event = {
      summary: `Consultation: ${serviceName} with ${appointment.name}`,
      description: `
        Client: ${appointment.name}
        Email: ${appointment.email}
        Phone: ${appointment.phone}
        Service: ${serviceName}
        ${appointment.message ? `\nNotes: ${appointment.message}` : ''}
      `,
      start: {
        dateTime: startDate.toISOString(),
        timeZone: 'America/New_York',
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: 'America/New_York',
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };
    
    const result = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
    });
    
    console.log('Event created: %s', result.data.htmlLink);
    return result.data;
  } catch (error) {
    console.error('Error creating calendar event:', error);
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
    // Get the latest tokens and appointment
    const tokens = await getLatestTokens();
    const appointment = await getLatestAppointment();
    
    // Set up OAuth client with tokens
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({
      access_token: tokens.access_token,
      refresh_token: tokens.refresh_token,
      expiry_date: new Date(tokens.expiry).getTime(),
    });
    
    // Set up token refresh callback
    oauth2Client.on('tokens', (tokens) => {
      if (tokens.access_token) {
        console.log('New access token received');
        updateToken(
          tokens.refresh_token ? undefined : tokens.id,
          tokens.access_token,
          tokens.refresh_token,
          tokens.expiry_date ? new Date(tokens.expiry_date) : undefined
        );
      }
    });
    
    // Create the calendar event
    const event = await createCalendarEvent(oauth2Client, appointment);
    
    return new Response(JSON.stringify({ success: true, event }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Function error:', error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
