// src/constants/projectColors.ts
export const PROJECT_COLORS = [
  "#FF8A66", // Soft Red
  "#FFD966", // Soft Yellow
  "#66FF99", // Soft Green
  "#DFFFD6", // Soft Light Green
  "#99FFFF", // Soft Cyan
  "#99BFFF", // Soft Blue
  "#C699FF", // Soft Purple
  "#FF99CC", // Soft Pink
  "#A8A8A8", // Light Grey
] as const;

export type ProjectColor = (typeof PROJECT_COLORS)[number]; // Restrict type to the defined colors

export const PROJECT_STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "postponed", label: "Postponed" },
  { value: "cancelled", label: "Cancelled" },
  { value: "completed", label: "Completed" },
];

export type ProjectStatus = (typeof PROJECT_STATUS_OPTIONS)[number]["value"]; // Restrict type to defined statuses
