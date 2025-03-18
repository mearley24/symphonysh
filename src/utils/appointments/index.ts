
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

  // Save appointment details to session storage as fallback
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
    let notificationResult = null;
    try {
      // Send email notification with calendar attachment
      notificationResult = await sendEmailNotification(appointmentData_, serviceName);
      console.log("Notification result:", notificationResult);
    } catch (notifyError: any) {
      console.error("Failed to handle notifications:", notifyError);
      console.error("Error details:", notifyError.stack || "No stack trace available");
      // We don't throw here to avoid failing the whole appointment process
    }

    return {
      ...appointmentData_,
      businessEmail: notificationResult?.businessEmail || null,
      customerEmail: notificationResult?.customerEmail || null
    };
  } catch (error) {
    console.error("Error in submitAppointment:", error);
    // Re-throw the error so it can be caught by the form handler
    throw error;
  }
}

// This function can be simplified since we no longer need to fetch from Google Calendar
export async function getAvailableTimeSlots(date: Date) {
  // Generate standard time slots
  const standardTimeSlots = [];
  for (let hour = 9; hour <= 17; hour++) {
    if (hour !== 12) { // Skip lunch hour
      standardTimeSlots.push(`${hour}:00`);
      if (hour !== 17) { // Don't add the :30 slot for 5pm
        standardTimeSlots.push(`${hour}:30`);
      }
    }
  }
  
  return standardTimeSlots;
}
