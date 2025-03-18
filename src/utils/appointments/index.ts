
import { format } from "date-fns";
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

  // Insert appointment into the database
  const appointmentData_ = await saveAppointmentToDatabase(appointmentData);
  
  // Get the service name from the ID
  const serviceName = getServiceName(service);
  
  try {
    // Send email notification with calendar attachment
    await sendEmailNotification(appointmentData_, serviceName);
  } catch (notifyError: any) {
    console.error("Failed to handle notifications:", notifyError);
    console.error("Error details:", notifyError.stack || "No stack trace available");
    // We don't throw here to avoid failing the whole appointment process
    // but we log the error for debugging
  }

  return appointmentData_;
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
