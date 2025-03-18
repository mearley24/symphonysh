
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { corsHeaders, formatDateTime, validateAppointment } from "./utils.ts";
import { sendBusinessEmail, sendCustomerEmail } from "./emailSender.ts";

// Debug logs at the top level for function initialization
console.log("Notify appointment function initializing...");
console.log("Function environment check:");
console.log("- RESEND_API_KEY available:", !!Deno.env.get("RESEND_API_KEY"));

/**
 * Main serve function
 */
serve(async (req) => {
  console.log("========== Notification function triggered ==========");
  console.log("Request method:", req.method);
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
    console.log("Handling GET request");
    return new Response(JSON.stringify({ 
      message: "This is the notify-appointment API endpoint. POST requests with appointment data are required." 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
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
    
    const { appointment } = requestData;
    
    // Validate appointment data
    const validation = validateAppointment(appointment);
    if (!validation.valid) {
      console.error(`Missing required fields: ${validation.missingFields.join(', ')}`);
      return new Response(
        JSON.stringify({ 
          error: "Missing required fields", 
          missingFields: validation.missingFields,
          receivedData: appointment
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: 400,
        }
      );
    }
    
    console.log("All required fields are present, proceeding with email notifications");
    
    // Format date and time
    const { formattedDate, formattedTime } = formatDateTime(appointment.date, appointment.time);
    console.log("Formatted date and time:", formattedDate, formattedTime);
    
    // Send business email
    console.log("Sending business email notification...");
    const businessEmailResult = await sendBusinessEmail(appointment, formattedDate, formattedTime);
    
    // Send customer email
    console.log("Sending customer email notification...");
    const customerEmailResult = await sendCustomerEmail(appointment, formattedDate, formattedTime);
    
    console.log("Business email result:", JSON.stringify(businessEmailResult));
    console.log("Customer email result:", JSON.stringify(customerEmailResult));
    
    // Return response with details of both email operations
    return new Response(JSON.stringify({ 
      success: businessEmailResult.success || customerEmailResult.success, 
      businessEmail: {
        success: businessEmailResult.success,
        data: businessEmailResult.data,
        error: businessEmailResult.error ? businessEmailResult.error.message : null
      },
      customerEmail: {
        success: customerEmailResult.success,
        data: customerEmailResult.data,
        error: customerEmailResult.error ? customerEmailResult.error.message : null
      }
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Function error:", error.message);
    console.error("Error stack:", error.stack);
    console.error("Full error details:", JSON.stringify(error, Object.getOwnPropertyNames(error), 2));
    
    return new Response(
      JSON.stringify({ 
        error: error.message, 
        stack: error.stack,
        details: typeof error === 'object' ? JSON.stringify(error, Object.getOwnPropertyNames(error), 2) : String(error)
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
