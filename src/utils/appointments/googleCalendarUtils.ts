
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
    
    const { data, error } = await supabase.functions.invoke('google-auth', {
      method: 'GET'
    });
    
    if (error) {
      console.error("Error connecting to Google Calendar:", error);
      throw error;
    }
    
    if (data && data.authUrl) {
      console.log("Got auth URL, redirecting:", data.authUrl);
      
      // Show warning about test mode
      const isTestMode = true; // This is currently always true since the app is in testing
      
      if (isTestMode) {
        console.warn("Google OAuth app is in test mode. Only test users can authenticate.");
        alert("Important: This app's Google integration is in test mode. You'll need to use a Google account that's been added as a test user.\n\n" +
              "To complete Google verification, you'll need to:\n" +
              "1. Create a demo video showing how your app uses Google Calendar\n" +
              "2. Provide a privacy policy\n" +
              "3. Submit for verification in Google Cloud Console\n\n" +
              "If you see an 'app hasn't been verified' warning, click 'Continue' (it's safe for testing).");
      }
      
      // Redirect to Google Auth URL in the same window for better auth flow
      window.location.href = data.authUrl;
      return true;
    }
    
    throw new Error("Failed to get Google auth URL");
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
    // Handle the access_denied error specifically
    if (error === 'access_denied') {
      alert("Authentication was denied. This may happen if you're not a test user for this application or if you declined to give permission.\n\n" +
            "To verify your Google OAuth app, you need to:\n" +
            "- Create a demonstration video showing how your app uses Google Calendar\n" +
            "- Provide a privacy policy URL\n" +
            "- Complete all required fields in the OAuth consent screen\n" +
            "- Submit for verification in Google Cloud Console");
      return { error: 'access_denied' };
    }
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
    
    const { data, error } = await supabase.functions.invoke('google-auth-callback', {
      method: 'POST',
      body: { code }
    });
    
    if (error) {
      console.error("Error completing Google auth:", error);
      throw error;
    }
    
    console.log("Google auth completed successfully:", data);
    return data;
  } catch (error) {
    console.error("Failed to complete Google auth:", error);
    throw error;
  }
}
