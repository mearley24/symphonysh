
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    console.log("Calendar event function triggered");
    
    // Parse the request body
    const requestData = await req.json();
    const { appointment } = requestData;
    
    console.log("Appointment data for calendar:", JSON.stringify(appointment));
    
    if (!appointment) {
      throw new Error("No appointment data provided");
    }
    
    // In a real implementation, you would create a calendar event here
    // For now, we'll just return a success response
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Calendar event created successfully",
        data: {
          eventId: "calendar-" + Date.now(),
          status: "created"
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Calendar function error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
