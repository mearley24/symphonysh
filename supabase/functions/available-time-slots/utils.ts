
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

// Default time slots (full hours only)
export const DEFAULT_TIME_SLOTS = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00", "17:00"
];

// Business hours
const BUSINESS_START_HOUR = 9; // 9 AM
const BUSINESS_END_HOUR = 17;  // 5 PM

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Generate all available business hour slots (full hours only)
export function generateAvailableTimeSlots() {
  const allPossibleSlots = [];
  for (let hour = BUSINESS_START_HOUR; hour < BUSINESS_END_HOUR; hour++) {
    allPossibleSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }
  return allPossibleSlots;
}

export async function getBookedAppointmentTimes(date: string) {
  try {
    // Get all appointments for the specified date
    const { data: appointments, error } = await supabase
      .from("appointments")
      .select("time")
      .eq("date", date)
      .not("status", "eq", "cancelled");
    
    if (error) {
      console.error("Error fetching appointments:", error);
      return [];
    }
    
    // Format times as HH:MM
    return appointments.map(app => {
      const timeStr = app.time;
      // Handle different time formats
      if (timeStr.includes(":")) {
        const [hours, minutes] = timeStr.split(":");
        return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}`;
      }
      return timeStr;
    });
  } catch (error) {
    console.error("Error processing appointments:", error);
    return [];
  }
}
