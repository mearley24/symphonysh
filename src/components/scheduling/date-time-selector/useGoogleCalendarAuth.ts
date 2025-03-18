
import { useState, useEffect, useCallback } from "react";
import { useCalendarConnectionStatus } from "./hooks/useCalendarConnectionStatus";
import { useGoogleAuthCallback } from "./hooks/useGoogleAuthCallback";

export function useGoogleCalendarAuth(
  date: Date | undefined, 
  fetchTimeSlots: (date: Date) => Promise<void>,
  onApiError?: () => void
) {
  console.log("useGoogleCalendarAuth hook initialized");
  
  const [connectingCalendar, setConnectingCalendar] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [hasAttemptedConnection, setHasAttemptedConnection] = useState(false);
  
  // Custom hook for connection status
  const { 
    isCalendarConnected, 
    setIsCalendarConnected, 
    checkingConnection,
    retryConnectionCheck
  } = useCalendarConnectionStatus();

  // Handle API errors
  const handleApiError = useCallback((error: Error) => {
    console.error("API Error in Google Calendar Auth:", error);
    if (onApiError) onApiError();
    
    // Only set auth error once to prevent rerenders
    if (!hasAttemptedConnection) {
      setAuthError("Unable to connect to calendar service. You can still book without calendar integration.");
      setHasAttemptedConnection(true);
    }
  }, [onApiError, hasAttemptedConnection]);

  // Custom hook for auth callback with error handling
  useGoogleAuthCallback(
    date, 
    fetchTimeSlots,
    setConnectingCalendar,
    setIsCalendarConnected,
    (error) => {
      setAuthError(error);
      handleApiError(new Error(error));
    }
  );

  return {
    connectingCalendar, 
    setConnectingCalendar, 
    isCalendarConnected, 
    authError,
    checkingConnection,
    retryConnectionCheck
  };
}
