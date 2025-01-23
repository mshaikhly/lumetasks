"use client";

import { useTaskTableStore } from "@/store/task-store";
import { TaskColumns } from "./TasksColumns";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2 } from "lucide-react";
import { Task } from "@/types/Task";

export function TaskTable({
  data,
  projectId,
  projectColor,
}: {
  data: Task[];
  projectId: string;
  projectColor: string;
}) {
  const {
    selectedTasks,
    handleEdit,
    addTask,
    deleteTasks,
    toggleTaskSelection,
    toggleSelectAll,
  } = useTaskTableStore();

  const table = useReactTable({
    data,
    columns: [
      {
        id: "select",
        size: 50,
        header: () => (
          <Checkbox
            checked={data.length > 0 && selectedTasks.length === data.length}
            onCheckedChange={toggleSelectAll}
            aria-label="Select All Tasks"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={selectedTasks.includes(row.original.id)}
            onCheckedChange={() => toggleTaskSelection(row.original.id)}
            aria-label="Select Task"
          />
        ),
      },
      ...TaskColumns(handleEdit),
    ] as ColumnDef<Task>[], // Explicitly cast columns to ColumnDef<Task>[]
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    enableColumnResizing: true,
  });

  return (
    <div className="rounded-md border overflow-auto">
      <div className="flex justify-between items-center p-4">
        <Button variant="ghost" onClick={() => addTask(projectId, projectColor)}>
          <Plus className="mr-2 text-green-500" /> Add Task
        </Button>
        <Button
          variant="ghost"
          onClick={() => deleteTasks()}
          disabled={selectedTasks.length === 0}
        >
          <Trash2 />
        </Button>
      </div>
      <Table>
        <TableHeader className="border rounded-lg">
          <TableRow>
            {table.getHeaderGroups().map((headerGroup) =>
              headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  style={{
                    width: header.getSize(),
                  }}
                  className="relative"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  <div
                    onMouseDown={header.getResizeHandler()}
                    onTouchStart={header.getResizeHandler()}
                    className={`absolute right-0 top-0 h-full w-[3px] bg-gray-700 opacity-20 cursor-col-resize ${
                      header.column.getIsResizing() ? "bg-green-500" : ""
                    }`}
                  />
                </TableHead>
              ))
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={selectedTasks.includes(row.original.id) && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    style={{
                      width: cell.column.getSize(),
                    }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={TaskColumns(handleEdit).length + 1} className="text-center">
                No tasks available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
