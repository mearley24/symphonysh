
import { format } from "date-fns";
import { supabase } from "../../integrations/supabase/client";

// Default available time slots
const DEFAULT_TIME_SLOTS = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

// Function to fetch available time slots for a given date
export async function fetchAvailableTimeSlots(date: Date): Promise<string[]> {
  if (!date) {
    return [];
  }
  
  try {
    console.log("Fetching available time slots for:", format(date, 'yyyy-MM-dd'));
    
    // Format the date for the API call
    const formattedDate = format(date, 'yyyy-MM-dd');
    
    // Call the Supabase Edge Function to check Google Calendar
    const { data, error } = await supabase.functions.invoke('available-time-slots', {
      method: 'POST',
      body: { date: formattedDate }
    });
    
    if (error) {
      console.error("Error fetching available time slots:", error);
      return DEFAULT_TIME_SLOTS;
    }
    
    if (data && Array.isArray(data.availableSlots)) {
      console.log("Available time slots:", data.availableSlots);
      return data.availableSlots;
    }
    
    // Return default time slots if the API call fails
    return DEFAULT_TIME_SLOTS;
  } catch (error) {
    console.error("Failed to fetch available time slots:", error);
    // Return default time slots in case of error
    return DEFAULT_TIME_SLOTS;
  }
}
