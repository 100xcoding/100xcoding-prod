import { db } from "@/lib/db";
import { ResourceCard } from "./_components/resource-card";

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
const ResourcesPage = async () => {
  const data = await getResources();
  // console.log(data);
  // console.log(data[0]?.resourceTag);
  return (
    <section className="container p-3 my-10 mx-auto ">
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
