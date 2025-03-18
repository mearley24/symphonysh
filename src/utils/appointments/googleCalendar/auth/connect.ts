
import { getEdgeFunctionsBaseUrl, getAuthToken, createRequestWithTimeout } from './utils';

// Function to redirect to Google Auth page
export async function connectToGoogleCalendar() {
  try {
    console.log("Starting Google Calendar connection process");
    
    // Get the base URL for edge functions
    const baseUrl = getEdgeFunctionsBaseUrl();
    
    console.log("Using Supabase URL:", baseUrl);
    
    if (!baseUrl) {
      console.error("No base URL available for functions");
      throw new Error("Could not determine the Edge Functions URL. Please check your configuration.");
    }
    
    const functionUrl = `${baseUrl}/google-auth`;
    console.log("Calling Google auth URL:", functionUrl);
    
    // Get the auth token
    const accessToken = await getAuthToken();
    
    if (!accessToken) {
      console.warn("No access token available for authorization - continuing anyway");
    }
    
    // Try direct redirect approach first
    try {
      console.log("Attempting direct redirect");
      const redirectUrl = `${functionUrl}?redirect=true`;
      console.log("Redirecting to:", redirectUrl);
      window.location.href = redirectUrl;
      return true;
    } catch (directRedirectError) {
      console.error("Direct redirect failed, falling back to API call:", directRedirectError);
      
      // Fall back to API call
      const response = await createRequestWithTimeout(
        functionUrl,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': accessToken ? `Bearer ${accessToken}` : ''
          },
          body: JSON.stringify({ redirect: true })
        },
        15000 // Increased timeout to 15 seconds for auth requests
      );
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error getting Google auth URL, status:", response.status);
        console.error("Error response:", errorText);
        throw new Error(`Error response: ${response.status} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log("Auth response data:", data);
      
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
    }
  } catch (error) {
    console.error("Failed to connect to Google Calendar:", error);
    
    let errorMessage = "Unknown error connecting to Google Calendar";
    
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Error details:", error.stack || "No stack trace available");
    }
    
    throw new Error(errorMessage);
  }
}
