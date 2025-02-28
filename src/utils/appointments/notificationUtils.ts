
import { supabase } from "../../integrations/supabase/client";
import { AppointmentNotificationPayload, getServiceName } from "./types";

// Send email notification about the appointment
export async function sendEmailNotification(appointment: any, serviceName: string): Promise<any> {
  console.log("Sending email notification...");
  
  // Create payload object with properly formatted data
  const payload: AppointmentNotificationPayload = {
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
  
  console.log("Appointment payload for notification:", JSON.stringify(payload, null, 2));
  
  try {
    // First try the direct fetch approach for better error visibility
    const functionUrl = "https://bxsdjxkbhjtdrrtjtyto.supabase.co/functions/v1/notify-appointment";
    console.log("Using direct fetch to URL:", functionUrl);
    
    // Get the session token for authorization
    const { data: { session } } = await supabase.auth.getSession();
    const authToken = session?.access_token ? `Bearer ${session.access_token}` : '';
    
    // Stringify the payload once and reuse the same string to ensure consistent formatting
    const stringifiedPayload = JSON.stringify(payload);
    console.log("Stringified payload:", stringifiedPayload);
    
    const fetchResponse = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': authToken
      },
      body: stringifiedPayload
    });
    
    console.log("Direct fetch response status:", fetchResponse.status);
    const responseText = await fetchResponse.text();
    console.log("Direct fetch response:", responseText);
    
    try {
      const jsonResponse = JSON.parse(responseText);
      console.log("Parsed JSON response:", jsonResponse);
      
      if (jsonResponse.error) {
        console.error("Error from function:", jsonResponse.error);
        console.error("Error details:", jsonResponse.receivedData || "No additional details");
      }
    } catch (jsonError) {
      console.log("Response is not valid JSON:", responseText);
    }
    
    if (!fetchResponse.ok) {
      console.error("Direct fetch failed with status:", fetchResponse.status);
      console.error("Response body:", responseText);
      // Continue to try the supabase.functions.invoke approach
    } else {
      console.log("Direct fetch succeeded!");
      return true;
    }
  } catch (fetchError) {
    console.error("Direct fetch error:", fetchError);
    console.log("Falling back to supabase.functions.invoke method...");
  }
  
  // Fallback to the supabase.functions.invoke method
  console.log("Attempting to invoke notify-appointment function via SDK...");
  
  // Clean payload to ensure it's serializable
  const cleanPayload = JSON.parse(JSON.stringify(payload));
  console.log("Clean payload for SDK invocation:", cleanPayload);
  
  // Call the function with detailed error handling
  let notifyResponse;
  try {
    notifyResponse = await supabase.functions.invoke('notify-appointment', {
      method: 'POST',
      body: cleanPayload
    });
    
    console.log("Function invocation attempt completed");
    console.log("SDK response:", JSON.stringify(notifyResponse, null, 2));
  } catch (invocationError) {
    console.error("Function invocation error:", invocationError);
    console.error("Error type:", typeof invocationError);
    console.error("Error properties:", Object.keys(invocationError));
    console.error("Error stringified:", JSON.stringify(invocationError, null, 2));
    throw new Error("Failed to invoke notification function. Check browser console for details.");
  }
  
  // Log the complete response from the function
  console.log("Raw notify response received:", notifyResponse);
  console.log("Response stringified:", JSON.stringify(notifyResponse, null, 2));
  
  if (notifyResponse.error) {
    console.error("Notification error:", notifyResponse.error);
    console.error("Error details:", JSON.stringify(notifyResponse.error, null, 2));
    throw new Error("Failed to send notification. Check browser console for details.");
  }
  
  return notifyResponse.data;
}
