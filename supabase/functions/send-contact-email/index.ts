
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.38.4';
import * as smtp from "https://deno.land/x/smtp@v0.7.0/mod.ts";

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

    // Send email using Gmail SMTP
    const client = new smtp.SmtpClient();
    await client.connectTLS({
      hostname: "smtp.gmail.com",
      port: 465,
      username: "info@symphonysh.com",
      password: Deno.env.get('GMAIL_APP_PASSWORD')!,
    });

    // Send notification to business
    await client.send({
      from: "info@symphonysh.com",
      to: "info@symphonysh.com",
      subject: "New Contact Form Submission",
      content: `
Name: ${name}
Email: ${email}
Message: ${message}
      `,
    });

    // Send confirmation to customer
    await client.send({
      from: "info@symphonysh.com",
      to: email,
      subject: "Thank you for contacting Symphony Smart Homes",
      content: `
Dear ${name},

Thank you for contacting Symphony Smart Homes. We have received your message and will get back to you shortly.

Best regards,
Symphony Smart Homes Team
      `,
    });

    await client.close();

    // Update the submission to mark email as sent
    await supabase
      .from('contact_submissions')
      .update({ email_sent: true })
      .eq('id', submission.id);

    return new Response(JSON.stringify({ success: true }), {
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
