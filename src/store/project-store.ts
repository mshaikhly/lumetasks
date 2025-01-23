import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ProjectStore } from "@/types/Project";
import { useTaskTableStore } from "@/store/task-store";

export const useProjectStore = create<ProjectStore>()(
  persist(
    (set, get) => ({
      projects: [
        {
          id: "1",
          name: "Sample Project",
          description: "This is a sample project.",
          status: "not_started",
          tasks: 0,
          progress: 0,
          color: "#FF8A66",
        },
      ],
      getProjectsWithTaskCount: () => {
        const { tasks } = useTaskTableStore.getState();
        const { projects } = get();
        return projects.map((project) => ({
          ...project,
          tasks: tasks.filter((task) => task.projectId === project.id).length,
        }));
      },
      selectedProjects: [],
      isAddOpen: false,
      isDeleteOpen: false,
      setAddOpen: (isOpen) => set({ isAddOpen: isOpen }),
      setDeleteOpen: (isOpen) => set({ isDeleteOpen: isOpen }),
      addProject: (project) =>
        set((state) => ({
          projects: [
            ...state.projects,
            {
              id: Date.now().toString(),
              name: project.name,
              description: project.description || "",
              status: project.status,
              tasks: 0,
              progress: 0,
              color: project.color || "#FF5733",
            },
          ],
        })),
      editProject: (id, field, value) =>
        set((state) => {
          const updatedProjects = state.projects.map((project) => {
            if (project.id === id) {
              if (field === "color") {
                useTaskTableStore.getState().updateTaskColors(id, value as string);
              }
              return { ...project, [field]: value };
            }
            return project;
          });

          return { projects: updatedProjects };
        }),
      updateProjectStatus: (id, newStatus) =>
        set((state) => ({
          projects: state.projects.map((project) =>
            project.id === id ? { ...project, status: newStatus } : project
          ),
        })),
      deleteSelectedProjects: () =>
        set((state) => ({
          projects: state.projects.filter(
            (project) => !state.selectedProjects.includes(project.id)
          ),
          selectedProjects: [],
          isDeleteOpen: false,
        })),
      toggleProjectSelection: (id) =>
        set((state) => ({
          selectedProjects: state.selectedProjects.includes(id)
            ? state.selectedProjects.filter((projectId) => projectId !== id)
            : [...state.selectedProjects, id],
        })),
      toggleSelectAllProjects: () =>
        set((state) => ({
          selectedProjects:
            state.selectedProjects.length === state.projects.length
              ? []
              : state.projects.map((project) => project.id),
        })),
      resetProjects: () =>
        set(() => ({
          projects: [
            {
              id: "1",
              name: "Sample Project",
              description: "This is a sample project.",
              status: "not_started",
              tasks: 0,
              progress: 0,
              color: "#FF8A66",
            },
          ],
        })),
    }),
    {
      name: "project-store", // Local storage key
      partialize: (state) => ({ projects: state.projects }), // Persist only the projects
    }
  )
);
