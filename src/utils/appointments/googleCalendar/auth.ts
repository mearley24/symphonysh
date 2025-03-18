
import { supabase } from "../../../integrations/supabase/client";

// Function to redirect to Google Auth page
export async function connectToGoogleCalendar() {
  try {
    console.log("Starting Google Calendar connection process");
    
    const { data, error } = await supabase.functions.invoke('google-auth', {
      method: 'POST',
      body: { redirect: true }
    });
    
    if (error) {
      console.error("Error getting Google auth URL:", error);
      throw error;
    }
    
    if (data && data.authUrl) {
      console.log("Redirecting to Google auth URL:", data.authUrl);
      window.location.href = data.authUrl;
      return true;
    } else if (data && data.redirectUrl) {
      console.log("Redirecting to Google auth URL:", data.redirectUrl);
      window.location.href = data.redirectUrl;
      return true;
    }
    
    throw new Error("Failed to get Google auth URL from the server");
  } catch (error) {
    console.error("Failed to connect to Google Calendar:", error);
    throw error;
  }
}

// Function to check if we're returning from Google auth
export function handleGoogleAuthCallback() {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  
  if (error) {
    console.error("Google auth error:", error);
    return { error };
  }
  
  if (code && state === 'google_auth') {
    console.log("Detected Google auth callback with code, completing auth flow...");
    return completeGoogleAuth(code);
  }
  
  return null;
}

// Function to complete the OAuth flow by exchanging code for token
async function completeGoogleAuth(code: string) {
  try {
    console.log("Completing Google auth with code");
    
    // Use the Supabase SDK to call the callback function
    const { data, error } = await supabase.functions.invoke('google-auth-callback', {
      method: 'POST',
      body: { code }
    });
    
    if (error) {
      console.error("Error completing Google auth:", error);
      throw error;
    }
    
    console.log("Google auth completed successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to complete Google auth:", error);
    throw error;
  }
}

// Utility function to check if Google Calendar is connected
export async function isGoogleCalendarConnected(): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke('check-google-connection', {
      method: 'GET'
    });
    
    if (error) {
      console.error("Error checking Google Calendar connection:", error);
      return false;
    }
    
    return data?.connected === true;
  } catch (error) {
    console.error("Failed to check Google Calendar connection:", error);
    return false;
  }
}
