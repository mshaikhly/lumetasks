"use client";

import React, { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Project, RowType } from "@/types/Project";
import { StatusCombobox } from "../ui/StatusCombobox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ColorPicker } from "@/components/ui/ColorPicker";
import { Progress } from "@/components/ui/progress";
import { PROJECT_COLORS, PROJECT_STATUS_OPTIONS } from "@/constants/projectConstants";
import { useTaskTableStore } from "@/store/task-store";

const EditableNameCell = ({
  row,
  onEdit,
}: {
  row: RowType;
  onEdit: (id: string, value: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(row.getValue("name") as string);
  const [error, setError] = useState<string | null>(null);

  const handleSave = () => {
    if (value.trim().length < 1) {
      setError("Name must be at least 1 character.");
      return;
    }
    setError(null);
    setIsEditing(false);
    if (value !== row.getValue("name")) {
      onEdit(row.original.id, value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    }
  };

  return isEditing ? (
    <div>
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        autoFocus
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  ) : (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer px-2 py-1 rounded hover:border focus:outline-none"
    >
      {value}
    </div>
  );
};

const EditableDescriptionCell = ({
  row,
  onEdit,
}: {
  row: RowType;
  onEdit: (id: string, value: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(row.getValue("description") as string);

  const handleSave = () => {
    setIsEditing(false);
    if (value !== row.getValue("description")) {
      onEdit(row.original.id, value.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSave();
    }
  };

  return isEditing ? (
    <Textarea
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleSave}
      onKeyDown={handleKeyDown}
      autoFocus
    />
  ) : (
    <div
      onClick={() => setIsEditing(true)}
      className="cursor-pointer px-2 py-1 rounded hover:border focus:outline-none"
    >
      {value || "Click to add description"}
    </div>
  );
};

export const ProjectColumns = (
  handleEdit: (id: string, field: keyof Project, value: string | Project["color"]) => void,
  handleStatusChange: (id: string, status: Project["status"]) => void
): ColumnDef<Project>[] => [
    {
      accessorKey: "name",
      header: "Project Name",
      cell: ({ row }: { row: RowType }) => (
        <EditableNameCell
          row={row}
          onEdit={(id, value) => handleEdit(id, "name", value)}
        />
      ),
    },
    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }: { row: RowType }) => (
        <EditableDescriptionCell
          row={row}
          onEdit={(id, value) => handleEdit(id, "description", value)}
        />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }: { row: RowType }) => (
        <StatusCombobox
          value={row.getValue("status") as Project["status"]}
          onChange={(newStatus) =>
            handleStatusChange(row.original.id, newStatus as Project["status"])
          }
          options={PROJECT_STATUS_OPTIONS}
        />
      ),
    },
    {
      accessorKey: "tasks",
      header: "Tasks",
      cell: ({ row }: { row: RowType }) => {
        const tasks = row.getValue("tasks") as number;
        return <div className="text-center">{tasks || 0}</div>;
      },
    },
    {
      accessorKey: "progress",
      header: "Progress",
      cell: ({ row }: { row: RowType }) => {
        const { tasks } = useTaskTableStore.getState();
        const projectId = row.original.id;

        // Calculate progress based on task completion
        const projectTasks = tasks.filter((task) => task.projectId === projectId);
        const completedTasks = projectTasks.filter((task) => task.status === "completed").length;
        const totalTasks = projectTasks.length;
        const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

        return (
          <div className="flex items-center">
            <span className="mr-2">{progress}%</span>
            <Progress value={progress} />
          </div>
        );
      },
    },
    {
      accessorKey: "color",
      header: "Color",
      cell: ({ row }: { row: RowType }) => (
        <ColorPicker
          value={row.getValue("color") as Project["color"]}
          onChange={(newColor) => handleEdit(row.original.id, "color", newColor)}
          options={PROJECT_COLORS}
        />
      ),
    },
  ];
