"use client";

import { useCreatorChallenges } from "@/services/queries";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export const ChallengeTable = () => {
  const { data } = useCreatorChallenges();
  return (
    <div className="p-6 text-white">
      <DataTable columns={columns} data={data ? data : []} />
    </div>
  );
};
