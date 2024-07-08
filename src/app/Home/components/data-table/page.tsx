import { useMemo, useState } from "react";

import { Link, getColumns } from "./columns";
import { DataTable } from "./data-table";

export default function LinkTable() {
  const [data, setData] = useState<Link[]>([
    {
      id: 1,
      originalUrl: "https://www.youtube.com/watch?v=nbC-ErVHhzE&t=855s",
      createdAt: "2024-07-06T13:49:16.553Z",
      shortUrl: "http://localhost:3000/abc123",
      expiresIn: "2024-07-08T13:49:16.553Z",
      views: 100,
    },
    {
      id: 2,
      originalUrl: "https://youtu.be/f_iQRO5BdCM?si=bE9eJOtIr3i3VxRz",
      createdAt: "2024-07-06T13:49:16.553Z",
      shortUrl: "http://localhost:3000/iuyandi",
      expiresIn: "2024-07-09T13:49:16.553Z",
      views: 120,
    },
  ]);

  //TODO implement handleDeleteClick and handleShowQRCode
  function handleDeleteClick(id: number) {}
  function handleShowQRCode(shortUrl: string) {}

  const columns = useMemo(
    () => getColumns({ handleDeleteClick, handleShowQRCode }),
    [handleDeleteClick, handleShowQRCode]
  );

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
