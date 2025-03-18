
import { format } from "date-fns";
import { supabase } from "../../integrations/supabase/client";
import { AppointmentData, FormattedAppointment } from "./types";

// Save appointment to the database
export async function saveAppointmentToDatabase(appointmentData: AppointmentData): Promise<any> {
  const { date, selectedTime, name, email, phone, service, message } = appointmentData;
  
  if (!date || !selectedTime) {
    throw new Error("Missing date or time");
  }

  console.log("Saving appointment to database...");
  
  const formattedAppointment: FormattedAppointment = {
    date: format(date, 'yyyy-MM-dd'),
    time: selectedTime,
    name: name.trim(),
    email: email.trim(),
    phone: phone.trim(),
    message: message.trim(),
    service,
    status: 'pending'
  };
  
  try {
    // Call the Edge Function that handles appointment creation
    const response = await fetch(`${window.location.origin}/api/create-appointment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formattedAppointment),
    });

    // Check if response is ok before attempting to parse JSON
    if (!response.ok) {
      const contentType = response.headers.get('content-type');
      
      // Try to parse error as JSON if possible
      if (contentType && contentType.includes('application/json')) {
        const errorData = await response.json();
        console.error("Database error:", errorData);
        throw new Error("Database error: " + (errorData.error || response.statusText));
      } else {
        // Handle non-JSON error responses
        const errorText = await response.text();
        console.error("Database error:", errorText || response.statusText);
        throw new Error("Database error: " + (errorText || response.statusText));
      }
    }
    
    // Check if there's content to parse
    const contentLength = response.headers.get('content-length');
    if (contentLength === '0') {
      console.log("Empty response received, but status was OK");
      return { success: true };
    }
    
    // Try to parse the JSON response
    try {
      const data = await response.json();
      console.log("Appointment created successfully:", data);
      return data?.data;
    } catch (jsonError) {
      console.error("Error parsing JSON response:", jsonError);
      console.log("Raw response:", await response.text());
      return { success: true }; // Still return success if the status was OK
    }
  } catch (error) {
    console.error("Error saving appointment:", error);
    throw error;
  }
}
