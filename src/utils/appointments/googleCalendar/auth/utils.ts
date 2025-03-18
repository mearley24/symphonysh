
import { supabase } from "@/integrations/supabase/client";

// Get the base URL for Supabase Edge Functions
export function getEdgeFunctionsBaseUrl(): string | null {
  try {
    // First, try to use the hardcoded URL from the supabase client
    const supabaseUrl = "https://symphonysh.supabase.co";
    
    if (supabaseUrl) {
      // Remove trailing slash if present
      const cleanUrl = supabaseUrl.replace(/\/$/, '');
      const baseUrl = `${cleanUrl}/functions/v1`;
      console.log("Using Supabase URL from client config:", baseUrl);
      return baseUrl;
    }
    
    // Fallback to environment variables if available
    const envUrl = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
    if (envUrl) {
      const cleanUrl = envUrl.replace(/\/$/, '');
      console.log("Using Supabase URL from env:", cleanUrl);
      return cleanUrl;
    }
    
    // Last resort, try to get it from the Supabase URL env var
    const supabaseEnvUrl = import.meta.env.VITE_SUPABASE_URL;
    if (supabaseEnvUrl) {
      const cleanUrl = supabaseEnvUrl.replace(/\/$/, '');
      const baseUrl = `${cleanUrl}/functions/v1`;
      console.log("Using constructed Supabase URL from env:", baseUrl);
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
