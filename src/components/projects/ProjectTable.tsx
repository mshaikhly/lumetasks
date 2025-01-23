"use client";

import { useProjectStore } from "@/store/project-store";
import { DataTableProps } from "@/types/Project";
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
import { Checkbox } from "../ui/checkbox";

export function ProjectTable<TData extends { id: string }>({
  columns,
  data,
}: DataTableProps<TData>) {
  const {
    selectedProjects,
    toggleProjectSelection,
    toggleSelectAllProjects,
  } = useProjectStore();

  const table = useReactTable({
    data,
    columns: [
      {
        id: "select",
        size: 50,
        header: () => (
          <Checkbox
            checked={data.length > 0 && selectedProjects.length === data.length}
            onCheckedChange={toggleSelectAllProjects}
            aria-label="Select All Projects"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={selectedProjects.includes(row.original.id)}
            onCheckedChange={() => toggleProjectSelection(row.original.id)}
            aria-label={`Select Project ${row.original.id}`}
          />
        ),
      },
      ...columns,
    ] as ColumnDef<TData>[],
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange",
    enableColumnResizing: true,
  });

  return (
    <div className="rounded-md border overflow-auto">
      <Table>
        <TableHeader>
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
                data-state={
                  selectedProjects.includes(row.original.id) ? "selected" : ""
                }
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
              <TableCell colSpan={columns.length + 1} className="text-center">
                No data available.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
