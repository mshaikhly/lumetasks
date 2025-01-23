import { ColumnDef } from "@tanstack/react-table";
import { ProjectColor, ProjectStatus  } from "@/constants/projectConstants";


export interface Project {
  id: string;
  name: string;
  description: string;
  status: ProjectStatus;
  tasks: number;
  progress: number;
  color: ProjectColor; // Add this for the project color
}

export type ProjectFormValues = Omit<Project, "id" | "tasks" | "progress">;

export interface ColorPickerProps {
  value: ProjectColor; // Selected color value (hex code)
  onChange: (value: ProjectColor) => void; // Ensure it matches ProjectColor
  options?: readonly ProjectColor[]; // Updated to readonly
}

export interface AddProjectDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: ProjectFormValues) => void;
}

export interface ProjectStore {
  projects: Project[]; // List of all projects
  selectedProjects: string[]; // List of selected project IDs
  isAddOpen: boolean; // State for add project dialog
  isDeleteOpen: boolean; // State for delete confirmation dialog
  setAddOpen: (isOpen: boolean) => void; // Action to toggle add project dialog
  setDeleteOpen: (isOpen: boolean) => void; // Action to toggle delete dialog
  addProject: (project: Omit<Project, "id" | "tasks" | "progress">) => void; // Add a new project
  editProject: (id: string, field: keyof Project, value: string) => void; // Edit a project's field
  updateProjectStatus: (id: string, newStatus: ProjectStatus) => void; // Update a project's status
  deleteSelectedProjects: () => void; // Delete selected projects
  toggleProjectSelection: (id: string) => void; // Toggle selection of a single project
  toggleSelectAllProjects: () => void; // Toggle selection of all projects
  resetProjects: () => void; // Reset projects to initial state
}

export interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  onRowSelectionChange?: (selected: TData[]) => void; // Callback for row selection
}

export interface DeleteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  itemCount: number;
}

export interface RowType {
  original: Project;
  getValue: (key: keyof Project) => string | number;
}