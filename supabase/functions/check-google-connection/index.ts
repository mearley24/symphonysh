
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { google } from "npm:googleapis@127.0.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Google OAuth Configuration
const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID") || "";
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET") || "";
const REDIRECT_URI = `${supabaseUrl}/functions/v1/google-auth-callback`;

// Debug info
console.log("Check Google Connection function initialized");
console.log("Supabase URL:", supabaseUrl);
console.log("Client ID available:", GOOGLE_CLIENT_ID ? "Yes" : "No");
console.log("Client Secret available:", GOOGLE_CLIENT_SECRET ? "Yes" : "No");
console.log("Client Secret length:", GOOGLE_CLIENT_SECRET ? GOOGLE_CLIENT_SECRET.length : 0);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Get Google OAuth2 client
function getOAuth2Client() {
  console.log("Creating OAuth2 client for connection check");
  
  if (!GOOGLE_CLIENT_ID) {
    console.error("Missing Google OAuth Client ID");
    throw new Error("Google OAuth Client ID is not configured");
  }
  
  if (!GOOGLE_CLIENT_SECRET) {
    console.error("Missing Google OAuth Client Secret");
    throw new Error("Google OAuth Client Secret is not configured");
  }
  
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
  );
}

// Check if user has valid Google Calendar tokens
async function checkCalendarConnection(userId) {
  try {
    console.log("Checking calendar connection for user:", userId);
    
    // Get tokens from database
    const { data, error } = await supabase
      .from('google_calendar_tokens')
      .select('*')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      console.error("Error getting tokens:", error);
      return { connected: false, error: "No saved tokens found" };
    }
    
    if (!data || !data.access_token) {
      console.log("No tokens found for user");
      return { connected: false, reason: "no_tokens" };
    }
    
    console.log("Tokens found, verifying with Google API");
    
    // Set up OAuth client with existing tokens
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      expiry_date: data.expiry_date,
      token_type: data.token_type,
      scope: data.scope
    });
    
    // Create Calendar API client
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    // Test API access by listing calendars
    try {
      const response = await calendar.calendarList.list({
        maxResults: 1
      });
      
      console.log("Successfully connected to Google Calendar API");
      
      return { 
        connected: true, 
        calendars: response.data.items?.length || 0,
        email: data.email || "unknown"
      };
    } catch (apiError) {
      console.error("API error:", apiError);
      
      // Check if token needs refresh
      if (apiError.code === 401 || 
          (apiError.message && apiError.message.includes("invalid_token"))) {
        if (data.refresh_token) {
          console.log("Token expired, needs refresh");
          return { connected: false, needsRefresh: true };
        } else {
          console.log("Token expired, no refresh token available");
          return { connected: false, reason: "token_expired_no_refresh" };
        }
      }
      
      return { connected: false, error: apiError.message };
    }
  } catch (error) {
    console.error("Error checking calendar connection:", error);
    return { connected: false, error: error.message };
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    console.log("Check Google connection function triggered:", req.method);
    
    // For a simple check without user authentication
    if (req.method === "GET") {
      // Just verify we can access the credentials
      if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
        return new Response(JSON.stringify({
          status: "ok",
          credentialsConfigured: true,
          message: "Function is accessible and credentials are configured"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      } else {
        return new Response(JSON.stringify({
          status: "error",
          credentialsConfigured: false,
          clientIdPresent: !!GOOGLE_CLIENT_ID,
          clientSecretPresent: !!GOOGLE_CLIENT_SECRET,
          message: "Google OAuth credentials are not fully configured"
        }), {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        });
      }
    }
    
    // Get user ID from JWT
    let userId = "anonymous";
    try {
      const authHeader = req.headers.get("Authorization");
      if (authHeader) {
        const token = authHeader.replace("Bearer ", "");
        const { data: { user }, error } = await supabase.auth.getUser(token);
        
        if (error) {
          console.warn("Error getting user from token:", error);
        } else if (user) {
          userId = user.id;
          console.log("User identified:", userId);
        }
      } else {
        console.log("No Authorization header present");
      }
    } catch (e) {
      console.warn("Error processing auth header:", e);
    }
    
    // Check connection status
    const connectionStatus = await checkCalendarConnection(userId);
    
    return new Response(JSON.stringify(connectionStatus), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Function error:', error.message, error.stack);
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        stack: error.stack,
        googleClientIdAvailable: !!GOOGLE_CLIENT_ID,
        googleClientSecretAvailable: !!GOOGLE_CLIENT_SECRET,
        googleClientSecretLength: GOOGLE_CLIENT_SECRET ? GOOGLE_CLIENT_SECRET.length : 0,
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
