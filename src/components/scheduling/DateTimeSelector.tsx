
import { CalendarConnection } from "./date-time-selector/CalendarConnection";
import { DateCalendar } from "./date-time-selector/DateCalendar";
import { TimeSlots } from "./date-time-selector/TimeSlots";
import { useGoogleCalendarAuth } from "./date-time-selector/useGoogleCalendarAuth";
import { useTimeSlots } from "./date-time-selector/useTimeSlots";
import { useState, useEffect } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";

interface DateTimeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
}

export function DateTimeSelector({ 
  date, 
  setDate, 
  selectedTime, 
  setSelectedTime 
}: DateTimeSelectorProps) {
  const [error, setError] = useState<string | null>(null);
  const [componentError, setComponentError] = useState<Error | null>(null);

  // Error boundary functionality
  useEffect(() => {
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Log normally but also capture React errors
      originalConsoleError(...args);
      
      const errorMessage = args.join(' ');
      if (errorMessage.includes('React') || errorMessage.includes('Error')) {
        setComponentError(new Error(errorMessage));
      }
    };
    
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  try {
    // Custom hooks for time slots management
    const { availableTimeSlots, isLoading, fetchTimeSlots } = useTimeSlots(
      date,
      selectedTime,
      setSelectedTime
    );

    // Custom hook for Google Calendar authentication
    const { 
      connectingCalendar, 
      setConnectingCalendar, 
      isCalendarConnected, 
      authError,
      checkingConnection,
      retryConnectionCheck
    } = useGoogleCalendarAuth(date, fetchTimeSlots);

    // Handle errors from hooks
    useEffect(() => {
      if (authError) {
        console.error("Auth error:", authError);
        setError(authError);
      }
    }, [authError]);

    // If there's an internal component error, show it but don't break the UI
    if (componentError) {
      console.error("DateTimeSelector component error:", componentError);
      return (
        <div className="space-y-4">
          <Alert variant="destructive" className="bg-red-500/20 border-red-500/40">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              There was a problem loading the calendar component. 
              Please try refreshing the page or contact support.
            </AlertDescription>
          </Alert>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
          <CalendarConnection
            isCalendarConnected={isCalendarConnected}
            connectingCalendar={connectingCalendar}
            checkingConnection={checkingConnection}
            authError={authError}
            setConnectingCalendar={setConnectingCalendar}
            retryConnectionCheck={retryConnectionCheck}
          />
          
          <DateCalendar date={date} setDate={setDate} />
        </div>

        {date && (
          <TimeSlots
            date={date}
            setDate={setDate}
            selectedTime={selectedTime}
            setSelectedTime={setSelectedTime}
            isLoading={isLoading}
            availableTimeSlots={availableTimeSlots}
          />
        )}
      </div>
    );
  } catch (err) {
    // Global error catcher
    console.error("Caught error in DateTimeSelector:", err);
    return (
      <div className="space-y-4">
        <Alert variant="destructive" className="bg-red-500/20 border-red-500/40">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            There was a problem loading the calendar. Please try again later.
            {err instanceof Error ? ` Error: ${err.message}` : ''}
          </AlertDescription>
        </Alert>
      </div>
    );
  }
}
