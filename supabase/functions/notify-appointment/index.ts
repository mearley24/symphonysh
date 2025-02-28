
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import { Resend } from "npm:resend@2.0.0";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize Resend
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
const resend = new Resend(resendApiKey);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Function to fetch the most recent appointment
async function getLatestAppointment() {
  const { data, error } = await supabase
    .from("appointments")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(1);

  if (error) {
    console.error("Error fetching appointment:", error);
    throw new Error("Failed to fetch appointment");
  }

  return data[0];
}

// Function to format date/time for better readability
function formatDateTime(date: string, time: string) {
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
  const formattedHour = hourNum > 12 ? hourNum - 12 : hourNum;
  const formattedTime = `${formattedHour}:${minute} ${period}`;
  
  return { formattedDate, formattedTime };
}

// Service name lookup
function getServiceName(serviceId: string) {
  const services = {
    "home-integration": "Home Automation",
    "audio-entertainment": "Audio & Entertainment",
    "smart-lighting": "Smart Lighting",
    "shades": "Smart Shades",
    "networking": "Networking",
    "climate-control": "Climate Control",
    "security-systems": "Security Systems",
    "maintenance": "Troubleshooting & Maintenance",
    "matterport-scan": "Matterport Scan",
  };
  
  return services[serviceId as keyof typeof services] || serviceId;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Get the latest appointment from the database
    const appointment = await getLatestAppointment();
    const { formattedDate, formattedTime } = formatDateTime(appointment.date, appointment.time);
    const serviceName = getServiceName(appointment.service);

    // Send email notification
    const { data, error } = await resend.emails.send({
      from: "Symphony Smart Homes <notifications@symphonysh.com>",
      to: ["info@symphonysh.com"],
      subject: `New Appointment: ${appointment.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #333; text-align: center;">New Appointment Scheduled</h1>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #0056b3;">${appointment.name}</h2>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
            <p style="margin: 5px 0;"><strong>Time:</strong> ${formattedTime}</p>
            <p style="margin: 5px 0;"><strong>Service:</strong> ${serviceName}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <h3>Contact Information:</h3>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${appointment.email}</p>
            <p style="margin: 5px 0;"><strong>Phone:</strong> ${appointment.phone}</p>
          </div>
          ${appointment.message ? `
          <div style="margin-bottom: 20px;">
            <h3>Message:</h3>
            <p style="background-color: #f8f9fa; padding: 10px; border-radius: 5px;">${appointment.message}</p>
          </div>
          ` : ''}
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>This is an automated notification from Symphony Smart Homes.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email notification");
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
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
