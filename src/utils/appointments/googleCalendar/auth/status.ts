
import { getEdgeFunctionsBaseUrl, getAuthToken, createRequestWithTimeout } from './utils';

// Utility function to check if Google Calendar is connected
export async function isGoogleCalendarConnected(): Promise<boolean> {
  try {
    console.log("Checking Google Calendar connection status");
    
    const baseUrl = getEdgeFunctionsBaseUrl();
    
    if (!baseUrl) {
      console.error("No base URL available for functions");
      return false;
    }
    
    const functionUrl = `${baseUrl}/check-google-connection`;
    console.log("Checking connection URL:", functionUrl);
    
    // Get the auth token
    const accessToken = await getAuthToken();
    
    // Use request with timeout with a longer timeout
    const response = await createRequestWithTimeout(
      functionUrl,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken ? `Bearer ${accessToken}` : ''
        }
      },
      20000 // 20 second timeout to give more time for Supabase Edge Function cold starts
    );
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error checking Google Calendar connection, status:", response.status);
      console.error("Error response:", errorText);
      
      // For 500+ errors, the Edge Function might not be deployed or available
      if (response.status >= 500) {
        console.error("Edge Function might not be available");
      }
      
      return false;
    }
    
    try {
      const data = await response.json();
      console.log("Google Calendar connection check result:", data);
      
      // Check if connected and not needing refresh
      if (data?.connected === true) {
        console.log("Google Calendar is connected");
        return true;
      } else if (data?.needsRefresh === true) {
        console.log("Google Calendar token needs refresh");
        // We'll report not connected so the user can reconnect
        return false;
      }
    } catch (jsonError) {
      console.error("Error parsing response JSON:", jsonError);
      return false;
    }
    
    return false;
  } catch (error) {
    console.error("Failed to check Google Calendar connection:", error);
    console.error("Error details:", error instanceof Error ? error.stack : "No stack trace");
    
    // Don't throw, just return false - connection checking shouldn't break the UI
    return false;
  }
}
