
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
  
  // Instead of using the typed Supabase client, we'll use the Edge Function
  // that was created to handle appointment creation
  const response = await fetch(`${window.location.origin}/api/create-appointment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formattedAppointment),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Database error:", errorData);
    throw new Error("Database error: " + (errorData.error || response.statusText));
  }

  const data = await response.json();
  console.log("Appointment created successfully:", data);
  return data?.data;
}
