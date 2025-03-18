
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    console.log("Handling OPTIONS request");
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    console.log("Simplified auth function triggered:", req.method);
    
    // Return a simplified response that indicates calendar functionality 
    // now uses email notifications instead
    return new Response(JSON.stringify({ 
      status: "email_only",
      message: "Calendar functionality now uses email notifications. No Google auth required."
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error('Function error:', error.message, error.stack);
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
