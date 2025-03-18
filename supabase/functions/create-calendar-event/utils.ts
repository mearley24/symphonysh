
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

// CORS headers
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
export const supabase = createClient(supabaseUrl, supabaseKey);

// Format appointment data for event description
export function formatEventDescription(appointment: any): string {
  return `
Name: ${appointment.name}
Email: ${appointment.email}
Phone: ${appointment.phone}
Service: ${appointment.service}
${appointment.message ? `Message: ${appointment.message}` : ''}
`.trim();
}
