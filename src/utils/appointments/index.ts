
import { AppointmentData, getServiceName } from "./types";
import { saveAppointmentToDatabase } from "./dbUtils";

export type { AppointmentData } from "./types";

export async function submitAppointment(appointmentData: AppointmentData) {
  const { date, selectedTime, name, email, phone, service, message } = appointmentData;
  
  if (!date || !selectedTime || !name.trim() || !email.trim() || !phone.trim() || !service) {
    throw new Error("Missing required fields");
  }

  console.log("Starting appointment submission process...");

  try {
    // Save appointment to database
    console.log("Saving appointment to database...");
    const appointmentData_ = await saveAppointmentToDatabase(appointmentData);
    console.log("Appointment saved to database:", appointmentData_);
    
    // Get the service name from the ID
    const serviceName = getServiceName(service);
    
    try {
      // Send email confirmation
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://symphonysh.supabase.co";
      const functionUrl = `${supabaseUrl}/functions/v1/send-confirmation-email`;
      
      // Create a simple payload with all required fields
      const emailPayload = {
        date: date.toISOString(),
        selectedTime,
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        service: serviceName,
        message: message?.trim() || ""
      };
      
      console.log("Sending confirmation email with payload:", JSON.stringify(emailPayload));
      
      const emailResponse = await fetch(functionUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(emailPayload)
      });
      
      if (!emailResponse.ok) {
        const errorText = await emailResponse.text();
        console.error("Email function error:", errorText);
        // Don't throw here, just log and continue
      } else {
        const result = await emailResponse.json();
        console.log("Email confirmation sent:", result);
      }
    } catch (emailError) {
      console.error("Failed to send confirmation email:", emailError);
      // Continue with the process even if email fails
    }
    
    return appointmentData_;
  } catch (dbError) {
    console.error("Database error:", dbError);
    
    // Return local version to allow flow to continue
    return {
      ...appointmentData,
      status: "pending-local-only",
      id: `local-${Date.now()}`,
      created_at: new Date().toISOString()
    };
  }
}

// Generate time slots from 9am to 5pm, skipping lunch hour
export async function getAvailableTimeSlots(date: Date) {
  const standardTimeSlots = [];
  
  for (let hour = 9; hour <= 17; hour++) {
    if (hour !== 12) { // Skip lunch hour
      standardTimeSlots.push(`${hour}:00`);
    }
  }
  
  return standardTimeSlots;
}
