
import { serve } from "https://deno.land/std@0.170.0/http/server.ts";
import { 
  corsHeaders,
  DEFAULT_TIME_SLOTS,
  generateAvailableTimeSlots,
  getBookedAppointmentTimes
} from "./utils.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }
  
  try {
    // Parse the request body
    const requestData = await req.json();
    const { date } = requestData;
    
    if (!date) {
      return new Response(
        JSON.stringify({ error: "Date is required" }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    
    console.log(`Processing available slots for date: ${date}`);
    
    // Generate all possible time slots
    const allTimeSlots = generateAvailableTimeSlots();
    
    // Get slots that are already booked in our database
    const bookedAppointmentTimes = await getBookedAppointmentTimes(date);
    console.log("Booked appointment times:", bookedAppointmentTimes);
    
    // Filter out booked slots
    const availableSlots = allTimeSlots.filter(
      slot => !bookedAppointmentTimes.includes(slot)
    );
    
    console.log("Final available slots:", availableSlots);
    
    return new Response(
      JSON.stringify({ availableSlots: availableSlots.length > 0 ? availableSlots : DEFAULT_TIME_SLOTS }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Function error:", error);
    return new Response(
      JSON.stringify({ 
        error: "Internal server error", 
        details: error.message,
        availableSlots: DEFAULT_TIME_SLOTS // Return default slots on error
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
