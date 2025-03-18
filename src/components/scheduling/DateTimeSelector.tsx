
import { CalendarConnection } from "./date-time-selector/CalendarConnection";
import { DateCalendar } from "./date-time-selector/DateCalendar";
import { TimeSlots } from "./date-time-selector/TimeSlots";
import { useGoogleCalendarAuth } from "./date-time-selector/useGoogleCalendarAuth";
import { useTimeSlots } from "./date-time-selector/useTimeSlots";
import { useState, useEffect } from "react";

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
    checkingConnection 
  } = useGoogleCalendarAuth(date, fetchTimeSlots);

  // Handle errors from hooks
  useEffect(() => {
    if (authError) {
      console.error("Auth error:", authError);
      setError(authError);
    }
  }, [authError]);

  // If there's an error, log it but don't break the UI
  if (error) {
    console.error("DateTimeSelector error:", error);
    // Continue rendering, don't return early
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
}
