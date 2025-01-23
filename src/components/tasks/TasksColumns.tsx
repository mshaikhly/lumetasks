"use client";

import React from "react";
import { Task } from "@/types/Task";
import { DateTimePickerCell } from "./DateTimePickerCell";
import { ColumnDef } from "@tanstack/react-table";
import { StatusCombobox } from "@/components/ui/StatusCombobox";
import { Input } from "@/components/ui/input";
import { format } from "date-fns"

// Status and Priority Options
const statusOptions = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

const priorityOptions = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
];

// Editable Cell Component
const EditableCell: React.FC<{
  value: string;
  onEdit: (value: string) => void;
}> = ({ value, onEdit }) => {
  const [isEditing, setIsEditing] = React.useState(false);
  const [cellValue, setCellValue] = React.useState(value);

  const handleSave = () => {
    setIsEditing(false);
    if (cellValue !== value) {
      onEdit(cellValue);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSave();
  };

  return isEditing ? (
    <Input
      value={cellValue}
      onChange={(e) => setCellValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  ) : (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer px-2 py-1 rounded hover:border focus:outline-none"
    >
      {value || "Click to add"}
    </div>
  );
};

// Task Columns Definition
export const TaskColumns = (
  handleEdit: (id: string, field: keyof Task, value: string | Task["when"]) => void
): ColumnDef<Task>[] => [
    {
      accessorKey: "name",
      header: "Task Name",
      cell: ({ row }) => (
        <EditableCell
          value={row.getValue("name") as string}
          onEdit={(value) => handleEdit(row.original.id, "name", value)}
        />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <StatusCombobox
          value={row.getValue("status") as string}
          onChange={(value) => handleEdit(row.original.id, "status", value)}
          options={statusOptions}
        />
      ),
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <StatusCombobox
          value={row.getValue("priority") as string}
          onChange={(value) => handleEdit(row.original.id, "priority", value)}
          options={priorityOptions}
        />
      ),
    },
    {
      accessorKey: "when",
      header: "When",
      cell: ({ row }) => {
        const value = row.getValue("when") as Task["when"];

        // Ensure the date and time values are formatted correctly
        const formattedValue: Task["when"] = {
          startDate: value.startDate || format(new Date(), "MMM d, yyyy"),
          startTime: value.startTime || "12:00 AM",
          endDate: value.endDate || value.startDate || format(new Date(), "MMM d, yyyy"), // Fallback to startDate if endDate is missing
          endTime: value.endTime || value.startTime || "12:00 AM", // Fallback to startTime if endTime is missing
          allDay: value.allDay ?? false, // Ensure allDay is included with a default value of false
        };

        return (
          <DateTimePickerCell
            id={row.original.id}
            value={formattedValue}
            onEdit={(updatedValue: Task["when"]) =>
              handleEdit(row.original.id, "when", updatedValue)
            }
          />
        );
      },
    },
  ];
