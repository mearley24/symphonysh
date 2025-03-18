
// This file is kept for backward compatibility
// Now we're using email notifications with calendar attachments instead of Google Calendar

import { getEdgeFunctionsBaseUrl } from './utils';

// Function previously used to redirect to Google Auth page
// Now we just log that we're using email notifications instead
export async function connectToGoogleCalendar() {
  try {
    console.log("Using email notifications instead of Google Calendar");
    
    // Show a notification to the user that we're now using email notifications
    if (typeof window !== 'undefined') {
      window.alert("Calendar functionality now uses email notifications with calendar attachments. No Google authentication needed!");
    }
    
    return false;
  } catch (error) {
    console.error("Error in connectToGoogleCalendar:", error);
    throw new Error("Email notification system error. Please try again later.");
  }
}
