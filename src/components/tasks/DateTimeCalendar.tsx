import React, { useEffect, useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { DateTimeCalendarProps } from "@/types/Task";
import { format } from "date-fns";

export const DateTimeCalendar: React.FC<DateTimeCalendarProps> = ({
  startDate,
  endDate,
  includeEndDate,
  onUpdateStartDate,
  onUpdateEndDate,
}) => {
  // Internal range state to align with react-day-picker
  const [range, setRange] = useState<DateRange>({
    from: startDate ? new Date(startDate) : undefined,
    to: endDate ? new Date(endDate) : undefined,
  });

  // Synchronize internal range state with external props
  useEffect(() => {
    const from = startDate ? new Date(startDate) : undefined;
    const to = endDate ? new Date(endDate) : undefined;
  
    // Only update if there's a mismatch
    setRange((prevRange) => {
      if (from !== prevRange.from || to !== prevRange.to) {
        return { from, to }; // Update range if mismatched
      }
      return prevRange; // Keep the same range if there's no mismatch
    });
  }, [startDate, endDate]); 

  const handleSelectRange = (newRange: DateRange | undefined) => {
    if (!newRange) {
      // If no range is selected, reset the range
      setRange({ from: undefined, to: undefined });
      onUpdateStartDate("");
      onUpdateEndDate("");
      return;
    }

    setRange(newRange); // Update internal state

    // Format and update start and end dates
    const start = newRange.from ? format(newRange.from, "MMM d, yyyy") : "";
    const end = newRange.to ? format(newRange.to, "MMM d, yyyy") : "";

    onUpdateStartDate(start);
    onUpdateEndDate(end);
  };

  return includeEndDate ? (
    <Calendar
      mode="range"
      selected={range} // Use the internal range state
      onSelect={handleSelectRange} // Synchronize with internal and external state
      numberOfMonths={1}
    />
  ) : (
    <Calendar
      mode="single"
      selected={range.from} // Only display the start date for single mode
      onSelect={(date) => {
        if (!date) return;

        const start = format(date, "MMM d, yyyy");
        setRange({ from: date, to: undefined });
        onUpdateStartDate(start);
      }}
    />
  );
};
