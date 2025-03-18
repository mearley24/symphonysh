
import { getEdgeFunctionsBaseUrl, getAuthToken, createRequestWithTimeout } from './utils';

// Function to check if we're returning from Google auth
export function handleGoogleAuthCallback() {
  const url = new URL(window.location.href);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  const error_description = url.searchParams.get('error_description');
  const success = url.searchParams.get('success');
  
  console.log("Checking for Google auth callback parameters:");
  console.log("- code exists:", !!code);
  console.log("- state:", state);
  console.log("- error:", error || "none");
  console.log("- error_description:", error_description || "none");
  console.log("- success:", success || "none");
  
  if (error) {
    console.error("Google auth error:", error);
    console.error("Error description:", error_description || "No description provided");
    return { error, error_description };
  }
  
  if (success === 'true' && state === 'google_auth') {
    console.log("Google authentication completed successfully");
    return { success: true };
  }
  
  if (code && state === 'google_auth') {
    console.log("Detected Google auth callback with code, completing auth flow...");
    return { completeAuth: () => completeGoogleAuth(code) };
  }
  
  return null;
}

// Function to complete the OAuth flow by exchanging code for token
async function completeGoogleAuth(code: string) {
  try {
    console.log("Completing Google auth with code");
    
    const baseUrl = getEdgeFunctionsBaseUrl();
    
    if (!baseUrl) {
      console.error("No base URL available for functions");
      throw new Error("Could not determine the Edge Functions URL");
    }
    
    const functionUrl = `${baseUrl}/google-auth-callback`;
    console.log("Calling Google auth callback URL:", functionUrl);
    
    // Get the auth token
    const accessToken = await getAuthToken();
    
    if (!accessToken) {
      console.warn("No access token available for authorization");
    }
    
    // First, let's try to make a simple request to verify the function is accessible
    try {
      const testResponse = await fetch(`${baseUrl}/check-google-connection`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      console.log("Test connection status:", testResponse.status);
    } catch (testError) {
      console.warn("Test connection failed, but continuing with auth flow:", testError);
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
        body: JSON.stringify({ code })
      },
      15000 // 15 second timeout for token exchange
    );
    
    if (!response.ok) {
      let errorText = "";
      try {
        errorText = await response.text();
        console.error("Error completing Google auth, status:", response.status);
        console.error("Error response:", errorText);
      } catch (textError) {
        console.error("Could not read error response text:", textError);
        errorText = "Could not read error response";
      }
      throw new Error(`Error response: ${response.status} - ${errorText}`);
    }
    
    let data;
    try {
      data = await response.json();
      console.log("Google auth completed successfully:", data);
    } catch (jsonError) {
      console.error("Error parsing response JSON:", jsonError);
      throw new Error("Invalid response format from server");
    }
    
    return data;
  } catch (error) {
    console.error("Failed to complete Google auth:", error);
    
    let errorMessage = "Unknown error completing Google authentication";
    
    if (error instanceof Error) {
      errorMessage = error.message;
      console.error("Error details:", error.stack || "No stack trace available");
    }
    
    throw new Error(errorMessage);
  }
}
