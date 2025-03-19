
import { AppointmentData, getServiceName } from "./types";
import { saveAppointmentToDatabase } from "./dbUtils";
import { sendEmailNotification } from "./notificationUtils";

export type { AppointmentData } from "./types";

export async function submitAppointment(appointmentData: AppointmentData) {
  const { date, selectedTime, name, email, phone, service, message } = appointmentData;
  
  if (!date || !selectedTime || !name.trim() || !email.trim() || !phone.trim() || !service) {
    throw new Error("Missing required fields");
  }

  console.log("Starting appointment submission process...");
  console.log("Appointment data:", JSON.stringify(appointmentData, null, 2));

  // Save appointment details to session storage as fallback - BEFORE any async operations
  try {
    sessionStorage.setItem('appointmentDetails', JSON.stringify(appointmentData));
    console.log("Saved appointment details to session storage as fallback");
  } catch (err) {
    console.warn("Could not save to session storage:", err);
  }

  try {
    // Insert appointment into the database
    console.log("Saving appointment to database...");
    const appointmentData_ = await saveAppointmentToDatabase(appointmentData);
    console.log("Appointment saved to database:", appointmentData_);
    
    // Get the service name from the ID
    const serviceName = getServiceName(service);
    console.log("Service name resolved:", serviceName);
    
    // Send email notification using our new edge function
    try {
      // Call the send-confirmation-email edge function directly
      console.log("Attempting to send confirmation email...");
      
      const functionUrl = `${import.meta.env.VITE_SUPABASE_URL || "https://symphonysh.supabase.co"}/functions/v1/send-confirmation-email`;
      console.log("Using function URL:", functionUrl);
      
      const emailResponse = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          service: serviceName,
          message: message?.trim()
        })
      });
      
      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error("Email function error response:", errorText);
        throw new Error(`Failed to send confirmation email: ${emailResponse.status} ${errorText}`);
      }
      
      const notificationResult = await emailResponse.json();
      console.log("Confirmation email result:", notificationResult);
      
      return {
        ...appointmentData_,
        emailNotification: notificationResult
      };
    } catch (notifyError) {
      console.error("Failed to send email notifications:", notifyError);
      console.error("Error stack:", notifyError.stack);
      // We don't throw here to avoid failing the whole appointment process
      return appointmentData_;
    }
  } catch (error) {
    console.error("Error in submitAppointment:", error);
    console.error("Error stack:", error.stack);
    
    // Instead of re-throwing, we'll return a local version of the appointment
    // This will allow the flow to continue even if the database save fails
    return {
      ...appointmentData,
      status: "pending-local-only",
      id: `local-${Date.now()}`,
      created_at: new Date().toISOString()
    };
  }
}

// This function can be simplified since we no longer need to fetch from Google Calendar
export async function getAvailableTimeSlots(date: Date) {
  console.log("Getting available time slots for date:", date);
  // Generate time slots for full hours only (no half-hour slots)
  const standardTimeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    if (hour !== 12) { // Skip lunch hour
      standardTimeSlots.push(`${hour}:00`);
    }
  }
  
  console.log("Generated time slots:", standardTimeSlots);
  return standardTimeSlots;
}
