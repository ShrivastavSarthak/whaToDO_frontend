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
import moment from "moment";
import { ResendInvite, WithdrawalInvites } from "./withdrawal_resend_popUp";
import { useState } from "react";

export const MyPeoplesDataColumns: ColumnDef<myTableInterface>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "roleAssigned",
    header: "Role Assigned",
  },
  {
    accessorKey: "status",
    header: "Invitation status",
  },
  {
    accessorKey: "Withdrawal Invitation",
    cell: ({ row }) => {
      const id = row.original._id;
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
      const handleClose = (data:boolean) => {
        setIsModalOpen(data);
      };
      return (
        <>
        <Button size={"sm"} onClick={() =>{setIsModalOpen(true)} }>
          Withdraw
        </Button>
        <WithdrawalInvites id={id} isOpen={isModalOpen} handleModalClose={handleClose}  />
        </>
      );
    },
  },
  {
    accessorKey: "Resend Invitation",
    cell: ({ row }) => {
      const id = row.original._id;
      const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
      const handleClose = (data:boolean) => {
        setIsModalOpen(data);
      };
      return (
        <>
        <Button size={"sm"} onClick={() =>{setIsModalOpen(true)} }>
          Resend invite
        </Button>
        <ResendInvite id={id} isOpen={isModalOpen} handleModalClose={handleClose}  />
        </>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: "Invited Date",
    cell: ({ row }) => {
      return moment(row.getValue("created_at")).format("YYYY-MM-DD") 

    }
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
