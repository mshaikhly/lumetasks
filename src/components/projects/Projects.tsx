"use client";

import { useProjectStore } from "@/store/project-store";
import { useTaskTableStore } from "@/store/task-store";
import { ProjectTable } from "@/components/projects/ProjectTable";
import { ProjectColumns } from "@/components/projects/ProjectColumns";
import { AddProjectDialog } from "@/components/projects/AddProjectDialog";
import { DeleteDialog } from "@/components/projects/DeleteDialog";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useMemo } from "react";

export default function Projects() {
  const {
    projects,
    selectedProjects,
    isAddOpen,
    isDeleteOpen,
    setAddOpen,
    setDeleteOpen,
    addProject,
    editProject,
    deleteSelectedProjects,
    updateProjectStatus,
  } = useProjectStore();

  const { tasks } = useTaskTableStore();

  // Memoized task count calculation ensures consistency across renders
  const projectsWithTaskCount = useMemo(
    () =>
      projects.map((project) => ({
        ...project,
        tasks: tasks.filter((task) => task.projectId === project.id).length,
      })),
    [projects, tasks]
  );

  return (
    <div>
      <h2 className="font-bold text-lg mb-4">Projects and Plans</h2>
      <div className="flex justify-between mb-4">
        {/* Add Project Button */}
        <Button variant="ghost" onClick={() => setAddOpen(true)}>
          <Plus className="mr-2 text-green-500" /> Add Project
        </Button>
        {/* Delete Selected Button */}
        <Button
          variant="ghost"
          onClick={() => setDeleteOpen(true)}
          disabled={selectedProjects.length === 0}
        >
          <Trash2 />
        </Button>
      </div>
      {/* Project Table */}
      <ProjectTable
        columns={ProjectColumns(editProject, updateProjectStatus)}
        data={projectsWithTaskCount}
      />
      {/* Add Project Dialog */}
      <AddProjectDialog
        isOpen={isAddOpen}
        onClose={() => setAddOpen(false)}
        onSubmit={addProject}
      />
      {/* Delete Dialog */}
      <DeleteDialog
        isOpen={isDeleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={deleteSelectedProjects}
        itemCount={selectedProjects.length}
      />
    </div>
  );
}
