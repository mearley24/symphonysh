
import { CalendarConnection } from "./date-time-selector/CalendarConnection";
import { DateCalendar } from "./date-time-selector/DateCalendar";
import { TimeSlots } from "./date-time-selector/TimeSlots";
import { useGoogleCalendarAuth } from "./date-time-selector/useGoogleCalendarAuth";
import { useTimeSlots } from "./date-time-selector/useTimeSlots";

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
