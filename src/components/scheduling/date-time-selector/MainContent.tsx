
import { CalendarConnection } from "./CalendarConnection";
import { DateCalendar } from "./DateCalendar";
import { TimeSlots } from "./TimeSlots";

interface MainContentProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
  isLoading: boolean;
  availableTimeSlots: string[];
}

export function MainContent({
  date,
  setDate,
  selectedTime,
  setSelectedTime,
  isLoading,
  availableTimeSlots
}: MainContentProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
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
}
