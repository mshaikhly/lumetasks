import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ErrorMessage } from "@/components/ui/errorMessage";
import { TimeInputProps } from "@/types/Task";


export const TimeInput: React.FC<TimeInputProps> = ({
  id,
  label,
  value,
  onUpdate,
  onBlur,
}) => {
  const [rawInput, setRawInput] = useState(value); // Local state for raw input
  const [error, setError] = useState<string | null>(null);

  // Sync local state (`rawInput`) with `value` prop on changes
  useEffect(() => {
    setRawInput(value);
  }, [value]);

  // Normalize time to 12-hour format
  const normalizeTime = (time: string): string => {
    const match12 = time.match(/^(\d{1,2}):(\d{2})\s?(AM|PM)$/i);
    if (match12) {
      const [hours, minutes, period] = match12.slice(1, 4);
      const hoursNum = Number(hours);
      const minutesNum = Number(minutes);

      if (
        hoursNum >= 1 &&
        hoursNum <= 12 &&
        minutesNum >= 0 &&
        minutesNum <= 59
      ) {
        return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")} ${period.toUpperCase()}`;
      }
    }

    const match24 = time.match(/^(\d{1,2}):(\d{2})$/);
    if (match24) {
      const [hours, minutes] = match24.slice(1).map(Number);

      if (hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59) {
        const period = hours >= 12 ? "PM" : "AM";
        const normalizedHours = hours % 12 === 0 ? 12 : hours % 12;
        return `${normalizedHours.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")} ${period}`;
      }
    }

    return "Invalid";
  };

  // Validate time input on blur
  const handleBlur = () => {
    console.log("Raw input:", rawInput);
    if (rawInput === value) {
      // Avoid redundant validation if the value hasn't changed
      console.log("Value hasn't changed");
      return;
    }

    const normalizedTime = normalizeTime(rawInput);

    if (normalizedTime === "Invalid") {
      setError("Invalid time format. Use hh:mm AM/PM.");
      console.log("Invalid time format");
    } else {
      setError(null); // Clear any existing errors
      onUpdate(normalizedTime); // Propagate normalized value
      console.log("Time updated:", normalizedTime);
    }

    if (onBlur) {
      onBlur(rawInput); // Pass normalized time to parent's onBlur
    }

  };

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawInput(e.target.value); // Update raw input
    setError(null); // Clear error on typing
  };

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={rawInput} // Bind to local state
        onChange={handleChange}
        onBlur={handleBlur} // Validate on blur
        className={`w-full ${error ? "border-red-500" : ""}`} // Add error styling
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <ErrorMessage id={`${id}-error`} message={error} />}
    </div>
  );
};
