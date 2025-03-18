
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resendApiKey = Deno.env.get("RESEND_API_KEY") || "";
console.log("Confirmation Email sender initializing...");
console.log("Resend API Key available:", !!resendApiKey);

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
    
    const { name, email } = requestData;
    
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
    const clientEmailResult = await resend.emails.send({
      from: "Symphony Smart Homes <notifications@symphonysh.com>",
      to: [email],
      subject: "Your Consultation is Scheduled - Symphony Smart Homes",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #333; text-align: center;">Thank You for Your Consultation Request</h1>
          <p style="font-size: 16px; line-height: 1.5;">Dear ${name},</p>
          <p style="font-size: 16px; line-height: 1.5;">Thank you for scheduling a consultation with Symphony Smart Homes.</p>
          <p style="font-size: 16px; line-height: 1.5;">Our team will review your request and get back to you shortly to confirm the details.</p>
          <p style="font-size: 16px; line-height: 1.5;">If you have any questions in the meantime, please feel free to contact us at info@symphonysh.com.</p>
          <p style="font-size: 16px; line-height: 1.5;">Best regards,<br>Symphony Smart Homes Team</p>
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        </div>
      `
    });
    
    // Send business notification email
    console.log("Sending notification email to business");
    const businessEmailResult = await resend.emails.send({
      from: "Symphony Smart Homes <notifications@symphonysh.com>",
      to: ["info@symphonysh.com"],
      subject: `New Consultation Request: ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #333; text-align: center;">New Consultation Request</h1>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px;">
            <h2 style="margin-top: 0; color: #0056b3;">Client Details</h2>
            <p style="margin: 5px 0;"><strong>Name:</strong> ${name}</p>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>This is an automated notification from Symphony Smart Homes.</p>
          </div>
        </div>
      `
    });
    
    console.log("Client email result:", JSON.stringify(clientEmailResult));
    console.log("Business email result:", JSON.stringify(businessEmailResult));
    
    return new Response(JSON.stringify({ 
      success: true, 
      clientEmail: clientEmailResult,
      businessEmail: businessEmailResult
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Function error:", error);
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
