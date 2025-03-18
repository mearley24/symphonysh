import { useState } from "react";

// Simplified hook that doesn't actually do Google auth anymore
export function useGoogleCalendarAuth(
  date: Date | undefined, 
  fetchTimeSlots: (date: Date) => Promise<void>,
  onApiError?: () => void
) {
  // We don't need most of these states anymore, but we'll keep them
  // to avoid breaking the interface expected by components using this hook
  const [connectingCalendar, setConnectingCalendar] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isCalendarConnected, setIsCalendarConnected] = useState<boolean>(true);
  const [checkingConnection, setCheckingConnection] = useState<boolean>(false);
  
  // No-op function for retryConnectionCheck
  const retryConnectionCheck = async (): Promise<void> => {
    return Promise.resolve();
  };

  return {
    connectingCalendar, 
    setConnectingCalendar, 
    isCalendarConnected, // Always true now
    authError,
    checkingConnection,
    retryConnectionCheck
  };
}
