
// Create a simplified calendar event function
export async function createCalendarEvent(appointmentData: any, serviceName: string) {
  try {
    console.log("Creating calendar event...");
    
    // Return a simple object with the appointment ID
    return {
      id: appointmentData.id || "appointment-" + Date.now(),
      htmlLink: "#",
      status: "created"
    };
  } catch (error) {
    console.error("Failed to create calendar event:", error);
    throw error;
  }
}
