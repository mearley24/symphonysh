
/**
 * Test utility to verify Zapier webhook connectivity
 */
export async function testZapierWebhook(): Promise<boolean> {
  try {
    const ZAPIER_WEBHOOK_URL = "https://hooks.zapier.com/hooks/catch/22322669/2cwoj8b/";
    
    console.log("Testing Zapier webhook connectivity...");
    
    const testPayload = {
      test: true,
      timestamp: new Date().toISOString(),
      message: "This is a test from Symphony Smart Homes app"
    };
    
    await fetch(ZAPIER_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      mode: "no-cors",
      body: JSON.stringify(testPayload)
    });
    
    console.log("Zapier test webhook call completed");
    return true;
  } catch (error) {
    console.error("Zapier test webhook error:", error);
    return false;
  }
}
