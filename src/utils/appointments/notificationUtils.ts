
import { supabase } from "../../integrations/supabase/client";
import { ZAPIER_WEBHOOK_URL } from "../../constants/zapier";
import { AppointmentNotificationPayload, getServiceName } from "./types";

// Send notification about the appointment using Zapier
export async function sendEmailNotification(appointment: any, serviceName: string): Promise<any> {
  // Log the beginning of the notification process
  console.log("Starting notification process via Zapier...");
  
  // Create payload object with properly formatted data for email templates
  const payload = {
    appointment: {
      id: appointment?.id || `temp-${Date.now()}`,
      name: appointment?.name || '',
      email: appointment?.email || '',
      phone: appointment?.phone || '',
      address: appointment?.address || '',
      message: appointment?.message || '',
      service: serviceName,
      date: formatDate(appointment?.date),
      time: formatTime(appointment?.selectedTime || appointment?.time),
      // Include raw data for any custom processing
      raw_date: appointment?.date,
      raw_time: appointment?.selectedTime || appointment?.time
    }
  };
  
  console.log("Prepared Zapier webhook payload:", JSON.stringify(payload, null, 2));
  
  try {
    // Call Zapier webhook directly from the client
    console.log(`Sending appointment data to Zapier webhook: ${ZAPIER_WEBHOOK_URL}`);
    
    const response = await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors", // Required for cross-origin webhook calls
      body: JSON.stringify(payload)
    });
    
    console.log("Zapier webhook triggered successfully");
    return { success: true, message: "Notification workflow triggered" };
  } catch (error: any) {
    console.error("Zapier webhook error:", error);
    console.error("Error details:", typeof error === 'object' ? JSON.stringify(error, null, 2) : error);
    
    // Try the fallback approach using the Supabase function as before
    try {
      console.log("Attempting fallback notification method via Supabase function...");
      
      const { data, error } = await supabase.functions.invoke('notify-appointment', {
        body: payload
      });
      
      if (error) {
        console.error("Error invoking notify-appointment function:", error);
        throw error;
      }
      
      console.log("Fallback notification sent successfully:", data);
      return data;
    } catch (fallbackError: any) {
      console.error("All notification methods failed:", fallbackError);
      
      // Last resort: Try direct webhook call again with minimal payload
      try {
        console.log("Attempting last resort notification with minimal payload...");
        
        const minimalPayload = {
          name: appointment?.name,
          email: appointment?.email,
          phone: appointment?.phone,
          address: appointment?.address,
          date: formatDate(appointment?.date),
          time: formatTime(appointment?.selectedTime || appointment?.time),
          service: serviceName
        };
        
        await fetch(ZAPIER_WEBHOOK_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          mode: "no-cors",
          body: JSON.stringify(minimalPayload)
        });
        
        console.log("Minimal Zapier webhook call completed");
        return { success: true, message: "Minimal notification sent" };
      } catch (lastError) {
        console.error("All notification attempts failed:", lastError);
        throw new Error("Failed to send notification");
      }
    }
  }
}

// Helper function to format date
function formatDate(dateString: string): string {
  if (!dateString) return "Not specified";
  
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch (error) {
    console.error("Date formatting error:", error);
    return dateString || "Not specified";
  }
}

// Helper function to format time
function formatTime(timeString: string): string {
  if (!timeString) return "Not specified";
  
  try {
    const [hours, minutes] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 || 12;
    return `${formattedHour}:${minutes.toString().padStart(2, "0")} ${period}`;
  } catch (error) {
    console.error("Time formatting error:", error);
    return timeString || "Not specified";
  }
}
