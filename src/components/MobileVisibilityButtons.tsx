"use client";

import { Button } from "@/components/ui/button";
import { MobileVisibilityButtonsProps } from "@/types/Global";

export default function MobileVisibilityButtons({
  isProjectsVisible,
  setProjectsVisible,
  isTasksVisible,
  setTasksVisible,
  isCalendarVisible,
  setCalendarVisible,
}: MobileVisibilityButtonsProps) {
  return (
    <div className="md:hidden flex flex-col items-center gap-2 p-2 border-b bg-background shadow-md">
      <div className="flex justify-around w-full">
        <Button
          variant="outline"
          onClick={() => setProjectsVisible((prev) => !prev)}
          className="text-sm"
        >
          {isProjectsVisible ? "Hide Projects" : "Show Projects"}
        </Button>
        <Button
          variant="outline"
          onClick={() => setTasksVisible((prev) => !prev)}
          className="text-sm"
        >
          {isTasksVisible ? "Hide Tasks" : "Show Tasks"}
        </Button>
        <Button
          variant="outline"
          onClick={() => setCalendarVisible((prev) => !prev)}
          className="text-sm"
        >
          {isCalendarVisible ? "Hide Calendar" : "Show Calendar"}
        </Button>
      </div>
      <p className="text-sm text-gray-500">
        <i>(Rotate for better view)</i>
      </p>
    </div>
  );
}
