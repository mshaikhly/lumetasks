"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Trash } from "lucide-react";
import { useProjectStore } from "@/store/project-store";
import { useTaskTableStore } from "@/store/task-store";

export default function ResetButton() {
  const resetProjects = useProjectStore((state) => state.resetProjects);
  const resetTasks = useTaskTableStore((state) => state.resetTasks);

  const handleReset = () => {
    resetProjects();
    resetTasks();
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <Dialog>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="destructive" size="icon" aria-label="Reset">
                <Trash className="w-4 h-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset all data</p>
          </TooltipContent>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Are you sure?</DialogTitle>
            </DialogHeader>
            <p>
              This action will reset all projects and tasks to their initial
              state. This cannot be undone.
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button variant="destructive" onClick={handleReset}>
                  Confirm Reset
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Tooltip>
    </TooltipProvider>
  );
}
