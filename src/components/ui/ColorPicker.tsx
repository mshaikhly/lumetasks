"use client";

import * as React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ColorPickerProps } from "@/types/Project";
import { PROJECT_COLORS, ProjectColor } from "@/constants/projectConstants";


export function ColorPicker({
  value,
  onChange,
  options = PROJECT_COLORS,
}: ColorPickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          aria-expanded={open}
          className="w-full justify-between"
        >
          <div
            className={cn(
              "w-6 h-6 rounded-full border",
              "cursor-pointer",
              "inline-flex items-center justify-center"
            )}
            style={{
              backgroundColor: value,
            }}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2">
        <div className="grid grid-cols-4 gap-2">
          {options.map((color) => (
            <div
              key={color}
              className={cn(
                "w-8 h-8 rounded-full cursor-pointer border",
                value === color && "ring-2 ring-black"
              )}
              style={{
                backgroundColor: color,
              }}
              onClick={() => {
                onChange(color as ProjectColor); // Ensure color is cast to ProjectColor
                setOpen(false);
              }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
