"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";

import { config } from "../../../../config";
import { Link } from "../../../../types";

import ActionDropDown from "./action-dropdown";

type ColumnsProps = {
  handleDeleteClick: (id: string) => void;
};

function handleCopyClick(shortUrl: string) {
  navigator.clipboard.writeText(shortUrl);
}
const baseUrl = config.api.baseUrl;

export const getColumns = (): ColumnDef<Link>[] => [
  {
    accessorKey: "originalUrl",
    header: "Original URL",
    cell: ({ row }) => {
      const originalUrl: string = row.getValue("originalUrl");
      return (
        <a
          href={originalUrl}
          className="text-blue-500 dark:text-blue-400 hover:underline"
        >
          {originalUrl}
        </a>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          className="pl-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Created At
        </Button>
      );
    },
  },
  {
    accessorKey: "expiresIn",
    header: "Expires In",
    cell: ({ row }) => {
      const expiresIn: string = row.getValue("expiresIn");
      if (!expiresIn) return "Never";
      return expiresIn;
    },
  },
  {
    accessorKey: "visitCount",
    header: "Views",
  },
  {
    accessorKey: "shortUrl",
    header: "Short URL",
    cell: ({ row }) => {
      const shortUrl: string = row.getValue("shortUrl");
      return (
        <div
          className="flex items-center"
          onClick={() => handleCopyClick(`${baseUrl}/${shortUrl}`)}
        >
          <Copy className="h-6 w-6 mr-2 p-1 cursor-pointer text-black hover:bg-slate-200 rounded-md" />
          <p className="text-blue-500 dark:text-blue-400 ">{`${baseUrl}/${shortUrl}`}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    accessorKey: "actions",
    header: () => <div className="text-right">Actions</div>,
    cell: ({ row }) => {
      const link = row.original;

      return (
        <div className="flex justify-end">
          <ActionDropDown link={link} />
        </div>
      );
    },
  },
];
