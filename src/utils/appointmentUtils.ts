
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

  // Insert appointment into the database
  const formattedDate = format(date, 'yyyy-MM-dd');
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

  console.log("Appointment created:", appointmentData_);
  
  // Get the service name from the ID
  const serviceName = SERVICES.find(s => s.id === service)?.name || service;
  
  try {
    // Call the notify-appointment function to send email notification
    console.log("Sending email notification...");
    
    // Enhanced logging to debug the function call
    console.log("Calling notify-appointment edge function...");
    console.log("Appointment payload:", {
      id: appointmentData_?.[0]?.id,
      date: formattedDate,
      time: selectedTime,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim(),
      service: serviceName
    });
    
    const notifyResponse = await supabase.functions.invoke('notify-appointment', {
      method: 'POST',
      body: {
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
      }
    });
    
    // Log the complete response from the function
    console.log("Complete notify response:", JSON.stringify(notifyResponse));
    
    if (notifyResponse.error) {
      console.error("Notification error:", notifyResponse.error);
      throw new Error("Failed to send notification: " + notifyResponse.error.message);
    } else {
      console.log("Notification sent:", notifyResponse.data);
    }
    
    // Try to create calendar event
    console.log("Creating calendar event...");
    const calendarResponse = await supabase.functions.invoke('create-calendar-event', {
      method: 'POST',
      body: {
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
      }
    });
    
    if (calendarResponse.error) {
      console.error("Calendar error:", calendarResponse.error);
      // Don't throw here to avoid failing the appointment process
    } else {
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
