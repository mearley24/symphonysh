
// CORS headers
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
