import React, { useEffect, useRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {
  EventAddArg,
  EventChangeArg,
  EventRemoveArg,
} from "@fullcalendar/core";
import { useTaskTableStore } from "@/store/task-store";
import { format, parse, formatISO } from "date-fns";

export default function WeeklyCalendar() {
  const { tasks, handleEdit } = useTaskTableStore();
  const calendarRef = useRef<FullCalendar>(null);

  // ResizeObserver to update calendar size dynamically
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (calendarRef.current) {
        calendarRef.current.getApi().updateSize();
      }
    });

    const calendarContainer = document.querySelector(".fc"); // FullCalendar container
    if (calendarContainer) resizeObserver.observe(calendarContainer);

    return () => resizeObserver.disconnect();
  }, []);

  // Helper to convert "MMM d, yyyy" and "12:00 AM" to ISO
  const toISO = (dateStr: string, timeStr?: string) => {
    try {
      const parsedDate = timeStr
        ? parse(`${dateStr} ${timeStr}`, "MMM d, yyyy hh:mm a", new Date())
        : parse(dateStr, "MMM d, yyyy", new Date());
      return formatISO(parsedDate);
    } catch {
      console.error("Invalid date or time format:", { dateStr, timeStr });
      return "";
    }
  };

  // Map tasks to FullCalendar events
  const events = tasks.map((task) => {
    const start = task.when.startTime
      ? toISO(task.when.startDate, task.when.startTime)
      : toISO(task.when.startDate);

    const end = task.when.endDate
      ? toISO(task.when.endDate, task.when.endTime)
      : start; // Default end to start if undefined

    return {
      id: task.id,
      title: task.name,
      start, // ISO format start
      end, // ISO format end
      allDay: !!task.when.allDay, // Convert to boolean
      backgroundColor: task.projectColor || "#808080", // Default to grey if no project color
      borderColor: task.projectColor || "#808080", // Match border color
    };
  });

  // Handle adding new events
  const handleEventAdd = (eventInfo: EventAddArg) => {
    const { id, start, end, allDay } = eventInfo.event;

    handleEdit(id, "when", {
      startDate: format(start as Date, "MMM d, yyyy"),
      startTime: allDay ? undefined : format(start as Date, "hh:mm a"),
      endDate: end ? format(end as Date, "MMM d, yyyy") : undefined,
      endTime: allDay || !end ? undefined : format(end as Date, "hh:mm a"),
      allDay,
    });
  };

  // Handle event changes
  const handleEventChange = (changeInfo: EventChangeArg) => {
    const { id, start, end, allDay } = changeInfo.event;

    const updatedWhen = {
      startDate: format(start as Date, "MMM d, yyyy"),
      startTime: allDay ? undefined : format(start as Date, "hh:mm a"),
      endDate: end ? format(end as Date, "MMM d, yyyy") : undefined,
      endTime: allDay || !end ? undefined : format(end as Date, "hh:mm a"),
      allDay,
    };

    handleEdit(id, "when", updatedWhen);
  };

  // Handle event removal
  const handleEventRemove = (removeInfo: EventRemoveArg) => {
    console.log(`Event with ID ${removeInfo.event.id} removed.`);
  };

  return (
    <div
      className="w-full h-full max-w-7xl mx-auto p-4 overflow-y-auto bg-background no-scrollbar"
      style={{ minHeight: "300px" }} // Ensures the calendar doesn't collapse entirely
    >
      <FullCalendar
        ref={calendarRef}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        editable={true}
        events={events}
        eventAdd={handleEventAdd}
        eventChange={handleEventChange}
        eventRemove={handleEventRemove}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        nowIndicator={true}
      />
    </div>
  );
}
