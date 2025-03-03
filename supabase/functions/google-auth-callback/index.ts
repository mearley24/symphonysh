
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
const REDIRECT_URI = `${supabaseUrl}/functions/v1/google-auth-callback`;

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Get Google OAuth2 client
function getOAuth2Client() {
  return new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URI
  );
}

// Save tokens to database
async function saveTokens(tokens: any) {
  // Store tokens in database
  const { data, error } = await supabase
    .from("google_tokens")
    .insert([
      {
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token || "", // Some flows might not return refresh token
        expiry: new Date(tokens.expiry_date).toISOString(),
      }
    ])
    .select();
    
  if (error) {
    console.error('Error saving tokens:', error);
    throw new Error('Failed to save tokens');
  }
  
  return data;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Check if this is a POST request from our client-side code
    if (req.method === "POST") {
      const { code } = await req.json();
      
      if (!code) {
        throw new Error('No authorization code provided');
      }
      
      // Exchange code for tokens
      const oauth2Client = getOAuth2Client();
      const { tokens } = await oauth2Client.getToken(code);
      
      // Save tokens to database
      await saveTokens(tokens);
      
      return new Response(
        JSON.stringify({ success: true, message: "Google Calendar connected successfully" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 200,
        }
      );
    }
    
    // Direct browser access - this is called when Google redirects back to us
    // Get authorization code from URL
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    
    if (!code) {
      throw new Error('No authorization code provided');
    }
    
    // For the direct browser callback, we redirect back to our app
    // with the code as a query parameter so our app can complete the flow
    const redirectUrl = new URL('/scheduling', url.origin.replace('/functions/v1/google-auth-callback', ''));
    redirectUrl.searchParams.set('code', code);
    redirectUrl.searchParams.set('state', 'google_auth');
    
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        "Location": redirectUrl.toString()
      }
    });
  } catch (error) {
    console.error('Function error:', error.message);
    
    // Return error response
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
