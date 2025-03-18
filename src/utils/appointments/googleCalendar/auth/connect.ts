
import { getEdgeFunctionsBaseUrl, getAuthToken, createRequestWithTimeout } from './utils';
import { supabase } from "@/integrations/supabase/client";

// Function to redirect to Google Auth page
export async function connectToGoogleCalendar() {
  try {
    console.log("Starting Google Calendar connection process");
    
    // Get the base URL for edge functions
    const baseUrl = getEdgeFunctionsBaseUrl();
    
    if (!baseUrl) {
      console.error("No base URL available for functions");
      throw new Error("Could not determine the Edge Functions URL. Please check your configuration.");
    }
    
    const functionUrl = `${baseUrl}/google-auth`;
    console.log("Calling Google auth URL:", functionUrl);
    
    // Get the auth token
    const accessToken = await getAuthToken();
    
    if (!accessToken) {
      console.warn("No access token available for authorization");
    }
    
    // Use fetch with timeout
    const response = await createRequestWithTimeout(
      functionUrl,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken ? `Bearer ${accessToken}` : ''
        },
        body: JSON.stringify({ redirect: true })
      }
    );
    
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
  } catch (error) {
    console.error("Failed to connect to Google Calendar:", error);
    console.error("Error details:", error instanceof Error ? error.stack : "No stack trace");
    throw error;
  }
}
