"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


export default function AboutDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">About</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto no-scrollbar">
        <DialogHeader>
          <DialogTitle>About LumeTasks</DialogTitle>
          <DialogDescription>
            Learn how this app works and the technologies behind it.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {/* Avatar Section */}
          <div className="flex items-center space-x-4">
            <Avatar className="h-24 w-24 transform scale-x-[-1]">
              <AvatarImage src="/avatar.png" alt="Your Avatar" />
              <AvatarFallback>MS</AvatarFallback>
            </Avatar>
            <div>
              <p className="text-lg font-semibold">Mohammed Al-Shaikhly</p>
              <p className="text-sm text-gray-600">Aspiring Web Developer & Software Engineer</p>
            </div>
          </div>
          <p>
            <strong>LumeTasks</strong> is a task tracker and planner designed to
            help you stay organized and productive. It is a showcase of my web
            design and software engineering skills.
          </p>
          <p>Simply add a Project, add it&apos;s respective Tasks, and see the task in the Calendar</p>
          <p>
            This app demonstrates concepts such as:
          </p>
          <ul className="list-disc list-inside">
            <li>Sending props up and down parent and child components.</li>
            <li>Managing state efficiently between components.</li>
            <li>
              Creating a centralized store using <strong>Zustand</strong> to
              save state and make it accessible across components that need it.
            </li>
          </ul>
          <p>
            <strong>LumeTasks</strong> is a Single Page Application (SPA) with
            three main components:
          </p>
          <ul className="list-disc list-inside">
            <li>
              <strong>Projects:</strong> Enables users to create projects, which
              serve as containers for tasks.
            </li>
            <li>
              <strong>Tasks:</strong> Allows users to set tasks with priorities
              and dates. The date functionality was particularly complex, as it
              involved handling input formatting, validation, and regex.
            </li>
            <li>
              <strong>Calendar:</strong> Displays tasks visually in a weekly
              planner, with each task represented in its respective project
              color.
            </li>
          </ul>
          <p>
            The design was created using <strong>Shadcn</strong> components,
            which I creatively applied to suit the app&apos;s requirements.
          </p>
          <p>
            This app works entirely on <strong>localStorage</strong>, ensuring
            your tasks and data stay on your device without requiring a server.
          </p>
          <p>
            Click the Trash icon to reset all data and start fresh.
          </p>
          <p>
            Below are the technologies used to build this project:
          </p>
          <ul className="list-disc list-inside">
            <li>Next.js 15</li>
            <li>React 19</li>
            <li>TypeScript</li>
            <li>Tailwind CSS</li>
            <li>FullCalendar library</li>
            <li>React Query</li>
            <li>React Hook Form</li>
            <li>Zustand</li>
          </ul>
          <p>
            Check out my portfolio website for more projects:{" "}
            <a
              href="https://malshaikhly.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              https://malshaikhly.com/
            </a>
          </p>
          <p>
            View the code for this project on GitHub:{" "}
            <a
              href="https://github.com/mshaikhly"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              https://github.com/mshaikhly
            </a>
          </p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
