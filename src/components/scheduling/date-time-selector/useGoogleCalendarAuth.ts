
import { useState } from "react";
import { useCalendarConnectionStatus } from "./hooks/useCalendarConnectionStatus";
import { useGoogleAuthCallback } from "./hooks/useGoogleAuthCallback";

export function useGoogleCalendarAuth(date: Date | undefined, fetchTimeSlots: (date: Date) => Promise<void>) {
  console.log("useGoogleCalendarAuth hook initialized");
  
  const [connectingCalendar, setConnectingCalendar] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  
  // Custom hook for connection status
  const { 
    isCalendarConnected, 
    setIsCalendarConnected, 
    checkingConnection,
    retryConnectionCheck
  } = useCalendarConnectionStatus();

  // Custom hook for auth callback
  useGoogleAuthCallback(
    date, 
    fetchTimeSlots,
    setConnectingCalendar,
    setIsCalendarConnected,
    setAuthError
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
