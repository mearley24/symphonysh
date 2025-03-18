
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

  // Save appointment details to session storage as fallback - BEFORE any async operations
  try {
    sessionStorage.setItem('appointmentDetails', JSON.stringify(appointmentData));
    console.log("Saved appointment details to session storage as fallback");
  } catch (err) {
    console.warn("Could not save to session storage:", err);
  }

  try {
    // Insert appointment into the database
    const appointmentData_ = await saveAppointmentToDatabase(appointmentData);
    console.log("Appointment saved to database:", appointmentData_);
    
    // Get the service name from the ID
    const serviceName = getServiceName(service);
    
    // Send email notification
    try {
      // Send email notification with calendar attachment
      console.log("Attempting to send email notifications...");
      const notificationResult = await sendEmailNotification(appointmentData_, serviceName);
      console.log("Notification result:", notificationResult);
      
      return {
        ...appointmentData_,
        businessEmail: notificationResult?.businessEmail || null,
        customerEmail: notificationResult?.customerEmail || null
      };
    } catch (notifyError) {
      console.error("Failed to send email notifications:", notifyError);
      // We don't throw here to avoid failing the whole appointment process
      return appointmentData_;
    }
  } catch (error) {
    console.error("Error in submitAppointment:", error);
    
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
  // Generate time slots for full hours only (no half-hour slots)
  const standardTimeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    if (hour !== 12) { // Skip lunch hour
      standardTimeSlots.push(`${hour}:00`);
    }
  }
  
  return standardTimeSlots;
}
