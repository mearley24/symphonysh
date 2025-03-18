
import { formatEventDescription } from "./utils.ts";

// Create a calendar event
export async function createCalendarEvent(appointment: any) {
  try {
    console.log("Creating calendar event for appointment:", appointment);
    
    // Parse date and time
    const [year, month, day] = appointment.date.split('-').map(Number);
    const [hours, minutes] = appointment.time.split(':').map(Number);
    
    // Create start and end time (1 hour duration)
    const startTime = new Date(year, month - 1, day, hours, minutes);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000); // Add 1 hour
    
    // Format event description
    const description = formatEventDescription(appointment);
    
    // Return a simplified calendar event object (no longer using Google Calendar)
    return {
      id: crypto.randomUUID(),
      summary: `Symphony Smart Homes: ${appointment.service} Consultation`,
      description: description,
      htmlLink: "#",
      start: {
        dateTime: startTime.toISOString(),
      },
      end: {
        dateTime: endTime.toISOString(),
      },
      attendees: [
        { email: appointment.email, displayName: appointment.name },
        { email: "info@symphonysh.com" }
      ]
    };
  } catch (error) {
    console.error("Failed to create calendar event:", error);
    throw error;
  }
}
