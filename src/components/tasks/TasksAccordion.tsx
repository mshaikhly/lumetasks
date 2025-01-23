"use client";

import { useAccordionStore } from "@/store/task-store";
import { TaskTable } from "./TasksTable";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Project } from "@/types/Project";
import { useTaskTableStore } from "@/store/task-store";

export function TasksAccordion({ projects }: { projects: Project[] }) {
  const { openAccordionItems, setOpenAccordionItems } = useAccordionStore();
  const { tasks } = useTaskTableStore();

  // Map projects to include filtered tasks
  const projectsWithTasks = projects.map((project) => ({
    ...project,
    tasks: tasks.filter((task) => task.projectId === project.id),
  }));

  // Debug logs
  console.log("Accordion State:", openAccordionItems);
  console.log("Projects with Tasks:", projectsWithTasks);

  return (
    <Accordion
      type="multiple"
      className="w-full"
      value={openAccordionItems}
      onValueChange={setOpenAccordionItems}
    >
      {projectsWithTasks.map((project) => (
        <AccordionItem key={project.id} value={project.id}>
          <AccordionTrigger className="font-bold">{project.name}</AccordionTrigger>
          <AccordionContent>
            <TaskTable data={project.tasks} projectId={project.id} projectColor={project.color} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
