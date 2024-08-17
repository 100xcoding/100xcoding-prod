import { auth } from "@/auth";
import { getResources } from "./_actions";
import { redirect } from "next/navigation";
import { ResourceTable } from "./_components/resource-table";

const ResourcePage = async () => {
  const { resources } = await getResources();
  const session = await auth();
  if (session?.user?.role !== "creator") {
    redirect("/");
  }
  return (
    <div className="w-full">
      <ResourceTable />
    </div>
  );
};

export default ResourcePage;
