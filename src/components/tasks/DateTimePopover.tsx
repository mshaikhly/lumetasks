"use client";

import { useEffect, useState } from "react";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { DateTimeInputs } from "./DateTimeInputs";
import { DateTimeSwitches } from "./DateTimeSwitches";
import { DateTimeCalendar } from "./DateTimeCalendar";
import { DateTimePickerCellProps } from "@/types/Task";
import { format } from "date-fns";
import { useTaskTableStore } from "@/store/task-store"; // Import your store

export const DateTimePopover: React.FC<DateTimePickerCellProps> = ({ id, value, onEdit }) => {
  console.log("Value prop passed to DateTimePopover:", value);
  const [startDate, setStartDate] = useState(value.startDate || "");
  const [startTime, setStartTime] = useState(value.startTime || "12:00 AM"); // Ensure default start time
  const [endDate, setEndDate] = useState(value.endDate || "");
  const [endTime, setEndTime] = useState(value.endTime || "");
  const [includeTime, setIncludeTime] = useState(!!value.startTime);
  const [includeEndDate, setIncludeEndDate] = useState(!!value.endDate);
  const [allDay, setAllDay] = useState(value.allDay ?? false); // Default to false

  const { handleEdit } = useTaskTableStore(); // Access the store

  // Sync local state with the `value` prop
  useEffect(() => {
    setStartDate(value.startDate || "");
    setStartTime(value.startTime || "12:00 AM");
    setEndDate(value.endDate || "");
    setEndTime(value.endTime || "");
    setIncludeTime(!!value.startTime);
    setIncludeEndDate(!!value.endDate);
    console.log("Updating allDay state:", value.allDay);
    setAllDay(value.allDay ?? false); // Default to false if undefined
  }, [value]);

  // Toggle All Day
  const handleToggleAllDay = (checked: boolean) => {
    setAllDay(checked);
    if (checked) {
      setIncludeTime(false);
      setStartTime("");
      setEndTime("");
    } else {
      setIncludeTime(true);
      setStartTime(startTime || "12:00 AM");
      setEndTime(endTime || "12:00 AM");
    }
  };

  // Toggle End Date
  const handleToggleEndDate = (checked: boolean) => {
    setIncludeEndDate(checked);
    if (checked) {
      setEndDate(startDate || format(new Date(), "MMM d, yyyy"));
      if (includeTime && !endTime) {
        setEndTime(startTime || "12:00 AM");
      }
    } else {
      setEndDate("");
      setEndTime("");
    }
  };

  // Toggle Time
  const handleToggleTime = (checked: boolean) => {
    setIncludeTime(checked);
    if (checked) {
      setStartTime(startTime || "12:00 AM");
      setEndTime(endTime || "12:00 AM");
      if (includeEndDate && !endTime) {
        setEndTime("12:00 AM");
      }
    } else {
      setStartTime("");
      setEndTime("");
    }
  };

  // Save the updated values
  const handleSave = () => {
    const updatedValue = { startDate, startTime, endDate, endTime, allDay };

    onEdit(updatedValue); // Pass changes up to the parent

    // Update the store
    handleEdit(id, "when", updatedValue); // Use the id prop
  };

  return (
    <Popover
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleSave(); // Save state when the popover closes
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-[240px] justify-start text-left font-normal"
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {startDate && endDate
            ? `${startDate} - ${endDate}`
            : startDate
            ? startDate
            : "Pick a date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px] p-2">
        <DateTimeInputs
          dates={{ startDate, startTime, endDate, endTime }}
          handlers={{
            onUpdateStartDate: setStartDate,
            onUpdateStartTime: setStartTime,
            onUpdateEndDate: setEndDate,
            onUpdateEndTime: setEndTime,
          }}
          includeTime={includeTime}
          includeEndDate={includeEndDate}
        />

        <DateTimeCalendar
          startDate={startDate}
          endDate={endDate}
          includeEndDate={includeEndDate}
          onUpdateStartDate={setStartDate}
          onUpdateEndDate={setEndDate}
        />

        <DateTimeSwitches
          includeTime={includeTime}
          includeEndDate={includeEndDate}
          allDay={allDay}
          onToggleTime={handleToggleTime}
          onToggleEndDate={handleToggleEndDate}
          onToggleAllDay={handleToggleAllDay}
        />
      </PopoverContent>
    </Popover>
  );
};
