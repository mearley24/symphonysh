
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import { google } from "npm:googleapis@127.0.0";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Google OAuth Credentials
const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_OAUTH_CLIENT_ID") || "";
const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_OAUTH_CLIENT_SECRET") || "";

// Debug info
console.log("Function initialization");
console.log("Supabase URL:", supabaseUrl);
console.log("Client ID available:", GOOGLE_CLIENT_ID ? "Yes" : "No");
console.log("Client Secret available:", GOOGLE_CLIENT_SECRET ? "Yes" : "No");

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Get Google OAuth2 client
function getOAuth2Client() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
    console.error("Missing Google OAuth credentials");
    throw new Error("Google OAuth credentials are not configured properly");
  }
  
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    `${supabaseUrl}/functions/v1/google-auth-callback`
  );
}

// Test Google token validity
async function testTokenValidity(accessToken: string) {
  try {
    const oauth2Client = getOAuth2Client();
    oauth2Client.setCredentials({
      access_token: accessToken
    });
    
    const calendar = google.calendar({ version: 'v3', auth: oauth2Client });
    
    // Try a simple calendar API call to test the token
    await calendar.calendarList.list({ maxResults: 1 });
    return true;
  } catch (error) {
    console.error("Error testing token validity:", error);
    return false;
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
    console.log("Checking Google Calendar connection");
    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);
    
    // Check if we have active tokens in the database
    const { data: tokens, error } = await supabase
      .from("google_tokens")
      .select("id, access_token, refresh_token, expiry")
      .order("created_at", { ascending: false })
      .limit(1);
    
    if (error) {
      console.error("Error checking Google tokens:", error);
      throw error;
    }
    
    console.log("Token query result:", tokens ? "Found tokens" : "No tokens found");
    
    const connected = tokens && tokens.length > 0 && 
                      tokens[0].access_token && 
                      tokens[0].refresh_token;
    
    // Also check if the token is expired
    let isExpired = false;
    let isValid = false;
    
    if (connected && tokens[0].expiry) {
      const expiryDate = new Date(tokens[0].expiry);
      isExpired = expiryDate < new Date();
      console.log("Token expiry status:", { expiry: tokens[0].expiry, isExpired });
      
      if (!isExpired) {
        // Test if the token is still valid by making a simple API call
        isValid = await testTokenValidity(tokens[0].access_token);
        console.log("Token validity test result:", isValid);
      }
    }
    
    return new Response(
      JSON.stringify({ 
        connected: connected && !isExpired && isValid,
        needsRefresh: connected && (isExpired || !isValid),
        tokenInfo: connected ? {
          hasAccessToken: !!tokens[0].access_token,
          hasRefreshToken: !!tokens[0].refresh_token,
          expiry: tokens[0].expiry,
          isValid
        } : null
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Function error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
