"use client";

import { useProjectStore } from "@/store/project-store";
import { TasksAccordion } from "@/components/tasks/TasksAccordion";

export function Tasks() {
  const { projects } = useProjectStore();

  return (
    <div>
      <h2 className="font-bold text-lg mb-2">Tasks</h2>
      <TasksAccordion projects={projects} />
    </div>
  );
}
