
import { supabase } from "@/integrations/supabase/client";

// Get the base URL for Supabase Edge Functions
export function getEdgeFunctionsBaseUrl(): string | null {
  try {
    // Use the hardcoded URL from the supabase client
    const supabaseUrl = "https://symphonysh.supabase.co";
    
    if (supabaseUrl) {
      // Remove trailing slash if present
      const cleanUrl = supabaseUrl.replace(/\/$/, '');
      const baseUrl = `${cleanUrl}/functions/v1`;
      console.log("Using Supabase URL from client config:", baseUrl);
      return baseUrl;
    }
    
    console.error("No Supabase URL available");
    return null;
  } catch (error) {
    console.error("Error getting Edge Functions base URL:", error);
    return null;
  }
}

// Get auth token
export async function getAuthToken(): Promise<string | null> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const accessToken = sessionData?.session?.access_token;
    return accessToken || null;
  } catch (error) {
    console.error("Error getting auth token:", error);
    return null;
  }
}

// Create a request with timeout
export async function createRequestWithTimeout(
  url: string, 
  options: RequestInit,
  timeoutMs: number = 7000 // Default 7 second timeout
): Promise<Response> {
  // Create an abort controller for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  
  try {
    // Add the signal to options
    const requestOptions = {
      ...options,
      signal: controller.signal
    };
    
    const response = await fetch(url, requestOptions);
    clearTimeout(timeoutId);
    return response;
  } catch (e) {
    clearTimeout(timeoutId);
    if (e.name === 'AbortError') {
      throw new Error("Request timed out. The server might be unavailable.");
    }
    throw e;
  }
}
