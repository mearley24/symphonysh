
import { AlertTriangle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DateCalendar } from "./DateCalendar";

interface ErrorFallbackProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
}

export function ErrorFallback({ 
  date, 
  setDate, 
  selectedTime, 
  setSelectedTime 
}: ErrorFallbackProps) {
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
