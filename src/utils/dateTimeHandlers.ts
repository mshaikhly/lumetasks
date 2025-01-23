import { format, isBefore, parse, isValid  } from "date-fns";

const supportedFormats = [
  "MMM d, yyyy",   // Jan 1, 2023
  "dd/MM/yyyy",    // 01/01/2023 (UK/Intl)
  "MM/dd/yyyy",    // 01/01/2023 (US)
  "yyyy-MM-dd",    // 2023-01-01 (ISO)
  "d MMM yyyy",    // 1 Jan 2023
  "d-MMM-yyyy",    // 1-Jan-2023
];

// Utility to safely parse a date
export const safeParseDate = (dateStr?: string): Date | null => {
  if (!dateStr) return null; // Handle undefined or empty input
  for (const formatString of supportedFormats) {
    const parsedDate = parse(dateStr, formatString, new Date());
    if (isValid(parsedDate)) {
      return parsedDate;
    }
  }
  console.warn(`Invalid date string: "${dateStr}". Supported formats: ${supportedFormats.join(", ")}`);
  return null;
};

export const safeParseTime = (timeStr: string): Date | null => {
  try {
    return parse(timeStr, "hh:mm a", new Date(0, 0, 0)); // Normalize to base date
  } catch {
    return null; // Return null for invalid times
  }
};

// Adjusts a related date to maintain chronological order.
export const adjustRelatedDate = (
  parsedDate: Date,
  relatedDate: string | undefined,
  isStartDate: boolean,
  onUpdate: (formattedDate: string) => void,
  onRelatedDateUpdate?: (formattedDate: string) => void
) => {
  if (!relatedDate || !onRelatedDateUpdate) return;

  const relatedParsed = safeParseDate(relatedDate);
  if (relatedParsed) {
    const formattedDate = format(parsedDate, "MMM d, yyyy");

    if (isStartDate && isBefore(relatedParsed, parsedDate)) {
      // If the start date is after the related end date, update the end date
      onRelatedDateUpdate(formattedDate);
    } else if (!isStartDate && isBefore(parsedDate, relatedParsed)) {
      // If the end date is before the related start date, update the start date
      onUpdate(format(relatedParsed, "MMM d, yyyy"));
    }
  }
};

// Normalize time to 12-hour format
export const normalizeTime = (time: string): string => {
  // Match 24-hour format
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
    return "Invalid"; // Invalid time format
  }

  // Match strict 12-hour format with required AM/PM
  const match12 = time.match(/^(\d{1,2}):(\d{2})\s(AM|PM)$/i);
  if (match12) {
    const [hours, minutes, period] = match12.slice(1, 4);
    if (Number(hours) > 0 && Number(hours) <= 12 && Number(minutes) < 60) {
      return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")} ${period.toUpperCase()}`;
    }
  }

  return "Invalid"; // Return invalid for non-matches
};

// Generalized handler for time validation and normalization
export const handleTimeChange = (
  value: string,
  setTimeError: (message: string | null) => void,
  onUpdateTime: (time: string) => void
) => {
  console.log("Input Value:", value);
  const normalizedTime = normalizeTime(value);
  console.log("Normalized Time:", normalizedTime);

  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s?(AM|PM)$/i;

  if (timeRegex.test(normalizedTime)) {
    console.log("Time is valid");
    setTimeError(null); // Clear errors
    onUpdateTime(normalizedTime); // Propagate normalized time
  } else {
    // More specific error handling
    if (normalizedTime === "Invalid") {
      console.log("Invalid Time Format");
      setTimeError("Invalid format. Use hh:mm AM/PM.");
    } else {
      console.log("Unknown Error");
      setTimeError("Please enter a valid time.");
    }
  }
};
