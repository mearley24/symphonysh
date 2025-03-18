
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
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") || "http://localhost:8080";

// Debug info
console.log("Function initialization");
console.log("Supabase URL:", supabaseUrl);
console.log("Redirect URI:", REDIRECT_URI);
console.log("Frontend URL:", FRONTEND_URL);
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
    console.log("Request method:", req.method);
    console.log("Request URL:", req.url);
    
    // Check if this is a POST request from our client-side code
    if (req.method === "POST") {
      const { code } = await req.json();
      
      if (!code) {
        throw new Error('No authorization code provided');
      }
      
      console.log("Exchanging code for tokens");
      
      try {
        // Exchange code for tokens
        const oauth2Client = getOAuth2Client();
        console.log("Getting token with code, redirect URI:", REDIRECT_URI);
        
        const { tokens } = await oauth2Client.getToken(code);
        
        console.log("Tokens received from Google:", JSON.stringify({
          access_token_length: tokens.access_token ? tokens.access_token.length : 0,
          refresh_token_exists: !!tokens.refresh_token,
          expiry_date: tokens.expiry_date
        }));
        
        // Save tokens to database
        await saveTokens(tokens);
        
        return new Response(
          JSON.stringify({ success: true, message: "Google Calendar connected successfully" }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 200,
          }
        );
      } catch (tokenError) {
        // Log detailed error information for debugging
        console.error("Token exchange error details:", tokenError);
        let errorDetails = "Unknown error";
        let errorCode = "unknown_error";
        
        if (tokenError instanceof Error) {
          errorDetails = tokenError.message;
          // Try to extract Google's error code if possible
          const errorJson = tokenError.toString().match(/{"error":"([^"]+)"/);
          if (errorJson) {
            errorCode = errorJson[1];
          }
        }
        
        return new Response(
          JSON.stringify({ 
            error: "Failed to exchange code for tokens", 
            details: errorDetails,
            code: errorCode
          }),
          {
            headers: { ...corsHeaders, "Content-Type": "application/json" },
            status: 400,
          }
        );
      }
    }
    
    // Direct browser access - this is called when Google redirects back to us
    // Get authorization code from URL
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    const error_description = url.searchParams.get('error_description');
    
    console.log("Callback params:", { 
      code: !!code, 
      state, 
      error,
      error_description
    });
    
    // Handle errors from Google Auth
    if (error) {
      console.error('Google auth error:', error);
      console.error('Error description:', error_description || 'No description provided');
      
      // Redirect back to app with error parameter
      const redirectUrl = new URL('/scheduling', FRONTEND_URL);
      redirectUrl.searchParams.set('error', error);
      if (error_description) {
        redirectUrl.searchParams.set('error_description', error_description);
      }
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
    
    console.log("Received auth code, exchanging for tokens");
    
    try {
      // Exchange code for tokens immediately
      const oauth2Client = getOAuth2Client();
      console.log("Getting token with code, redirect URI:", REDIRECT_URI);
      
      const { tokens } = await oauth2Client.getToken(code);
      
      console.log("Tokens received from Google:", JSON.stringify({
        access_token_length: tokens.access_token ? tokens.access_token.length : 0,
        refresh_token_exists: !!tokens.refresh_token,
        expiry_date: tokens.expiry_date
      }));
      
      // Save tokens to database
      await saveTokens(tokens);
      
      console.log("Successfully saved tokens, redirecting back to app");
      
      // Redirect back to the app with success parameter
      const redirectUrl = new URL('/scheduling', FRONTEND_URL);
      redirectUrl.searchParams.set('success', 'true');
      redirectUrl.searchParams.set('state', 'google_auth');
      
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          "Location": redirectUrl.toString()
        }
      });
    } catch (tokenError) {
      console.error("Error exchanging code for tokens:", tokenError);
      
      // Log detailed error information
      let errorDetails = "Unknown error";
      let errorCode = "unknown_error";
      
      if (tokenError instanceof Error) {
        errorDetails = tokenError.message;
        console.error("Error stack:", tokenError.stack);
        
        // Try to extract Google's error code if possible
        const errorJson = tokenError.toString().match(/{"error":"([^"]+)"/);
        if (errorJson) {
          errorCode = errorJson[1];
        }
      }
      
      // For token exchange errors, redirect back to app with detailed error info
      const redirectUrl = new URL('/scheduling', FRONTEND_URL);
      redirectUrl.searchParams.set('error', 'token_exchange_failed');
      redirectUrl.searchParams.set('error_details', errorDetails);
      redirectUrl.searchParams.set('error_code', errorCode);
      redirectUrl.searchParams.set('state', 'google_auth');
      
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          "Location": redirectUrl.toString()
        }
      });
    }
  } catch (error) {
    console.error('Function error:', error.message);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack available');
    
    // Return error response
    return new Response(
      JSON.stringify({ 
        error: error.message,
        stack: error instanceof Error ? error.stack : 'No stack available'
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
