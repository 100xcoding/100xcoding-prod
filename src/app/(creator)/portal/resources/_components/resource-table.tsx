import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { getResources } from "../_actions";

export const ResourceTable = async () => {
  const { resources: data } = await getResources();
  // console.log(resources);
  return (
    <div className="p-6 text-white">
      <DataTable columns={columns} data={data || []} />
    </div>
  );
};
