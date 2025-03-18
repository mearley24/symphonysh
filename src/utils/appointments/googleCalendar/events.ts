
import { format } from "date-fns";
import { supabase } from "../../../integrations/supabase/client";

// Create a Google Calendar event for the appointment
export async function createCalendarEvent(appointmentData: any, serviceName: string) {
  try {
    console.log("Creating Google Calendar event...");
    
    const { date, selectedTime, name, email, phone, message } = appointmentData;
    
    const eventData = {
      appointment: {
        id: appointmentData.id,
        date: format(new Date(date), 'yyyy-MM-dd'),
        time: selectedTime,
        name,
        email,
        phone,
        message: message || "",
        service: serviceName
      }
    };
    
    const { data, error } = await supabase.functions.invoke('create-calendar-event', {
      method: 'POST',
      body: eventData
    });
    
    if (error) {
      console.error("Failed to create calendar event:", error);
      throw error;
    }
    
    console.log("Calendar event created:", data);
    return data;
  } catch (error) {
    console.error("Failed to create Google Calendar event:", error);
    throw error;
  }
}
