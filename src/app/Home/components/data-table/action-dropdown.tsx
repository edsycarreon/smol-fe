import { useMutation } from "@tanstack/react-query";
import { MoreHorizontal } from "lucide-react";
import QRCode from "react-qr-code";

import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../../../components/ui/dropdown-menu";
import { useToast } from "../../../../components/ui/use-toast";
import { deleteShortUrl } from "../../../../services/url/url.service";
import { Link } from "../../../../types";

type ActionDropdownProps = {
  link: Link;
};

function ActionDropDown(props: ActionDropdownProps) {
  const { link } = props;
  const { toast } = useToast();

  async function handleDeleteUrl(shortUrl: string) {
    const response = await deleteShortUrl(shortUrl);
    return response.json();
  }

  const { mutate } = useMutation({
    mutationFn: handleDeleteUrl,
    onSuccess: (response) => {
      toast({
        variant: "success",
        title: "Link deleted successfully",
        duration: 2000,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong. Please try again.",
        duration: 2000,
      });
    },
  });

  function handleDeleteButton(shortUrl: string) {
    mutate(shortUrl);
  }
  return (
    <Dialog>
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
          <DialogTrigger>
            <DropdownMenuItem>View QR Code</DropdownMenuItem>
          </DialogTrigger>
          <DropdownMenuItem
            onClick={() => handleDeleteButton(link.shortUrl)}
            className="text-red-500"
          >
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
        </DialogHeader>
        <QRCode
          className="h-auto min-w-full w-full"
          size={256}
          value={link.shortUrl}
        />
      </DialogContent>
    </Dialog>
  );
}

export default ActionDropDown;
