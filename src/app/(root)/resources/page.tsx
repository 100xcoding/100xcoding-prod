import { db } from "@/lib/db";
import { ResourceCard } from "./_components/resource-card";
import { Filters } from "./_components/filters";

const getResources = async () => {
  return await db.resource.findMany({
    include: {
      resourceTag: {
        select: {
          resourceTag: {
            select: {
              name: true,
            },
          },
        },
      },
      resourceType: {
        select: {
          name: true,
        },
      },
    },
  });
};
const getResourcesType = async () => {
  return await db.resourceType.findMany({});
};
const ResourcesPage = async () => {
  const data = await getResources();
  const resourceTypeData = await getResourcesType();
  // console.log(resourceTypeData);
  // console.log(data);
  // console.log(data[0]?.resourceTag);
  return (
    <section className="container p-3 my-6 space-y-4 mx-auto ">
      <div className="">
        <Filters resourceTypes={resourceTypeData} />
      </div>
      <div className="">
        {data &&
          data.map((item) => (
            <ResourceCard
              resource={item}
              tags={item.resourceTag!}
              type={item.resourceType!}
              key={item.id}
            />
          ))}
      </div>
    </section>
  );
};

export default ResourcesPage;
