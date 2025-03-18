
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
    
    // Try direct fetch to test if the function exists
    try {
      console.log("Testing if the function endpoint is accessible");
      const testResponse = await fetch(`${functionUrl}`, { 
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`Function test response status: ${testResponse.status}`);
      
      if (testResponse.status === 404) {
        console.error("Function endpoint not found - 404 error");
        throw new Error("The Google authentication function could not be found. Please ensure Edge Functions are deployed correctly.");
      }
      
      // If we got a response, try to redirect directly
      if (testResponse.ok) {
        const data = await testResponse.json();
        console.log("Auth response data:", data);
        
        if (data && data.authUrl) {
          console.log("Redirecting to Google auth URL:", data.authUrl);
          window.location.href = data.authUrl;
          return true;
        }
      }
    } catch (testError) {
      console.error("Function test error:", testError);
      throw new Error(`Edge Function error: ${testError.message}. The Supabase Edge Functions may not be deployed.`);
    }
    
    // If code reaches here, something went wrong
    throw new Error("Could not connect to Google Calendar service. Edge Function may not be deployed correctly.");
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
