"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatusComboboxProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const itemColors: Record<string, string> = {
  // Status Colors
  not_started: "bg-gray-200 text-gray-700",
  in_progress: "bg-blue-200 text-blue-700",
  postponed: "bg-yellow-200 text-yellow-700",
  cancelled: "bg-red-200 text-red-700",
  completed: "bg-green-200 text-green-700",
  
  // Priority Colors
  low: "bg-green-100 text-green-700",
  medium: "bg-yellow-100 text-yellow-700",
  high: "bg-red-100 text-red-700",
  
};

export function StatusCombobox({
  value,
  onChange,
  options,
  placeholder = "Select status...",
}: StatusComboboxProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value ? (
            <span
              className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-sm font-medium",
                itemColors[value] || "bg-gray-100 text-gray-800"
              )}
            >
              {options.find((option) => option.value === value)?.label}
            </span>
          ) : (
            placeholder
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <div>
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
              className={cn(
                "flex items-center px-2 py-1 rounded cursor-pointer hover:bg-gray-100",
                value === option.value ? "font-bold" : ""
              )}
            >
              <span
                className={cn(
                  "inline-flex items-center px-2 py-1 rounded-full text-sm font-medium mr-2",
                  itemColors[option.value] || "bg-gray-100 text-gray-800"
                )}
              >
                {option.label}
              </span>
              {value === option.value && <Check className="ml-auto h-4 w-4" />}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
