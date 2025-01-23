"use client";

import * as React from "react";
import { projectFormSchema } from "@/schemas/projectSchema";
import { AddProjectDialogProps, ProjectFormValues, Project } from "@/types/Project";
import { PROJECT_COLORS, PROJECT_STATUS_OPTIONS } from "@/constants/projectConstants";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { StatusCombobox } from "@/components/ui/StatusCombobox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ColorPicker } from "@/components/ui/ColorPicker";

export function AddProjectDialog({ isOpen, onClose, onSubmit }: AddProjectDialogProps) {
  const form = useForm<ProjectFormValues>({
    resolver: zodResolver(projectFormSchema),
    defaultValues: {
      name: "",
      description: "",
      status: "not_started",
      color: "#A8A8A8", // Default color
    },
  });

  const handleFormSubmit = (data: ProjectFormValues) => {
    console.log("Form Data Submitted:", data);
    onSubmit(data);
    form.reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Add New Project</DialogTitle>
          <DialogDescription>
            Please fill in the details to create a new project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)}>
            {/* Project Name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Project Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter project name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>
                    Project Description <em>(Optional)</em>
                  </FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter project description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Status */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <StatusCombobox
                      value={field.value}
                      onChange={(value) => field.onChange(value as Project["status"])}
                      options={PROJECT_STATUS_OPTIONS}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Project Color */}
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Project Color</FormLabel>
                  <FormControl>
                    <ColorPicker
                      value={field.value}
                      onChange={(value) => field.onChange(value)}
                      options={PROJECT_COLORS}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Dialog Footer */}
            <DialogFooter className="mt-2">
              <Button type="button" variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">Add Project</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
