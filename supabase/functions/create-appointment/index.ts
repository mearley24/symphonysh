
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

    // Format appointment data for notifications
    const serviceName = appointmentData.service;
    const formattedAppointment = {
      ...data,
      address: appointmentData.address || "Not provided", // Ensure address is included
      service: SERVICES.find(s => s.id === serviceName)?.name || serviceName
    };
    
    // Send email notifications
    try {
      console.log("Attempting to send email notifications");
      const notificationResponse = await supabase.functions.invoke('notify-appointment', {
        body: { appointment: formattedAppointment }
      });
      
      console.log("Email notification response:", notificationResponse);
      
      if (notificationResponse.error) {
        console.error("Email notification error:", notificationResponse.error);
      } else {
        console.log("Email notifications sent successfully");
      }
    } catch (notificationError) {
      console.error("Failed to send email notifications:", notificationError);
      // Don't throw here, we still want to return the appointment data
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
