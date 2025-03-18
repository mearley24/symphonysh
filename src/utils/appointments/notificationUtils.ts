
import { supabase } from "../../integrations/supabase/client";
import { AppointmentNotificationPayload, getServiceName } from "./types";

// Send email notification about the appointment
export async function sendEmailNotification(appointment: any, serviceName: string): Promise<any> {
  console.log("Sending email notification...");
  
  // Create payload object with properly formatted data
  const payload: AppointmentNotificationPayload = {
    appointment: {
      id: appointment?.id || `temp-${Date.now()}`,
      date: appointment?.date,
      time: appointment?.time,
      name: appointment?.name,
      email: appointment?.email,
      phone: appointment?.phone,
      message: appointment?.message || '',
      service: serviceName
    }
  };
  
  console.log("Appointment payload for notification:", JSON.stringify(payload, null, 2));
  
  try {
    console.log("Using Supabase function invoke method for email notifications");
    
    // Direct invoke of notify-appointment function
    const { data, error } = await supabase.functions.invoke('notify-appointment', {
      body: payload
    });
    
    if (error) {
      console.error("Error invoking notify-appointment function:", error);
      throw new Error(`Failed to send notification: ${error.message}`);
    }
    
    console.log("Email notification results:", data);
    return data;
  } catch (error) {
    console.error("Email notification error:", error);
    throw error;
  }
}
