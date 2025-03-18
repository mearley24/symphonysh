
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders } from "./utils.ts";
import { createCalendarEvent } from "./calendarEvents.ts";

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
    
    // Create the calendar event
    const calendarEvent = await createCalendarEvent(appointment);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Calendar event created successfully",
        data: {
          eventId: calendarEvent.id,
          eventLink: calendarEvent.htmlLink,
          status: "created"
        }
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
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
