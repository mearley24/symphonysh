
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.48.1";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

// CORS headers
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: corsHeaders,
    });
  }

  try {
    console.log("Checking Google Calendar connection");
    
    // Check if we have active tokens in the database
    const { data: tokens, error } = await supabase
      .from("google_tokens")
      .select("id, access_token, refresh_token, expiry")
      .order("created_at", { ascending: false })
      .limit(1);
    
    if (error) {
      console.error("Error checking Google tokens:", error);
      throw error;
    }
    
    const connected = tokens && tokens.length > 0 && 
                      tokens[0].access_token && 
                      tokens[0].refresh_token;
    
    // Also check if the token is expired
    let isExpired = false;
    if (connected && tokens[0].expiry) {
      const expiryDate = new Date(tokens[0].expiry);
      isExpired = expiryDate < new Date();
      console.log("Token expiry status:", { expiry: tokens[0].expiry, isExpired });
    }
    
    return new Response(
      JSON.stringify({ 
        connected: connected && !isExpired,
        needsRefresh: connected && isExpired,
        tokenInfo: connected ? {
          hasAccessToken: !!tokens[0].access_token,
          hasRefreshToken: !!tokens[0].refresh_token,
          expiry: tokens[0].expiry
        } : null
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Function error:", error.message);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
