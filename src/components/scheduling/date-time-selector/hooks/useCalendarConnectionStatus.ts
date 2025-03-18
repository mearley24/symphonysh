
import { useState, useEffect } from "react";
import { isGoogleCalendarConnected } from "@/utils/appointments/googleCalendar";

/**
 * Hook to check Google Calendar connection status
 */
export function useCalendarConnectionStatus() {
  const [isCalendarConnected, setIsCalendarConnected] = useState(false);
  const [checkingConnection, setCheckingConnection] = useState(true);

  // Check if calendar is connected on mount
  useEffect(() => {
    const checkCalendarConnection = async () => {
      try {
        setCheckingConnection(true);
        const connected = await isGoogleCalendarConnected();
        setIsCalendarConnected(connected);
        console.log("Google Calendar connection status:", connected);
      } catch (error) {
        console.error("Error checking calendar connection:", error);
        // Don't show an error toast here as it would be disruptive on page load
        // Just log it and continue with isCalendarConnected set to false
      } finally {
        setCheckingConnection(false);
      }
    };
    
    checkCalendarConnection();
  }, []);

  return {
    isCalendarConnected,
    setIsCalendarConnected,
    checkingConnection
  };
}
