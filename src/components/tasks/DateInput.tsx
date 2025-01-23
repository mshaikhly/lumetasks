import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { ErrorMessage } from "@/components/ui/errorMessage";
import { safeParseDate } from "@/utils/dateTimeHandlers"; // Import centralized logic
import { format } from "date-fns";
import { DateInputProps } from "@/types/Task";

export const DateInput: React.FC<DateInputProps> = ({
  id,
  label,
  value,
  onUpdate,
  onBlur
}) => {
  const [rawInput, setRawInput] = useState(value); // Manage raw user input
  const [error, setError] = useState<string | null>(null); // Manage validation errors

  // Sync local state (`rawInput`) with the updated `value` prop
  useEffect(() => {
    setRawInput(value);
  }, [value]);

  const handleBlur = () => {
    const parsedDate = safeParseDate(rawInput); // Validate raw input
    console.log("Date handleBlur", parsedDate);
  
    if (!parsedDate) {
      setError("Please enter a valid date."); // Display error for invalid dates
    } else {
      setError(null); // Clear errors
      const normalizedDate = format(parsedDate, "MMM d, yyyy");
      onUpdate(normalizedDate); // Propagate normalized value to the parent
  
      // Pass the normalized date to the parent's onBlur
      if (onBlur) {
        onBlur(rawInput);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRawInput(e.target.value); // Update raw input
    setError(null); // Clear errors while typing
  };

  return (
    <div>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        value={rawInput} // Bind to local state
        onChange={handleChange}
        onBlur={handleBlur} // Validate and normalize only on blur
        className={`w-full ${error ? "border-red-500" : ""}`} // Add error styling
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <ErrorMessage id={`${id}-error`} message={error} />}
    </div>
  );
};
