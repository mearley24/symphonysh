
import { supabase } from "../../integrations/supabase/client";
import { AppointmentNotificationPayload } from "./types";

// Create calendar event for the appointment
export async function createCalendarEvent(appointment: any, serviceName: string): Promise<any> {
  console.log("Creating calendar event...");
  try {
    // Create a clean copy of the payload for calendar function
    const calendarPayload: AppointmentNotificationPayload = {
      appointment: {
        id: appointment?.id,
        date: appointment?.date,
        time: appointment?.time,
        name: appointment?.name,
        email: appointment?.email,
        phone: appointment?.phone,
        message: appointment?.message,
        service: serviceName
      }
    };
    
    console.log("Calendar payload:", JSON.stringify(calendarPayload, null, 2));
    
    const calendarResponse = await supabase.functions.invoke('create-calendar-event', {
      method: 'POST',
      body: calendarPayload
    });
    
    if (calendarResponse?.error) {
      console.error("Calendar error:", calendarResponse.error);
      // Don't throw to avoid failing the appointment process
      return null;
    } else if (calendarResponse) {
      console.log("Calendar event created:", calendarResponse.data);
      return calendarResponse.data;
    }
  } catch (calendarInvocationError) {
    console.error("Calendar function invocation error:", calendarInvocationError);
    console.log("Continuing despite calendar function error");
    // Don't throw here to avoid failing the appointment process
  }
  return null;
}
