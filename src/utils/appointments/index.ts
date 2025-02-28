
import { format } from "date-fns";
import { AppointmentData, getServiceName } from "./types";
import { saveAppointmentToDatabase } from "./dbUtils";
import { sendEmailNotification } from "./notificationUtils";
import { createCalendarEvent } from "./calendarUtils";

export { AppointmentData } from "./types";

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
    // Send email notification
    await sendEmailNotification(appointmentData_, serviceName);
    
    // Try to create calendar event
    await createCalendarEvent(appointmentData_, serviceName);
  } catch (notifyError: any) {
    console.error("Failed to handle notifications:", notifyError);
    console.error("Error details:", notifyError.stack || "No stack trace available");
    // We don't throw here to avoid failing the whole appointment process
    // but we log the error for debugging
  }

  return appointmentData_;
}
