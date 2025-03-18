
import { supabase } from "../../../integrations/supabase/client";

// Function to redirect to Google Auth page
export async function connectToGoogleCalendar() {
  try {
    console.log("Starting Google Calendar connection process");
    
    // First check if edge functions are available with a simple timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000); // 7 second timeout
    
    try {
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL || ''}/functions/v1/google-auth`;
      
      // Use fetch directly with the signal for timeout control
      const response = await fetch(
        functionUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await supabase.auth.getSession().then(({ data }) => data.session?.access_token)}`
          },
          signal: controller.signal,
          body: JSON.stringify({ redirect: true })
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error("Error getting Google auth URL, status:", response.status);
        throw new Error(`Error response: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.authUrl) {
        console.log("Redirecting to Google auth URL:", data.authUrl);
        window.location.href = data.authUrl;
        return true;
      } else if (data && data.redirectUrl) {
        console.log("Redirecting to Google auth URL:", data.redirectUrl);
        window.location.href = data.redirectUrl;
        return true;
      } else {
        console.error("Unexpected response format:", data);
        throw new Error("Unexpected response format from the server");
      }
    } catch (e) {
      clearTimeout(timeoutId);
      if (e.name === 'AbortError') {
        throw new Error("Request timed out. The server might be unavailable.");
      }
      throw e;
    }
    
    throw new Error("Failed to get Google auth URL from the server");
  } catch (error) {
    console.error("Failed to connect to Google Calendar:", error);
    console.error("Error details:", error instanceof Error ? error.stack : "No stack trace");
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
    
    // Set a timeout for the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000); // 7 second timeout
    
    try {
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL || ''}/functions/v1/google-auth-callback`;
      
      // Use fetch directly with the signal for timeout control
      const response = await fetch(
        functionUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await supabase.auth.getSession().then(({ data }) => data.session?.access_token)}`
          },
          body: JSON.stringify({ code }),
          signal: controller.signal
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error("Error completing Google auth, status:", response.status);
        throw new Error(`Error response: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Google auth completed successfully:", data);
      return data;
    } catch (e) {
      clearTimeout(timeoutId);
      if (e.name === 'AbortError') {
        throw new Error("Request timed out. The server might be unavailable.");
      }
      throw e;
    }
  } catch (error) {
    console.error("Failed to complete Google auth:", error);
    console.error("Error details:", error instanceof Error ? error.stack : "No stack trace");
    throw error;
  }
}

// Utility function to check if Google Calendar is connected
export async function isGoogleCalendarConnected(): Promise<boolean> {
  try {
    console.log("Checking Google Calendar connection status");
    
    // Set a timeout for the request
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
    
    try {
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL || ''}/functions/v1/check-google-connection`;
      
      // Use direct fetch with signal for timeout
      const response = await fetch(
        functionUrl,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${await supabase.auth.getSession().then(({ data }) => data.session?.access_token)}`
          },
          signal: controller.signal
        }
      );
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        console.error("Error checking Google Calendar connection, status:", response.status);
        return false;
      }
      
      const data = await response.json();
      console.log("Google Calendar connection check result:", data);
      return data?.connected === true;
    } catch (e) {
      clearTimeout(timeoutId);
      if (e.name === 'AbortError') {
        console.error("Request timed out when checking calendar connection");
        return false;
      }
      throw e;
    }
  } catch (error) {
    console.error("Failed to check Google Calendar connection:", error);
    console.error("Error details:", error instanceof Error ? error.stack : "No stack trace");
    return false;
  }
}
