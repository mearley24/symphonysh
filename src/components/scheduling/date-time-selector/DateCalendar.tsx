
import { Info } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useIsMobile } from "@/hooks/use-mobile";

interface DateCalendarProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
}

export function DateCalendar({ date, setDate }: DateCalendarProps) {
  const isMobile = useIsMobile();
  
  return (
    <div className="glass-dark rounded-lg p-4">
      <div className="flex items-center mb-4">
        <div className="flex items-center text-blue-200 space-x-2">
          <Info size={16} />
          <p className="text-sm">Select a weekday (Monday-Friday) for your appointment</p>
        </div>
      </div>
      
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="bg-transparent text-white w-full"
        disabled={(date) => {
          const now = new Date();
          now.setHours(0, 0, 0, 0);
          return (
            date < now ||
            date.getDay() === 0 ||
            date.getDay() === 6
          );
        }}
        classNames={isMobile ? {
          day_today: "bg-white/10 text-white",
          day_selected: "bg-accent text-white hover:bg-accent hover:text-white",
          day_outside: "text-white/40 opacity-50"
        } : undefined}
      />
    </div>
  );
}
