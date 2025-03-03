
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

// Frontend URL for redirecting back after auth
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") || "http://localhost:5173";

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
  try {
    console.log("Saving tokens to database");
    
    // Check if we already have tokens stored
    const { data: existingTokens } = await supabase
      .from("google_tokens")
      .select("*")
      .limit(1);
    
    if (existingTokens && existingTokens.length > 0) {
      // Update existing token
      const { data, error } = await supabase
        .from("google_tokens")
        .update({
          access_token: tokens.access_token,
          refresh_token: tokens.refresh_token || existingTokens[0].refresh_token, // Keep existing refresh token if not provided
          expiry: new Date(tokens.expiry_date).toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq("id", existingTokens[0].id)
        .select();
        
      if (error) {
        console.error('Error updating tokens:', error);
        throw new Error('Failed to update tokens');
      }
      
      return data;
    } else {
      // Insert new token
      const { data, error } = await supabase
        .from("google_tokens")
        .insert([
          {
            access_token: tokens.access_token,
            refresh_token: tokens.refresh_token || "", 
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
  } catch (error) {
    console.error("Error saving tokens:", error);
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
    console.log("Google auth callback received");
    
    // Check if this is a POST request from our client-side code
    if (req.method === "POST") {
      const { code } = await req.json();
      
      if (!code) {
        throw new Error('No authorization code provided');
      }
      
      console.log("Exchanging code for tokens");
      
      // Exchange code for tokens
      const oauth2Client = getOAuth2Client();
      const { tokens } = await oauth2Client.getToken(code);
      
      console.log("Tokens received from Google");
      
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
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    
    // Handle errors from Google Auth
    if (error) {
      console.error('Google auth error:', error);
      
      // Redirect back to app with error parameter
      const redirectUrl = new URL('/scheduling', FRONTEND_URL);
      redirectUrl.searchParams.set('error', error);
      redirectUrl.searchParams.set('state', 'google_auth');
      
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          "Location": redirectUrl.toString()
        }
      });
    }
    
    if (!code) {
      throw new Error('No authorization code provided');
    }
    
    if (state !== 'google_auth') {
      throw new Error('Invalid state parameter');
    }
    
    console.log("Received auth code, redirecting to frontend");
    
    // For the direct browser callback, we redirect back to our app
    // with the code as a query parameter so our app can complete the flow
    const redirectUrl = new URL('/scheduling', FRONTEND_URL);
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
