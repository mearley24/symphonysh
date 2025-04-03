
import { supabase } from "../../integrations/supabase/client";
import { AppointmentNotificationPayload, getServiceName } from "./types";

// Send email notification about the appointment
export async function sendEmailNotification(appointment: any, serviceName: string): Promise<any> {
  // Log the beginning of the email notification process
  console.log("Starting email notification process...");
  
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
  
  console.log("Prepared notification payload:", JSON.stringify(payload, null, 2));
  console.log("About to invoke Supabase function...");
  
  try {
    // Add more descriptive logging
    console.log(`Invoking notify-appointment function with email: ${appointment?.email}`);
    
    // Direct invoke of notify-appointment function
    const { data, error } = await supabase.functions.invoke('notify-appointment', {
      body: payload
    });
    
    if (error) {
      console.error("Error invoking notify-appointment function:", error);
      throw new Error(`Failed to send notification: ${error.message}`);
    }
    
    console.log("Email notification successfully sent:", data);
    return data;
  } catch (error: any) {
    console.error("Email notification error:", error);
    console.error("Error stack:", error.stack);
    console.error("Error details:", typeof error === 'object' ? JSON.stringify(error, null, 2) : error);
    
    // Try a fallback approach using the send-confirmation-email function directly
    try {
      console.log("Attempting fallback email method...");
      
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://symphonysh.supabase.co";
      const functionUrl = `${supabaseUrl}/functions/v1/send-confirmation-email`;
      
      const emailPayload = {
        date: appointment?.date,
        selectedTime: appointment?.time,
        name: appointment?.name,
        email: appointment?.email,
        phone: appointment?.phone,
        service: serviceName,
        message: appointment?.message || ""
      };
      
      console.log("Sending fallback email with payload:", JSON.stringify(emailPayload, null, 2));
      
      const response = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload)
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Fallback email function error:", errorText);
        throw new Error(`Fallback email failed: ${response.status} ${errorText}`);
      }
      
      const result = await response.json();
      console.log("Fallback email sent successfully:", result);
      return result;
    } catch (fallbackError: any) {
      console.error("All email methods failed:", fallbackError);
      throw fallbackError;
    }
  }
}
