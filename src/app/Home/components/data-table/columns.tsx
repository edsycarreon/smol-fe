"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Copy, MoreHorizontal } from "lucide-react";
import QRCode from "react-qr-code";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";

import ActionDropDown from "./action-dropdown";

export type Link = {
  id: number;
  originalUrl: string;
  createdAt: string;
  shortUrl: string;
  expiresIn: string;
  views: number;
};

type ColumnsProps = {
  handleDeleteClick: (id: number) => void;
};

function handleCopyClick(shortUrl: string) {
  navigator.clipboard.writeText(shortUrl);
}

export const getColumns = ({
  handleDeleteClick,
}: ColumnsProps): ColumnDef<Link>[] => [
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
  },
  {
    accessorKey: "views",
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
          onClick={() => handleCopyClick(shortUrl)}
        >
          <Copy className="h-6 w-6 mr-2 p-1 cursor-pointer text-black hover:bg-slate-200 rounded-md" />
          <p className="text-blue-500 dark:text-blue-400 ">{shortUrl}</p>
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
          <ActionDropDown link={link} handleDeleteClick={handleDeleteClick} />
        </div>
      );
    },
  },
];
