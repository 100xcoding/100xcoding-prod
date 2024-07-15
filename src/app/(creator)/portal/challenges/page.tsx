"use client";

import { useCreatorChallenges } from "@/services/queries";
import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

const ChallengePage = () => {
  const { data } = useCreatorChallenges();
  // console.log(data);
  return (
    <div className="p-6 text-white">
      <DataTable columns={columns} data={data ? data : []} />
    </div>
  );
};

export default ChallengePage;
