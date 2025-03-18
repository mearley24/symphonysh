
import { google } from "npm:googleapis@127.0.0";
import { supabase } from "./utils.ts";

// Get Google OAuth2 client
export async function getGoogleAuthClient() {
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
    `${Deno.env.get("SUPABASE_URL")}/functions/v1/google-auth-callback`
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
