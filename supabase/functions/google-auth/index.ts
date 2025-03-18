
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

// Debug info
console.log("Function initialization");
console.log("Supabase URL:", supabaseUrl);
console.log("Redirect URI:", REDIRECT_URI);
console.log("Client ID available:", GOOGLE_CLIENT_ID ? "Yes" : "No");
console.log("Client Secret available:", GOOGLE_CLIENT_SECRET ? "Yes" : "No");

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Get Google OAuth2 client
function getOAuth2Client() {
  console.log("Getting OAuth2 client");
  
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

// Generate authorization URL
function getAuthUrl() {
  try {
    console.log("Generating auth URL");
    const oauth2Client = getOAuth2Client();
    
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      response_type: 'code',
      scope: [
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.events',
      ],
      prompt: 'consent', // Force to get refresh token
      state: 'google_auth', // Add state parameter to identify this auth request
      include_granted_scopes: true // Include any previously granted scopes
    });
    
    console.log("Auth URL generated successfully");
    return authUrl;
  } catch (error) {
    console.error("Error generating auth URL:", error);
    throw error;
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
    console.log("Google auth function triggered:", req.method);
    console.log("Request URL:", req.url);
    
    // Generate auth URL
    console.log("Generating Google auth URL");
    const authUrl = getAuthUrl();
    console.log("Auth URL generated:", authUrl);
    
    // Handle both GET and POST requests
    let redirect = false;
    
    // For POST requests, parse the body
    if (req.method === "POST") {
      try {
        const body = await req.json();
        console.log("POST request body:", body);
        redirect = body.redirect === true;
      } catch (e) {
        console.error("Error parsing request body:", e);
      }
    } else if (req.method === "GET") {
      // For GET requests, check URL parameters
      const url = new URL(req.url);
      console.log("GET request params:", Object.fromEntries(url.searchParams));
      redirect = url.searchParams.get('redirect') === 'true';
    }
    
    console.log("Redirect flag:", redirect);
    
    // For direct browser access or if redirect flag is true, redirect instead of returning JSON
    if (redirect) {
      console.log("Redirecting to auth URL");
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          "Location": authUrl
        }
      });
    }
    
    console.log("Returning auth URL as JSON");
    return new Response(JSON.stringify({ 
      authUrl,
      note: "This application is in Google OAuth testing mode. Only approved test users can authenticate."
    }), {
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
        redirectUriConfigured: REDIRECT_URI
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
