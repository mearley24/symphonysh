
import { useTimeSlots } from "./date-time-selector/useTimeSlots";
import { ErrorFallback } from "./date-time-selector/ErrorFallback";
import { MainContent } from "./date-time-selector/MainContent";
import { useErrorHandling } from "./date-time-selector/hooks/useErrorHandling";
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

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
  
  // Use the error handling hook
  const {
    error,
    setError,
    componentError,
    hasFatalError,
    setHasFatalError,
    apiErrorCount
  } = useErrorHandling();

  // Fallback UI when API calls fail repeatedly
  if (apiErrorCount.current > 3 || hasFatalError || componentError) {
    console.log("DateTimeSelector showing error fallback UI");
    
    return (
      <ErrorFallback
        date={date}
        setDate={setDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
      />
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
      <MainContent
        date={date}
        setDate={setDate}
        selectedTime={selectedTime}
        setSelectedTime={setSelectedTime}
        isLoading={isLoading}
        availableTimeSlots={availableTimeSlots}
      />
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
