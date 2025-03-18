
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Initialize Resend with API key from environment variables
const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
console.log("Confirmation Email sender initializing...");
console.log("Resend API Key available:", !!resendApiKey);
console.log("Resend API Key length:", resendApiKey.length);

// Check if API key is available
if (!resendApiKey) {
  console.error("RESEND_API_KEY environment variable is not set");
}

const resend = new Resend(resendApiKey);

serve(async (req) => {
  console.log("========== Confirmation Email function triggered ==========");
  console.log("Request method:", req.method);
  
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    // Parse request body
    const bodyText = await req.text();
    console.log("Raw request body:", bodyText);
    
    let requestData;
    try {
      requestData = JSON.parse(bodyText);
      console.log("Successfully parsed request body:", JSON.stringify(requestData, null, 2));
    } catch (parseError) {
      console.error("Error parsing request body:", parseError);
      return new Response(
        JSON.stringify({ 
          error: "Invalid JSON in request body",
          details: parseError.message
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    
    const { name, email, message, service } = requestData;
    
    if (!name || !email) {
      console.error("Missing required fields:", { name, email });
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields", 
          receivedData: requestData
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    
    console.log("All required fields are present, proceeding with email notifications");
    
    // Send client confirmation email
    console.log(`Sending confirmation email to client: ${email}`);
    const clientEmailResult = await sendClientEmail(name, email, service);
    
    // Send business notification email
    console.log("Sending notification email to business");
    const businessEmailResult = await sendBusinessEmail(name, email, message, service);
    
    console.log("Client email result:", JSON.stringify(clientEmailResult));
    console.log("Business email result:", JSON.stringify(businessEmailResult));
    
    return new Response(JSON.stringify({ 
      success: true, 
      clientEmail: {
        success: clientEmailResult.success,
        id: clientEmailResult.data?.id,
        error: clientEmailResult.error ? clientEmailResult.error.message : null
      },
      businessEmail: {
        success: businessEmailResult.success,
        id: businessEmailResult.data?.id,
        error: businessEmailResult.error ? businessEmailResult.error.message : null
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Function error:", error.message);
    console.error("Error stack:", error.stack);
    
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        stack: error.stack
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});

/**
 * Sends confirmation email to client
 */
async function sendClientEmail(name: string, email: string, service?: string) {
  try {
    console.log("Preparing to send client confirmation email");
    
    const clientEmailResult = await resend.emails.send({
      from: "Symphony Smart Homes <notifications@symphonysh.com>",
      to: [email],
      subject: "Thank You for Your Consultation Request - Symphony Smart Homes",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #333; text-align: center;">Thank You for Your Consultation Request</h1>
          <p style="font-size: 16px; line-height: 1.5;">Dear ${name},</p>
          <p style="font-size: 16px; line-height: 1.5;">Thank you for your interest in Symphony Smart Homes. We have received your consultation request${service ? ` for ${service}` : ''}.</p>
          <p style="font-size: 16px; line-height: 1.5;">Our team will review your request and get back to you shortly to confirm the details.</p>
          <p style="font-size: 16px; line-height: 1.5;">If you have any questions in the meantime, please feel free to contact us at info@symphonysh.com.</p>
          <p style="font-size: 16px; line-height: 1.5;">Best regards,<br>Symphony Smart Homes Team</p>
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    });
    
    console.log("Client email sent:", clientEmailResult);
    return { success: true, data: clientEmailResult, error: null };
  } catch (error) {
    console.error("Error sending client email:", error);
    return { success: false, data: null, error };
  }
}

/**
 * Sends notification email to business
 */
async function sendBusinessEmail(name: string, email: string, message?: string, service?: string) {
  try {
    console.log("Preparing to send business notification email");
    
    const businessEmailResult = await resend.emails.send({
      from: "Symphony Smart Homes <notifications@symphonysh.com>",
      to: ["info@symphonysh.com"],
      subject: `New Consultation Request: ${name}${service ? ` - ${service}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #333; text-align: center;">New Consultation Request</h1>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #0056b3;">${name}</h2>
            ${service ? `<p style="margin: 5px 0;"><strong>Service:</strong> ${service}</p>` : ''}
          </div>
          <div style="margin-bottom: 20px;">
            <h3>Contact Information:</h3>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          ${message ? `
          <div style="margin-bottom: 20px;">
            <h3>Message:</h3>
            <p style="background-color: #f8f9fa; padding: 10px; border-radius: 5px;">${message}</p>
          </div>
          ` : ''}
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>This is an automated notification from Symphony Smart Homes.</p>
          </div>
        </div>
      `,
    });
    
    console.log("Business email sent:", businessEmailResult);
    return { success: true, data: businessEmailResult, error: null };
  } catch (error) {
    console.error("Error sending business email:", error);
    return { success: false, data: null, error };
  }
}
