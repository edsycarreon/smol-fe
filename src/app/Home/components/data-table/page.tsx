import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";

import { useToast } from "../../../../components/ui/use-toast";
import { getAllUserUrls } from "../../../../services/url/url.service";
import { Link } from "../../../../types";

import { getColumns } from "./columns";
import { DataTable } from "./data-table";

export default function URLTable() {
  const [data, setData] = useState<Link[]>();
  const { toast } = useToast();

  async function fetchLinks() {
    const response = await getAllUserUrls();
    return response.json();
  }

  const {
    isPending,
    isError,
    data: queryData,
    error,
  } = useQuery({
    queryKey: ["links"],
    queryFn: fetchLinks,
  });

  const columns = useMemo(() => getColumns(), []);

  if (isPending) {
    return null;
  }

  if (isError) {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong. Please try again.",
      duration: 2000,
    });
  }

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={queryData.data} />
    </div>
  );
}
