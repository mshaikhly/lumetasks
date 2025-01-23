"use client";

import WeeklyCalendar from "@/components/calendar/WeeklyCalendar";
import Projects from "@/components/projects/Projects";
import { Tasks } from "@/components/tasks/Tasks";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import MobileVisibilityButtons from "@/components/MobileVisibilityButtons"; // Import the new component
import { useState } from "react";

export default function Home() {
  const [isProjectsVisible, setProjectsVisible] = useState(true);
  const [isTasksVisible, setTasksVisible] = useState(true);
  const [isCalendarVisible, setCalendarVisible] = useState(true);

  return (
    <div className="h-screen flex flex-col pt-auto m-1">
      {/* Mobile: Buttons for Visibility */}
      <MobileVisibilityButtons
        isProjectsVisible={isProjectsVisible}
        setProjectsVisible={setProjectsVisible}
        isTasksVisible={isTasksVisible}
        setTasksVisible={setTasksVisible}
        isCalendarVisible={isCalendarVisible}
        setCalendarVisible={setCalendarVisible}
      />

      {/* Desktop: Resizable Layout */}
      <ResizablePanelGroup
        direction="horizontal"
        className="hidden md:flex flex-1 h-full rounded-lg border shadow-md overflow-hidden"
      >
        {/* Left Panel: Projects + Tasks */}
        <ResizablePanel
          defaultSize={50}
          className={`flex flex-col gap-4 h-full ${isProjectsVisible ? "" : "hidden"}`}
        >
          <ResizablePanelGroup direction="vertical" className="h-full">
            <ResizablePanel className="flex-1">
              <div className="p-4 h-full overflow-y-auto no-scrollbar">
                <Projects />
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle className="hover:bg-zinc-600 cursor-col-resize" />
            <ResizablePanel className={`flex-1 ${isTasksVisible ? "" : "hidden"}`}>
              <div className="p-4 h-full overflow-y-auto no-scrollbar">
                <Tasks />
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>

        {/* Vertical Resizable Handle */}
        <ResizableHandle withHandle className="w-[2px] hover:bg-zinc-600 cursor-col-resize" />

        {/* Right Panel: Weekly Calendar */}
        <ResizablePanel
          defaultSize={50}
          className={`flex flex-col gap-4 h-full ${isCalendarVisible ? "" : "hidden"}`}
        >
          <div className="p-4 flex-1 overflow-y-auto no-scrollbar">
            <WeeklyCalendar />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col gap-4 p-4">
        {isProjectsVisible && (
          <div className="border p-4 rounded-lg shadow">
            <Projects />
          </div>
        )}
        {isTasksVisible && (
          <div className="border p-4 rounded-lg shadow">
            <Tasks />
          </div>
        )}
        {isCalendarVisible && (
          <div className="border p-4 rounded-lg shadow">
            <WeeklyCalendar />
          </div>
        )}
      </div>
    </div>
  );
}
