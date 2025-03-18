
// CORS headers
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

/**
 * Formats date and time for better readability
 */
export function formatDateTime(date: string, time: string) {
  const dateObj = new Date(date);
  const formattedDate = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  // Format time to 12-hour format
  const [hour, minute] = time.split(":");
  const hourNum = parseInt(hour);
  const period = hourNum >= 12 ? "PM" : "AM";
  const formattedHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
  const formattedTime = `${formattedHour}:${minute} ${period}`;
  
  return { formattedDate, formattedTime };
}

/**
 * Validates the appointment data
 */
export function validateAppointment(appointment: any) {
  if (!appointment) {
    return { valid: false, missingFields: ['appointment data missing'] };
  }
  
  const requiredFields = ['date', 'time', 'name', 'email', 'phone', 'service'];
  const missingFields = requiredFields.filter(field => !appointment[field]);
  
  return { 
    valid: missingFields.length === 0,
    missingFields
  };
}
