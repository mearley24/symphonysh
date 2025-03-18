
import { Resend } from "npm:resend@2.0.0";
import { generateICalEvent } from "./calendar.ts";
import { generateBusinessEmailHtml, generateCustomerEmailHtml } from "./emailTemplates.ts";

// Get Resend API key from environment variables
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
console.log("Resend API Key available:", !!resendApiKey);

// Initialize Resend
const resend = new Resend(resendApiKey);

/**
 * Sends business notification email
 */
export async function sendBusinessEmail(appointment: any, formattedDate: string, formattedTime: string) {
  console.log("Sending business email to info@symphonysh.com...");
  try {
    const iCalEvent = generateICalEvent(appointment);
    console.log("Generated iCal event for business email");
    
    const businessEmailResult = await resend.emails.send({
      from: "Symphony Smart Homes <notifications@symphonysh.com>",
      to: ["info@symphonysh.com"],
      subject: `New Appointment: ${appointment.name} - ${appointment.service}`,
      html: generateBusinessEmailHtml(appointment, formattedDate, formattedTime),
      attachments: [
        {
          filename: 'appointment.ics',
          content: iCalEvent,
        },
      ],
    });
    
    console.log("Business email notification sent successfully:", businessEmailResult);
    return { success: true, data: businessEmailResult, error: null };
  } catch (error) {
    console.error("Error sending business email:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return { success: false, data: null, error };
  }
}

/**
 * Sends customer confirmation email
 */
export async function sendCustomerEmail(appointment: any, formattedDate: string, formattedTime: string) {
  if (!appointment.email) {
    console.error("Cannot send customer email - no email address provided");
    return { success: false, data: null, error: "No email address provided" };
  }
  
  console.log(`Sending customer email to ${appointment.email}...`);
  try {
    const iCalEvent = generateICalEvent(appointment);
    console.log("Generated iCal event for customer email");
    
    const customerEmailResult = await resend.emails.send({
      from: "Symphony Smart Homes <notifications@symphonysh.com>",
      to: [appointment.email],
      subject: "Your Appointment Confirmation - Symphony Smart Homes",
      html: generateCustomerEmailHtml(appointment, formattedDate, formattedTime),
      attachments: [
        {
          filename: 'appointment.ics',
          content: iCalEvent,
        },
      ],
    });
    
    console.log("Customer email confirmation sent successfully:", customerEmailResult);
    return { success: true, data: customerEmailResult, error: null };
  } catch (error) {
    console.error("Error sending customer email:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    return { success: false, data: null, error };
  }
}
