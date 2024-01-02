"use client";

import { ColumnDef } from "@tanstack/react-table";

export type MessagesColumn = {
  name: string;
  email: string;
  body: string;
  createdAt: string;
};

export const columns: ColumnDef<MessagesColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Time",
  },
  {
    accessorKey: "body",
    header: "Body",
  },
];
