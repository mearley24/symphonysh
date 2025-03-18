
import { supabase } from "../../../../integrations/supabase/client";

// Utility function to get base URL for Supabase edge functions
export function getEdgeFunctionsBaseUrl(): string {
  // First check if we're using the Supabase client from integrations
  const supabaseClientUrl = "https://symphonysh.supabase.co";
  
  if (supabaseClientUrl) {
    // Remove trailing slash if present
    const cleanUrl = supabaseClientUrl.replace(/\/$/, '');
    const baseUrl = `${cleanUrl}/functions/v1`;
    console.log("Using Supabase URL from client:", baseUrl);
    return baseUrl;
  }
  
  // Fallback to env variables if client URL isn't available (this is unlikely to happen now)
  let baseUrl = import.meta.env.VITE_SUPABASE_FUNCTIONS_URL;
  
  if (!baseUrl) {
    // If VITE_SUPABASE_FUNCTIONS_URL is not set, try to construct it from VITE_SUPABASE_URL
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    if (supabaseUrl) {
      // Remove trailing slash if present
      const cleanUrl = supabaseUrl.replace(/\/$/, '');
      baseUrl = `${cleanUrl}/functions/v1`;
      console.log("Constructed functions URL from Supabase URL:", baseUrl);
    } else {
      console.error("No Supabase URL available to construct functions URL");
      throw new Error("Missing Supabase URL configuration. Please check your environment variables.");
    }
  }
  
  // Ensure the URL doesn't have a trailing slash
  return baseUrl ? baseUrl.replace(/\/$/, '') : '';
}

// Utility function to get auth token
export async function getAuthToken(): Promise<string | null> {
  const { data: sessionData } = await supabase.auth.getSession();
  return sessionData?.session?.access_token || null;
}

// Function to create a request with timeout
export function createRequestWithTimeout(
  url: string, 
  options: RequestInit, 
  timeoutMs: number = 7000
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
    
    fetch(url, {
      ...options,
      signal: controller.signal
    })
    .then((response) => {
      clearTimeout(timeoutId);
      resolve(response);
    })
    .catch((error) => {
      clearTimeout(timeoutId);
      if (error.name === 'AbortError') {
        reject(new Error("Request timed out. The server might be unavailable."));
      } else {
        reject(error);
      }
    });
  });
}
