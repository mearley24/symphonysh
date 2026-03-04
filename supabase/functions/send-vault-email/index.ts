import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const resendApiKey = Deno.env.get("RESEND_API_KEY");
const resend = new Resend(resendApiKey);

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, access_code, project_name } = await req.json();
    
    if (!name || !email || !access_code) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: name, email, access_code" }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 400 }
      );
    }

    // Primary vault URL - clients will need to be on local network or Tailscale
    const vaultUrl = `http://bob.local:8801/?code=${access_code}`;
    
    // Send vault access email to client
    const result = await resend.emails.send({
      from: "Symphony Smart Homes <notifications@symphonysh.com>",
      to: [email],
      subject: "Your Symphony Smart Home Credentials Vault",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #333; text-align: center;">Welcome to Your Credentials Vault</h1>
          
          <p style="font-size: 16px; line-height: 1.5;">Hi ${name},</p>
          
          <p style="font-size: 16px; line-height: 1.5;">
            We're preparing your smart home installation${project_name ? ` for <strong>${project_name}</strong>` : ''}. 
            To ensure a smooth setup, please add your account credentials to your secure vault.
          </p>
          
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 24px 0; text-align: center;">
            <p style="margin: 0 0 16px 0; font-size: 14px; color: #666;">Your access code:</p>
            <p style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #0056b3; margin: 0;">${access_code}</p>
          </div>
          
          <div style="text-align: center; margin: 24px 0;">
            <a href="${vaultUrl}" style="display: inline-block; background-color: #0056b3; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
              Open Your Vault
            </a>
          </div>
          
          <p style="font-size: 16px; line-height: 1.5;">
            <strong>What to add:</strong>
          </p>
          <ul style="font-size: 15px; line-height: 1.8; color: #444;">
            <li>Your preferred WiFi network name and password</li>
            <li>Streaming services (Netflix, Spotify, etc.)</li>
            <li>Smart home accounts (Control4, Sonos, Ring, etc.)</li>
          </ul>
          
          <p style="font-size: 16px; line-height: 1.5;">
            Your credentials are encrypted and stored securely. Our installers will use them 
            to set up your devices without you needing to be present for every login.
          </p>
          
          <p style="font-size: 16px; line-height: 1.5;">
            <strong>Note:</strong> You'll need to be on the same network as your Symphony system 
            to access the vault, or we can walk you through remote access during your consultation.
          </p>
          
          <p style="font-size: 16px; line-height: 1.5;">
            Questions? Reply to this email or call us at (970) 390-8323.
          </p>
          
          <p style="font-size: 16px; line-height: 1.5;">
            Best regards,<br>
            <strong>Symphony Smart Homes</strong>
          </p>
          
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; color: #999; font-size: 12px;">
            <p>This is a secure message from Symphony Smart Homes.</p>
            <p>If you didn't request this, please contact us immediately.</p>
          </div>
        </div>
      `
    });
    
    console.log("Vault email sent:", result);
    
    return new Response(
      JSON.stringify({ success: true, result }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 200 }
    );
    
  } catch (error) {
    console.error("Error sending vault email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" }, status: 500 }
    );
  }
});
