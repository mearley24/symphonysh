
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
        refresh_token: tokens.refresh_token,
        expiry: new Date(tokens.expiry_date).toISOString(),
      }
    ]);
    
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
    // Get authorization code from URL
    const url = new URL(req.url);
    const code = url.searchParams.get('code');
    
    if (!code) {
      throw new Error('No authorization code provided');
    }
    
    // Exchange code for tokens
    const oauth2Client = getOAuth2Client();
    const { tokens } = await oauth2Client.getToken(code);
    
    // Save tokens to database
    await saveTokens(tokens);
    
    // Return success page
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Google Calendar Connected</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
          .container {
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-top: 40px;
          }
          h1 {
            color: #2c7be5;
          }
          .success-icon {
            color: #28a745;
            font-size: 64px;
            margin-bottom: 20px;
          }
          p {
            margin-bottom: 20px;
          }
          button {
            background-color: #2c7be5;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }
          button:hover {
            background-color: #1a68d1;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success-icon">✓</div>
          <h1>Google Calendar Connected Successfully!</h1>
          <p>Your Symphony Smart Homes app is now connected to Google Calendar. New appointments will automatically be added to your calendar.</p>
          <p>You can close this window and return to your application.</p>
          <button onclick="window.close()">Close Window</button>
        </div>
      </body>
      </html>
    `;
    
    return new Response(html, {
      headers: { "Content-Type": "text/html" },
      status: 200,
    });
  } catch (error) {
    console.error('Function error:', error.message);
    
    // Return error page
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>Connection Error</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            text-align: center;
          }
          .container {
            background-color: #f9f9f9;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
            margin-top: 40px;
          }
          h1 {
            color: #dc3545;
          }
          .error-icon {
            color: #dc3545;
            font-size: 64px;
            margin-bottom: 20px;
          }
          p {
            margin-bottom: 20px;
          }
          pre {
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 4px;
            overflow-x: auto;
            text-align: left;
          }
          button {
            background-color: #2c7be5;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 16px;
          }
          button:hover {
            background-color: #1a68d1;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error-icon">✗</div>
          <h1>Connection Error</h1>
          <p>There was a problem connecting to Google Calendar:</p>
          <pre>${error.message}</pre>
          <p>Please try again or contact support if the problem persists.</p>
          <button onclick="window.close()">Close Window</button>
        </div>
      </body>
      </html>
    `;
    
    return new Response(html, {
      headers: { "Content-Type": "text/html" },
      status: 500,
    });
  }
});
