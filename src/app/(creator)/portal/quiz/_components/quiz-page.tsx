"use client";

import { useCreatorQuizes } from "@/services/queries";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export const QuizPageForm = () => {
  const { data } = useCreatorQuizes();
  return (
    <div className="p-6">
      <DataTable columns={columns} data={data ? data : []} />
    </div>
  );
};
