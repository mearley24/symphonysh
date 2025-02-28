
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

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
    console.log("Appointment trigger function started");
    
    // Call the notify-appointment function
    const notifyResponse = await fetch(
      `${supabaseUrl}/functions/v1/notify-appointment`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseKey}`
        }
      }
    );
    
    if (!notifyResponse.ok) {
      const errorText = await notifyResponse.text();
      console.error("Error calling notify-appointment function:", errorText);
      throw new Error(`Failed to call notify-appointment: ${errorText}`);
    }
    
    const notifyResult = await notifyResponse.json();
    console.log("Notification sent successfully:", notifyResult);
    
    // Call the create-calendar-event function
    const calendarResponse = await fetch(
      `${supabaseUrl}/functions/v1/create-calendar-event`, 
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${supabaseKey}`
        }
      }
    );
    
    if (!calendarResponse.ok) {
      const errorText = await calendarResponse.text();
      console.error("Error calling create-calendar-event function:", errorText);
      // Don't throw error here to ensure we at least return success for the notification
    } else {
      const calendarResult = await calendarResponse.json();
      console.log("Calendar event created successfully:", calendarResult);
    }

    return new Response(
      JSON.stringify({ success: true, message: "Appointment notifications and calendar events processed" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error("Function error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
