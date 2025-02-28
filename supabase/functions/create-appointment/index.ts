
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const appointmentData = await req.json();
    console.log("Received appointment data:", appointmentData);

    // Initialize Supabase client with service role key to bypass RLS
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Insert appointment with admin privileges
    const { data, error } = await supabase
      .from('appointments')
      .insert([appointmentData])
      .select()
      .single();

    if (error) {
      console.error("Error inserting appointment:", error);
      throw new Error(`Database error: ${error.message}`);
    }

    console.log("Appointment created successfully:", data);

    // Try to create calendar event if google-auth function is set up
    try {
      const serviceName = appointmentData.service;
      
      // Format the appointment data for the calendar event
      const eventData = {
        appointment: {
          ...appointmentData,
          service: SERVICES.find(s => s.id === serviceName)?.name || serviceName
        }
      };

      // Only attempt to create calendar event if tokens exist
      const { data: tokens } = await supabase
        .from('google_tokens')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(1);

      if (tokens && tokens.length > 0) {
        console.log("Found Google tokens, attempting to create calendar event");
        // Try to create calendar event but don't throw if it fails
        await supabase.functions.invoke('create-calendar-event', {
          body: eventData
        }).catch(e => {
          console.error("Could not create calendar event, but appointment was saved:", e);
        });
      } else {
        console.log("No Google tokens found, skipping calendar event creation");
      }
    } catch (calendarError) {
      console.error("Calendar event creation failed but appointment was saved:", calendarError);
      // Don't throw here, we still want to return success for the appointment
    }

    return new Response(
      JSON.stringify({ success: true, data }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in create-appointment function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

// List of services (copied from frontend for name lookup)
const SERVICES = [
  { id: "home-integration", name: "Home Automation" },
  { id: "audio-entertainment", name: "Audio & Entertainment" },
  { id: "smart-lighting", name: "Smart Lighting" },
  { id: "shades", name: "Smart Shades" },
  { id: "networking", name: "Networking" },
  { id: "climate-control", name: "Climate Control" },
  { id: "security-systems", name: "Security Systems" },
  { id: "maintenance", name: "Troubleshooting & Maintenance" },
  { id: "matterport-scan", name: "Matterport Scan" },
];
