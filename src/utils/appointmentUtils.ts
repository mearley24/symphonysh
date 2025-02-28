
import { format } from "date-fns";
import { supabase } from "../integrations/supabase/client";
import { SERVICES } from "@/components/scheduling/AppointmentForm";

export interface AppointmentData {
  date: Date | undefined;
  selectedTime: string | undefined;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

export async function submitAppointment(appointmentData: AppointmentData) {
  const { date, selectedTime, name, email, phone, service, message } = appointmentData;
  
  if (!date || !selectedTime || !name.trim() || !email.trim() || !phone.trim() || !service) {
    throw new Error("Missing required fields");
  }

  console.log("Starting appointment submission process...");

  // Insert appointment into the database
  const formattedDate = format(date, 'yyyy-MM-dd');
  console.log("Saving appointment to database...");
  
  const { data: appointmentData_, error } = await supabase
    .from('appointments')
    .insert([{
      date: formattedDate,
      time: selectedTime,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      service,
      status: 'pending'
    }])
    .select();

  if (error) {
    console.error("Database error:", error);
    throw new Error("Database error: " + error.message);
  }

  console.log("Appointment created successfully:", appointmentData_);
  
  // Get the service name from the ID
  const serviceName = SERVICES.find(s => s.id === service)?.name || service;
  
  try {
    // Call the notify-appointment function to send email notification
    console.log("Sending email notification...");
    
    // Create payload object with properly formatted data
    const payload = {
      appointment: {
        id: appointmentData_?.[0]?.id,
        date: formattedDate,
        time: selectedTime,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        message: message.trim(),
        service: serviceName
      }
    };
    
    console.log("Appointment payload for notification:", JSON.stringify(payload, null, 2));
    
    // Manual fetch approach with more robust error handling
    console.log("Attempting direct fetch to notify-appointment function...");
    
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
        // If direct fetch succeeded, we can skip the invoke method
        return appointmentData_?.[0];
      }
    } catch (fetchError) {
      console.error("Direct fetch error:", fetchError);
      console.log("Falling back to supabase.functions.invoke method...");
    }
    
    // Fallback to the supabase.functions.invoke method with more careful payload handling
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
    } else {
      console.log("Notification sent successfully:", notifyResponse.data);
    }
    
    // Try to create calendar event
    console.log("Creating calendar event...");
    let calendarResponse;
    try {
      // Create a clean copy of the payload for calendar function
      const calendarPayload = JSON.parse(JSON.stringify({
        appointment: {
          id: appointmentData_?.[0]?.id,
          date: formattedDate,
          time: selectedTime,
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          message: message.trim(),
          service: serviceName
        }
      }));
      
      console.log("Calendar payload:", JSON.stringify(calendarPayload, null, 2));
      
      calendarResponse = await supabase.functions.invoke('create-calendar-event', {
        method: 'POST',
        body: calendarPayload
      });
    } catch (calendarInvocationError) {
      console.error("Calendar function invocation error:", calendarInvocationError);
      console.log("Continuing despite calendar function error");
      // Don't throw here to avoid failing the appointment process
    }
    
    if (calendarResponse?.error) {
      console.error("Calendar error:", calendarResponse.error);
      // Don't throw here to avoid failing the appointment process
    } else if (calendarResponse) {
      console.log("Calendar event created:", calendarResponse.data);
    }
  } catch (notifyError: any) {
    console.error("Failed to handle notifications:", notifyError);
    console.error("Error details:", notifyError.stack || "No stack trace available");
    // We don't throw here to avoid failing the whole appointment process
    // but we log the error for debugging
  }

  return appointmentData_?.[0];
}
