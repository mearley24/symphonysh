
import { format } from "date-fns";
import { supabase } from "../../integrations/supabase/client";

// Default available time slots
const DEFAULT_TIME_SLOTS = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

// Function to fetch available time slots for a given date
export async function fetchAvailableTimeSlots(date: Date): Promise<string[]> {
  if (!date) {
    return [];
  }
  
  try {
    console.log("Fetching available time slots for:", format(date, 'yyyy-MM-dd'));
    
    // Format the date for the API call
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // Call the Supabase Edge Function to check Google Calendar
    const { data, error } = await supabase.functions.invoke('available-time-slots', {
      method: 'POST',
      body: { date: formattedDate }
    });
    
    if (error) {
      console.error("Error fetching available time slots:", error);
      return DEFAULT_TIME_SLOTS;
    }
    
    if (data && Array.isArray(data.availableSlots)) {
      console.log("Available time slots:", data.availableSlots);
      return data.availableSlots;
    }
    
    // Return default time slots if the API call fails
    return DEFAULT_TIME_SLOTS;
  } catch (error) {
    console.error("Failed to fetch available time slots:", error);
    // Return default time slots in case of error
    return DEFAULT_TIME_SLOTS;
  }
}

// Function to redirect to Google Auth page
export async function connectToGoogleCalendar() {
  try {
    console.log("Starting Google Calendar connection process");
    
    // Directly redirect to Google Auth with the redirect parameter
    // This approach bypasses the API call and directly uses the redirect flow
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://symphonysh.supabase.co";
    const authUrl = `${supabaseUrl}/functions/v1/google-auth?redirect=true`;
    
    console.log("Redirecting to Google auth URL:", authUrl);
    
    // Redirect directly to the Google Auth endpoint with redirect=true
    window.location.href = authUrl;
    return true;
  } catch (error) {
    console.error("Failed to connect to Google Calendar:", error);
    throw error;
  }
}

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
    
    // Direct fetch to the callback function - more reliable than using the SDK
    const functionUrl = `${import.meta.env.VITE_SUPABASE_URL || "https://symphonysh.supabase.co"}/functions/v1/google-auth-callback`;
    console.log("Using callback URL:", functionUrl);
    
    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ code })
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error completing Google auth:", errorText);
      throw new Error(`Failed to complete Google auth: ${response.status} ${errorText}`);
    }
    
    const data = await response.json();
    console.log("Google auth completed successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to complete Google auth:", error);
    throw error;
  }
}

// Utility function to check if Google Calendar is connected
export async function isGoogleCalendarConnected(): Promise<boolean> {
  try {
    const functionUrl = `${import.meta.env.VITE_SUPABASE_URL || "https://symphonysh.supabase.co"}/functions/v1/check-google-connection`;
    
    const response = await fetch(functionUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      return false;
    }
    
    const data = await response.json();
    return data.connected === true;
  } catch (error) {
    console.error("Failed to check Google Calendar connection:", error);
    return false;
  }
}
