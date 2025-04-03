
/**
 * Test utility to verify Zapier webhook connectivity
 */
export async function testZapierWebhook(): Promise<boolean> {
  try {
    const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22322669/2cwoj8b/";
    
    console.log("Testing Zapier webhook connectivity...");
    
    const testPayload = {
      appointment: {
        id: `test-${Date.now()}`,
        name: "Test User",
        email: "test@example.com",
        phone: "555-123-4567",
        message: "This is a test appointment",
        service: "Test Service",
        date: "Monday, January 1, 2024",
        time: "10:00 AM"
      }
    };
    
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors",
      body: JSON.stringify(testPayload)
    });
    
    console.log("Zapier test webhook call completed with sample data");
    return true;
  } catch (error) {
    console.error("Zapier test webhook error:", error);
    return false;
  }
}

/**
 * Send a real appointment sample to Zapier for testing the email template
 */
export async function sendSampleAppointment(): Promise<boolean> {
  try {
    const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22322669/2cwoj8b/";
    
    console.log("Sending sample appointment data to Zapier...");
    
    const samplePayload = {
      appointment: {
        id: `sample-${Date.now()}`,
        name: "John Smith",
        email: "email@example.com",
        phone: "303-555-1234",
        message: "I'm interested in upgrading my home theater system and would like to discuss options.",
        service: "Audio & Entertainment",
        date: "Thursday, December 15, 2023",
        time: "2:00 PM"
      }
    };
    
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors",
      body: JSON.stringify(samplePayload)
    });
    
    console.log("Sample appointment sent to Zapier for email template testing");
    return true;
  } catch (error) {
    console.error("Error sending sample appointment:", error);
    return false;
  }
}
