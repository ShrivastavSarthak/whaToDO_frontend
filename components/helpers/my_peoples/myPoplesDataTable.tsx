"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { myTableInterface } from "@/shared/utils/interfaces/my_table_interface";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

export const MyPeoplesDataColumns: ColumnDef<myTableInterface>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "isConnected",
    header: "Invitation status",
  },
  {
    accessorKey: "Withdrawal Invitation",
    cell: ({ row }) => {
      const id = row.getValue("_id");
      return (
        <Button size={"sm"} onClick={() => console.log(id)}>
          Withdraw
        </Button>
      );
    },
  },
  {
    accessorKey: "Resend Invitation",
    cell: ({ row }) => {
      const id = row.getValue("_id");
      return (
        <Button size={"sm"} onClick={() => console.log(id)}>
          Resend Invitation{" "}
        </Button>
      );
    },
  },
  {
    accessorKey: "InvitationSendDate",
    header: "Invitation Send On",
  },
];

export default function MyPeoplesDataTables({
  columns,
  data,
}: {
  //TODO: SAME HERE!!
  columns: ColumnDef<any>[];
  data: any[];
}) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
