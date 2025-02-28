
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";
import { Resend } from "npm:resend@2.0.0";

// Debug logs at the top level for function initialization
console.log("Notify appointment function initializing...");

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// Log Resend API key status (without revealing the key)
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
console.log("Resend API key available:", resendApiKey ? "Yes" : "No");

// Initialize Resend
const resend = new Resend(resendApiKey);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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
  const formattedHour = hourNum > 12 ? hourNum - 12 : hourNum === 0 ? 12 : hourNum;
  const formattedTime = `${formattedHour}:${minute} ${period}`;
  
  return { formattedDate, formattedTime };
}

serve(async (req) => {
  console.log("Notification function triggered with method:", req.method);
  console.log("Request headers:", Object.fromEntries(req.headers.entries()));
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  // Handle direct browser visits or GET requests
  if (req.method === "GET") {
    console.log("Handling GET request (direct browser visit)");
    return new Response(JSON.stringify({ 
      message: "This is the notify-appointment API endpoint. POST requests with appointment data are required." 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  }

  try {
    console.log("Parsing request body...");
    // Parse the request body
    let requestData;
    let bodyText = "";
    
    try {
      bodyText = await req.text();
      console.log("Raw request body:", bodyText);
      
      if (!bodyText || bodyText.trim() === "") {
        throw new Error("Empty request body");
      }
      
      requestData = JSON.parse(bodyText);
      console.log("Successfully parsed request body:", JSON.stringify(requestData, null, 2));
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON in request body", 
          receivedData: bodyText,
          parseError: parseError.message
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    
    const { appointment } = requestData;
    
    console.log("Appointment data received:", JSON.stringify(appointment, null, 2));
    
    if (!appointment) {
      return new Response(
        JSON.stringify({ 
          error: "No appointment data provided",
          receivedData: requestData
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    
    // Validate required fields
    const requiredFields = ['date', 'time', 'name', 'email', 'phone', 'service'];
    const missingFields = requiredFields.filter(field => !appointment[field]);
    
    if (missingFields.length > 0) {
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields", 
          missingFields,
          receivedData: appointment
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    
    const { formattedDate, formattedTime } = formatDateTime(appointment.date, appointment.time);
    
    console.log("Formatted date and time:", formattedDate, formattedTime);

    // Send email notification to the business
    console.log("Sending business email...");
    let businessEmailData;
    let businessEmailError;
    try {
      const businessEmailResult = await resend.emails.send({
        from: "Symphony Smart Homes <notifications@symphonysh.com>", // Use verified domain
        to: ["info@symphonysh.com"],
        subject: `New Appointment: ${appointment.name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h1 style="color: #333; text-align: center;">New Appointment Scheduled</h1>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
              <h2 style="margin-top: 0; color: #0056b3;">${appointment.name}</h2>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
              <p style="margin: 5px 0;"><strong>Time:</strong> ${formattedTime}</p>
              <p style="margin: 5px 0;"><strong>Service:</strong> ${appointment.service}</p>
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
      businessEmailData = businessEmailResult;
    } catch (error) {
      console.error("Error sending business email:", error);
      businessEmailError = error;
    }

    if (businessEmailError) {
      console.error("Error sending business email:", businessEmailError);
      // We continue to try sending the customer email even if business email fails
    } else {
      console.log("Business email notification sent successfully:", businessEmailData);
    }

    // Send confirmation email to the customer
    console.log("Sending customer email...");
    let customerEmailData;
    let customerEmailError;
    try {
      const customerEmailResult = await resend.emails.send({
        from: "Symphony Smart Homes <notifications@symphonysh.com>", // Use verified domain
        to: [appointment.email],
        subject: "Your Appointment Confirmation - Symphony Smart Homes",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
            <h1 style="color: #333; text-align: center;">Appointment Confirmation</h1>
            <p style="font-size: 16px; line-height: 1.5;">Dear ${appointment.name},</p>
            <p style="font-size: 16px; line-height: 1.5;">Thank you for scheduling a consultation with Symphony Smart Homes. We're looking forward to discussing your project.</p>
            
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <h2 style="margin-top: 0; color: #0056b3;">Appointment Details</h2>
              <p style="margin: 5px 0;"><strong>Date:</strong> ${formattedDate}</p>
              <p style="margin: 5px 0;"><strong>Time:</strong> ${formattedTime}</p>
              <p style="margin: 5px 0;"><strong>Service:</strong> ${appointment.service}</p>
            </div>
            
            <p style="font-size: 16px; line-height: 1.5;">If you need to reschedule or have any questions, please contact us at info@symphonysh.com or call our office.</p>
            
            <p style="font-size: 16px; line-height: 1.5;">Best regards,<br>Symphony Smart Homes Team</p>
            
            <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
              <p>This is an automated confirmation. Please do not reply to this email.</p>
            </div>
          </div>
        `,
      });
      customerEmailData = customerEmailResult;
    } catch (error) {
      console.error("Error sending customer email:", error);
      customerEmailError = error;
    }

    if (customerEmailError) {
      console.error("Error sending customer email:", customerEmailError);
      // We don't throw here to ensure the function completes even if customer email fails
    } else {
      console.log("Customer email confirmation sent successfully:", customerEmailData);
    }

    // Return response with details of both email operations
    return new Response(JSON.stringify({ 
      success: true, 
      businessEmail: {
        success: !businessEmailError,
        data: businessEmailData,
        error: businessEmailError ? businessEmailError.message : null
      },
      customerEmail: {
        success: !customerEmailError,
        data: customerEmailData,
        error: customerEmailError ? customerEmailError.message : null
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Function error:", error.message);
    console.error("Error stack:", error.stack);
    return new Response(
      JSON.stringify({ error: error.message, stack: error.stack }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
