
import { AppointmentNotificationPayload } from "./types";

// Create calendar event for the appointment
export async function createCalendarEvent(appointment: any, serviceName: string): Promise<any> {
  console.log("Creating calendar event...");
  try {
    // Create a simple calendar event object
    return {
      id: appointment?.id || "appointment-" + Date.now(),
      htmlLink: "#",
      status: "created"
    };
  } catch (calendarInvocationError) {
    console.error("Calendar function invocation error:", calendarInvocationError);
    console.log("Continuing despite calendar function error");
    // Don't throw here to avoid failing the appointment process
  }
  return null;
}
