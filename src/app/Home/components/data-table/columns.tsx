"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Copy, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  handleShowQRCode: (shortUrl: string) => void;
};

function handleCopyClick(shortUrl: string) {
  navigator.clipboard.writeText(shortUrl);
}

export const getColumns = ({
  handleDeleteClick,
  handleShowQRCode,
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild className="mr-3">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(link.shortUrl)}
              >
                Copy short URL
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(link.originalUrl)}
              >
                Copy original URL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShowQRCode(link.shortUrl)}>
                View QR Code
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeleteClick(link.id)}
                className="text-red-500"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
