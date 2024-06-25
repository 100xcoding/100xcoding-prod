"use client";

import { useCreatorQuizes } from "@/services/queries";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

const QuizesPage = () => {
  const { data } = useCreatorQuizes();
  return (
    <div className="p-6">
      <DataTable columns={columns} data={data ? data : []} />
    </div>
  );
};

export default QuizesPage;
