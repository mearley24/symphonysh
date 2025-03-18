import { useState, useCallback } from "react";

// Simplified hook that always returns connected = true
export function useCalendarConnectionStatus() {
  const [isCalendarConnected, setIsCalendarConnected] = useState<boolean>(true);
  const [checkingConnection, setCheckingConnection] = useState<boolean>(false);

  // No-op function for retryConnectionCheck
  const retryConnectionCheck = useCallback(async (): Promise<void> => {
    return Promise.resolve();
  }, []);

  return {
    isCalendarConnected: true, // Always true now
    setIsCalendarConnected,
    checkingConnection: false, // Always false now
    retryConnectionCheck
  };
}
