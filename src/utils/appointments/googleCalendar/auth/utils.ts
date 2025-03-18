
import { supabase } from "@/integrations/supabase/client";

// Get the base URL for Supabase Edge Functions
export function getEdgeFunctionsBaseUrl(): string | null {
  try {
    // Use the hardcoded Supabase URL
    const supabaseUrl = "https://symphonysh.supabase.co";
    
    if (supabaseUrl) {
      // Remove trailing slash if present
      const cleanUrl = supabaseUrl.replace(/\/$/, '');
      const baseUrl = `${cleanUrl}/functions/v1`;
      console.log("Using Supabase URL:", baseUrl);
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
  timeoutMs: number = 10000 // Default 10 second timeout
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
    
    // Log request details for debugging
    console.log(`Sending request to: ${url}`);
    console.log(`Request method: ${options.method}`);
    console.log(`Request headers:`, options.headers);
    
    const response = await fetch(url, requestOptions);
    clearTimeout(timeoutId);
    
    // Log response details
    console.log(`Response status: ${response.status}`);
    
    return response;
  } catch (e) {
    clearTimeout(timeoutId);
    if (e.name === 'AbortError') {
      console.error("Request timed out:", url);
      throw new Error("Request timed out. The server might be unavailable.");
    }
    console.error("Request error:", e);
    throw e;
  }
}
