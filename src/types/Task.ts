import { Project } from "@/types/Project";

export interface Task {
  id: string;
  name: string;
  status: string;
  priority: string;
  projectId: string; // Add this to associate tasks with projects
  projectColor?: string; // Add this property
  when: {
    startDate: string;
    startTime?: string;
    endDate?: string;
    endTime?: string;
    allDay?: boolean; // New optional property for "All Day"
  };
}

export type TaskStore = {
  tasks: Task[];
  selectedTasks: string[]; // Added selectedTasks to represent selected task IDs
  handleEdit: (id: string, field: keyof Task, value: string | Task["when"]) => void;
  addTask: (projectId: string, projectColor: string) => void; // Update to include projectColor
  updateTaskColors: (projectId: string, newColor: string) => void; // Add this line
  deleteTasks: () => void; // Remove the parameter
  toggleTaskSelection: (id: string) => void;
  toggleSelectAll: () => void;
  resetTasks: () => void; // Reset projects to initial state
  set: (partialState: Partial<TaskStore>) => void; // Add this line
};

export interface AccordionStore {
  openAccordionItems: string[];
  setOpenAccordionItems: (items: string[]) => void;
}

export interface TasksAccordionProps {
  projects: Project[];
}

export interface DateTimePickerCellProps {
  id: string; // Add task ID
  value: Task["when"]; // Ensure this matches the structure in your Task type
  onEdit: (updatedValue: Task["when"]) => void; // Explicitly typed callback
}

export interface DateTimeSwitchesProps {
  includeTime: boolean;
  includeEndDate: boolean;
  allDay: boolean;
  onToggleTime: (checked: boolean) => void;
  onToggleEndDate: (checked: boolean) => void;
  onToggleAllDay: (checked: boolean) => void;
}

export interface DateTimeCalendarProps {
  startDate: string;
  endDate?: string;
  includeEndDate: boolean;
  onUpdateStartDate: (value: string) => void;
  onUpdateEndDate: (value: string) => void;
}

export interface DateTimeInputsProps {
  dates: {
    startDate: string;
    startTime: string;
    endDate?: string;
    endTime?: string;
  };
  handlers: {
    onUpdateStartDate: (value: string) => void;
    onUpdateStartTime: (value: string) => void;
    onUpdateEndDate: (value: string) => void;
    onUpdateEndTime: (value: string) => void;
  };
  includeTime: boolean;
  includeEndDate: boolean;
}

export interface DateInputProps {
  id: string;
  label: string;
  value: string;
  onUpdate: (value: string) => void;
  onBlur?: (value: string) => void;
}

export interface TimeInputProps {
  id: string;
  label: string;
  value: string;
  onUpdate: (value: string) => void;
  onBlur?: (value: string) => void; // Add this line
}
