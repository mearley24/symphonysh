
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
const FRONTEND_URL = Deno.env.get("FRONTEND_URL") || supabaseUrl;

// Debug info
console.log("Google Auth Callback initialized");
console.log("Supabase URL:", supabaseUrl);
console.log("Redirect URI:", REDIRECT_URI);
console.log("Client ID available:", GOOGLE_CLIENT_ID ? "Yes" : "No");
console.log("Client Secret available:", GOOGLE_CLIENT_SECRET ? "Yes" : "No");
console.log("Client Secret length:", GOOGLE_CLIENT_SECRET ? GOOGLE_CLIENT_SECRET.length : 0);
console.log("Frontend URL:", FRONTEND_URL);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Get Google OAuth2 client
function getOAuth2Client() {
  console.log("Creating OAuth2 client for token exchange");
  
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

// Save token to Supabase
async function saveTokenToSupabase(userId, tokens) {
  try {
    console.log("Saving tokens to Supabase for user:", userId);
    
    // Check if the tokens object has the expected properties
    if (!tokens.access_token) {
      console.error("Invalid tokens object:", tokens);
      throw new Error("Invalid token response from Google");
    }
    
    // Store tokens in the database
    const { error } = await supabase
      .from('google_calendar_tokens')
      .upsert({
        user_id: userId,
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token || null,
        expiry_date: tokens.expiry_date,
        token_type: tokens.token_type,
        scope: tokens.scope
      }, {
        onConflict: 'user_id'
      });
    
    if (error) {
      console.error("Error saving tokens to Supabase:", error);
      throw error;
    }
    
    console.log("Tokens saved successfully");
    return { success: true };
  } catch (error) {
    console.error("Failed to save tokens:", error);
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
    console.log("Google auth callback function triggered:", req.method);
    
    if (req.method === "GET") {
      console.log("GET request not supported for this function, redirecting to frontend");
      return new Response(null, {
        status: 302,
        headers: {
          ...corsHeaders,
          "Location": `${FRONTEND_URL}/scheduling?success=true&state=google_auth`
        }
      });
    }
    
    // Must be a POST request after this point
    if (req.method !== "POST") {
      console.error("Unsupported method:", req.method);
      return new Response(JSON.stringify({
        error: "Method not allowed"
      }), {
        status: 405,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    // Parse the request body
    let body;
    try {
      body = await req.json();
      console.log("Request body received:", { code: body.code ? "PRESENT" : "MISSING" });
    } catch (e) {
      console.error("Error parsing request body:", e);
      return new Response(JSON.stringify({
        error: "Invalid request body"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    // Verify we have an authorization code
    if (!body.code) {
      console.error("No authorization code provided in request");
      return new Response(JSON.stringify({
        error: "Authorization code is required"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    // Initialize the OAuth2 client
    const oauth2Client = getOAuth2Client();
    
    // Exchange authorization code for tokens
    console.log("Exchanging authorization code for tokens");
    let tokens;
    try {
      const { tokens: googleTokens } = await oauth2Client.getToken(body.code);
      tokens = googleTokens;
      console.log("Tokens received successfully");
      
      // Log token details but not the actual tokens for security
      console.log("Token details:", {
        access_token: "PRESENT",
        refresh_token: tokens.refresh_token ? "PRESENT" : "MISSING",
        expiry_date: tokens.expiry_date,
        token_type: tokens.token_type,
        scope: tokens.scope
      });
    } catch (error) {
      console.error("Error exchanging code for tokens:", error);
      let errorMessage = "Failed to exchange authorization code for tokens";
      
      if (error.message) {
        errorMessage += `: ${error.message}`;
      }
      
      return new Response(JSON.stringify({
        error: errorMessage,
        details: error.message,
        code: "token_exchange_failed"
      }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    // Get user ID from JWT (if available)
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
    
    // Save tokens to Supabase
    try {
      await saveTokenToSupabase(userId, tokens);
    } catch (error) {
      console.error("Error saving tokens:", error);
      return new Response(JSON.stringify({
        error: "Failed to save tokens",
        details: error.message
      }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      });
    }
    
    // Return success response
    return new Response(JSON.stringify({
      message: "Google Calendar connected successfully",
      success: true
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Function error:', error.message, error.stack);
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        stack: error.stack
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
