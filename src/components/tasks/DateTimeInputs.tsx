import { DateInput } from "@/components/tasks/DateInput";
import { TimeInput } from "@/components/tasks/TimeInput";
import { DateTimeInputsProps } from "@/types/Task";
import { useCallback, useEffect, useState } from "react";
import { safeParseDate, safeParseTime } from "@/utils/dateTimeHandlers";
import { format } from "date-fns";

export const DateTimeInputs: React.FC<DateTimeInputsProps> = ({
  dates: { startDate, startTime, endDate, endTime },
  handlers: {
    onUpdateStartDate,
    onUpdateStartTime,
    onUpdateEndDate,
    onUpdateEndTime,
  },
  includeTime,
  includeEndDate,
}) => {
  const [fieldErrors, setFieldErrors] = useState<{ [key: string]: string | null }>({});

  // Centralized validation with useCallback
  const validateChronology = useCallback(() => {
    const parsedStartDate = safeParseDate(startDate || "");
    const parsedEndDate = safeParseDate(endDate || "");
    const parsedStartTime = safeParseTime(startTime || "");
    const parsedEndTime = safeParseTime(endTime || "");

    const errors: { [key: string]: string | null } = {};

    if (parsedStartDate && parsedEndDate && parsedStartDate > parsedEndDate) {
      onUpdateEndDate(format(parsedStartDate, "MMM d, yyyy"));
    }

    if (
      includeTime &&
      parsedStartDate &&
      parsedEndDate &&
      parsedStartDate.getTime() === parsedEndDate.getTime() &&
      parsedStartTime &&
      parsedEndTime &&
      parsedStartTime > parsedEndTime
    ) {
      onUpdateEndTime(format(parsedStartTime, "hh:mm a"));
    }

    setFieldErrors(errors);
  }, [startDate, endDate, startTime, endTime, onUpdateEndDate, onUpdateEndTime, includeTime]);

  useEffect(() => {
    validateChronology();
  }, [validateChronology]);

  return (
    <div className="grid grid-cols-2 gap-4" style={{ maxWidth: "280px" }}>
      <DateInput
        id="start-date"
        label="Start Date"
        value={startDate || ""}
        onUpdate={onUpdateStartDate}
      />
      {includeTime && (
        <TimeInput
          id="start-time"
          label="Start Time"
          value={startTime || ""}
          onUpdate={onUpdateStartTime}
        />
      )}
      {includeEndDate && (
        <DateInput
          id="end-date"
          label="End Date"
          value={endDate || ""}
          onUpdate={onUpdateEndDate}
        />
      )}
      {includeEndDate && includeTime && (
        <TimeInput
          id="end-time"
          label="End Time"
          value={endTime || ""}
          onUpdate={onUpdateEndTime}
        />
      )}

      {/* Display errors */}
      {Object.values(fieldErrors).map(
        (error, index) => error && <p key={index} className="text-red-500 col-span-2">{error}</p>
      )}
    </div>
  );
};