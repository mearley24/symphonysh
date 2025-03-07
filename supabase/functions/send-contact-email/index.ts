
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import { Resend } from "npm:resend@2.0.0";

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
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      throw new Error('Name, email, and message are required');
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Store the submission in the database
    const { data: submission, error: dbError } = await supabase
      .from('contact_submissions')
      .insert([{ name, email, message }])
      .select()
      .single();

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    // Initialize Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    if (!resendApiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    
    const resend = new Resend(resendApiKey);

    // Send email to business
    const emailResponse = await resend.emails.send({
      from: "Symphony Smart Homes <notifications@symphonysh.com>",
      to: ["info@symphonysh.com"],
      subject: "New Contact Form Submission",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #333; text-align: center;">New Contact Form Submission</h1>
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin-bottom: 20px;">
            <h2 style="margin-top: 0; color: #0056b3;">${name}</h2>
            <p style="margin: 5px 0;"><strong>Email:</strong> ${email}</p>
          </div>
          <div style="margin-bottom: 20px;">
            <h3>Message:</h3>
            <p style="background-color: #f8f9fa; padding: 10px; border-radius: 5px;">${message}</p>
          </div>
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>This is an automated notification from Symphony Smart Homes.</p>
          </div>
        </div>
      `,
    });

    console.log("Email sent:", emailResponse);

    // Send confirmation email to customer
    const customerResponse = await resend.emails.send({
      from: "Symphony Smart Homes <notifications@symphonysh.com>",
      to: [email],
      subject: "Thank you for contacting Symphony Smart Homes",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #333; text-align: center;">We've Received Your Message</h1>
          <p style="font-size: 16px; line-height: 1.5;">Dear ${name},</p>
          <p style="font-size: 16px; line-height: 1.5;">Thank you for contacting Symphony Smart Homes. We have received your message and our team will review it shortly.</p>
          <p style="font-size: 16px; line-height: 1.5;">We aim to respond to all inquiries within 1-2 business days.</p>
          <p style="font-size: 16px; line-height: 1.5;">Best regards,<br>Symphony Smart Homes Team</p>
          <div style="text-align: center; margin-top: 30px; color: #666; font-size: 12px;">
            <p>This is an automated confirmation. Please do not reply to this email.</p>
          </div>
        </div>
      `,
    });

    console.log("Confirmation email sent:", customerResponse);

    return new Response(JSON.stringify({ 
      success: true, 
      id: submission.id,
      emailSent: !!emailResponse.id,
      confirmationSent: !!customerResponse.id 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in send-contact-email function:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
