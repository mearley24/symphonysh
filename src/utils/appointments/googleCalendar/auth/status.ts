
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
    
    // Use request with timeout
    const response = await createRequestWithTimeout(
      functionUrl,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': accessToken ? `Bearer ${accessToken}` : ''
        }
      },
      5000 // 5 second timeout
    );
    
    if (!response.ok) {
      console.error("Error checking Google Calendar connection, status:", response.status);
      return false;
    }
    
    const data = await response.json();
    console.log("Google Calendar connection check result:", data);
    return data?.connected === true;
  } catch (error) {
    console.error("Failed to check Google Calendar connection:", error);
    console.error("Error details:", error instanceof Error ? error.stack : "No stack trace");
    return false;
  }
}
