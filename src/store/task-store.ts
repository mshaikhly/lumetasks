import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from "date-fns";
import { TaskStore, AccordionStore } from '@/types/Task';

export const useTaskTableStore = create<TaskStore>()(
    persist(
      (set) => ({
        tasks: [
          {
            id: "1",
            name: "Initial Task for Project 1",
            status: "not_started",
            priority: "low",
            projectId: "1",
            projectColor: "#FF5733",
            when: {
              startDate: format(new Date(), "MMM d, yyyy"),
              startTime: "12:00 PM",
              endDate: format(new Date(), "MMM d, yyyy"),
              endTime: "01:00 PM",
            },
          },
        ],
        selectedTasks: [],
        handleEdit: (id, field, value) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.id === id ? { ...task, [field]: value } : task
            ),
          })),
        addTask: (projectId: string, projectColor: string) =>
          set((state) => ({
            tasks: [
              ...state.tasks,
              {
                id: Date.now().toString(),
                name: "New Task",
                status: "not_started",
                priority: "low",
                projectId,
                projectColor,
                when: {
                  startDate: format(new Date(), "MMM d, yyyy"),
                  startTime: "12:00 AM",
                  endDate: format(new Date(), "MMM d, yyyy"),
                  endTime: "12:00 AM",
                },
              },
            ],
          })),
        updateTaskColors: (projectId: string, newColor: string) =>
          set((state) => ({
            tasks: state.tasks.map((task) =>
              task.projectId === projectId ? { ...task, projectColor: newColor } : task
            ),
          })),
        deleteTasks: () =>
          set((state) => ({
            tasks: state.tasks.filter((task) => !state.selectedTasks.includes(task.id)),
            selectedTasks: [],
          })),
        toggleTaskSelection: (id) =>
          set((state) => ({
            selectedTasks: state.selectedTasks.includes(id)
              ? state.selectedTasks.filter((taskId) => taskId !== id)
              : [...state.selectedTasks, id],
          })),
        toggleSelectAll: () =>
          set((state) => ({
            selectedTasks:
              state.selectedTasks.length === state.tasks.length
                ? []
                : state.tasks.map((task) => task.id),
          })),
        resetTasks: () =>
          set(() => ({
            tasks: [
              {
                id: "1",
                name: "Initial Task for Project 1",
                status: "not_started",
                priority: "low",
                projectId: "1",
                projectColor: "#FF8A66",
                when: {
                  startDate: format(new Date(), "MMM d, yyyy"),
                  startTime: "12:00 PM",
                  endDate: format(new Date(), "MMM d, yyyy"),
                  endTime: "01:00 PM",
                },
              },
            ],
          })),
      }),
      {
        name: "task-store", // Local storage key
        partialize: (state) => ({ tasks: state.tasks }), // Persist only the tasks
      }
    )
  );

export const useAccordionStore = create<AccordionStore>()(
    persist(
        (set) => ({
            openAccordionItems: [],
            setOpenAccordionItems: (items) => set({ openAccordionItems: items }),
        }),
        {
            name: 'accordion-state',
            storage: {
                getItem: (key: string) => {
                    const value = localStorage.getItem(key);
                    if (!value) return null;
                    return JSON.parse(value) as { state: AccordionStore; version?: number };
                },
                setItem: (key: string, value: { state: AccordionStore; version?: number }) => {
                    localStorage.setItem(key, JSON.stringify(value));
                },
                removeItem: (key: string) => {
                    localStorage.removeItem(key);
                },
            },
        }
    )
);

