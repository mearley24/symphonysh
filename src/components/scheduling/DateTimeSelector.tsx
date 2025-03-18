
import { CalendarConnection } from "./date-time-selector/CalendarConnection";
import { DateCalendar } from "./date-time-selector/DateCalendar";
import { TimeSlots } from "./date-time-selector/TimeSlots";
import { useTimeSlots } from "./date-time-selector/useTimeSlots";
import { useState, useEffect, useRef } from "react";
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
  console.log("DateTimeSelector rendering with props:", { date, selectedTime });
  const [error, setError] = useState<string | null>(null);
  const [componentError, setComponentError] = useState<Error | null>(null);
  const [hasFatalError, setHasFatalError] = useState(false);
  const hasLoggedError = useRef(false);
  const apiErrorCount = useRef(0);

  // Error boundary functionality
  useEffect(() => {
    console.log("DateTimeSelector useEffect running");
    const originalConsoleError = console.error;
    console.error = (...args) => {
      // Log normally but also capture React errors
      originalConsoleError(...args);
      
      const errorMessage = args.join(' ');
      if (
        (errorMessage.includes('React') || errorMessage.includes('Error')) && 
        !errorMessage.includes('Failed to fetch') &&
        !hasLoggedError.current
      ) {
        hasLoggedError.current = true;
        setComponentError(new Error(errorMessage));
      }
    };
    
    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  // Fallback UI when API calls fail repeatedly
  if (apiErrorCount.current > 3 || hasFatalError || componentError) {
    console.log("DateTimeSelector showing error fallback UI");
    
    return (
      <div className="space-y-4">
        <Alert variant="destructive" className="bg-red-500/20 border-red-500/40">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            There was a problem loading the calendar. Please try again later or select a date and time manually.
          </AlertDescription>
        </Alert>
        
        <DateCalendar date={date} setDate={setDate} />
        
        {date && (
          <div className="space-y-2">
            <p className="text-sm text-white/80">Please select a time:</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM"].map((time) => (
                <button
                  key={time}
                  className={`py-2 px-4 rounded-md transition-colors ${
                    selectedTime === time
                      ? "bg-accent text-white"
                      : "bg-white/10 hover:bg-white/20 text-white"
                  }`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  try {
    console.log("Initializing hooks in DateTimeSelector");
    
    // Custom hooks for time slots management
    const { availableTimeSlots, isLoading, fetchTimeSlots } = useTimeSlots(
      date,
      selectedTime,
      setSelectedTime
    );

    console.log("useTimeSlots initialized with:", { availableTimeSlots, isLoading });

    console.log("Rendering DateTimeSelector UI components");

    return (
      <div className="space-y-4">
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
          {/* Pass only the props that CalendarConnection expects */}
          <CalendarConnection isEmailNotificationsEnabled={true} />
          
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
    setHasFatalError(true);
    return (
      <div className="space-y-4">
        <Alert variant="destructive" className="bg-red-500/20 border-red-500/40">
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            There was a problem loading the calendar. Please try again later.
            {err instanceof Error ? ` Error: ${err.message}` : ''}
          </AlertDescription>
        </Alert>
        
        <DateCalendar date={date} setDate={setDate} />
      </div>
    );
  }
}
