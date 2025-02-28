
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

interface DateTimeSelectorProps {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  selectedTime: string | undefined;
  setSelectedTime: (time: string) => void;
}

const AVAILABLE_TIMES = [
  "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"
];

export function DateTimeSelector({ date, setDate, selectedTime, setSelectedTime }: DateTimeSelectorProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="bg-transparent text-white"
          disabled={(date) => {
            const now = new Date();
            now.setHours(0, 0, 0, 0);
            return (
              date < now ||
              date.getDay() === 0 ||
              date.getDay() === 6
            );
          }}
        />
      </div>

      {date && (
        <div className="bg-white/5 backdrop-blur-sm rounded-lg p-4">
          <h3 className="text-lg font-medium text-white mb-4">Available Times</h3>
          <div className="grid grid-cols-3 gap-2">
            {AVAILABLE_TIMES.map((time) => (
              <Button
                key={time}
                type="button"
                variant={selectedTime === time ? "default" : "secondary"}
                onClick={() => setSelectedTime(time)}
                className="w-full"
              >
                {time}
              </Button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
