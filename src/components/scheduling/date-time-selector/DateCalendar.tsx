
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
        styles={isMobile ? {
          caption_label: { color: '#ffffff' },
          day: { color: '#ffffff' },
          day_today: { backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff' },
          day_selected: { backgroundColor: '#ca9f5c', color: '#ffffff' },
          day_outside: { color: 'rgba(255,255,255,0.4)' }
        } : undefined}
      />
    </div>
  );
}
