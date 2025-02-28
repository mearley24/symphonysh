
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
  
  const { data, error } = await supabase
    .from('appointments')
    .insert([formattedAppointment])
    .select();

  if (error) {
    console.error("Database error:", error);
    throw new Error("Database error: " + error.message);
  }

  console.log("Appointment created successfully:", data);
  return data?.[0];
}
