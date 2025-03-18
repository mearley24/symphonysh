
import { google } from "npm:googleapis@127.0.0";
import { getGoogleAuthClient } from "./googleAuth.ts";
import { formatEventDescription } from "./utils.ts";

// Create a calendar event
export async function createCalendarEvent(appointment: any) {
  try {
    console.log("Creating calendar event for appointment:", appointment);
    
    const auth = await getGoogleAuthClient();
    const calendar = google.calendar({ version: 'v3', auth });
    
    // Parse date and time
    const [year, month, day] = appointment.date.split('-').map(Number);
    const [hours, minutes] = appointment.time.split(':').map(Number);
    
    // Create start and end time (1 hour duration)
    const startTime = new Date(year, month - 1, day, hours, minutes);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Add 1 hour
    
    // Format event description
    const description = formatEventDescription(appointment);
    
    // Create event
    console.log("Creating event with start time:", startTime.toISOString());
    console.log("End time:", endTime.toISOString());
    
    const event = {
      summary: `Symphony Smart Homes: ${appointment.service} Consultation`,
      location: 'Symphony Smart Homes Office',
      description: description,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'America/Denver',
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'America/Denver',
      },
      attendees: [
        { email: appointment.email, displayName: appointment.name },
        { email: 'info@symphonysh.com' } // Company email
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 }, // 1 day before
          { method: 'popup', minutes: 60 }      // 1 hour before
        ],
      },
    };
    
    // Insert the event
    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      sendUpdates: 'all', // Send email notifications to attendees
    });
    
    console.log("Calendar event created successfully:", response.data.htmlLink);
    return response.data;
  } catch (error) {
    console.error("Failed to create calendar event:", error);
    throw error;
  }
}
