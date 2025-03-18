
import { getEdgeFunctionsBaseUrl, getAuthToken, createRequestWithTimeout } from './utils';

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
      }
    );
    
    if (!response.ok) {
      console.error("Error completing Google auth, status:", response.status);
      throw new Error(`Error response: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("Google auth completed successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to complete Google auth:", error);
    console.error("Error details:", error instanceof Error ? error.stack : "No stack trace");
    throw error;
  }
}
