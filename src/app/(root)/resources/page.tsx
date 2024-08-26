import { db } from "@/lib/db";
import { ResourceCard } from "./_components/resource-card";
import { Filters } from "./_components/filters";

const getResources = async ({
  currentType,
  tag,
}: {
  currentType?: string;
  tag?: string;
}) => {
  return await db.resource.findMany({
    where: {
      resourceTypeId: currentType,
      resourceTag: {
        some: {
          resourceTagId: tag,
        },
      },
    },

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
const getResourcesTags = async () => {
  return await db.resourceTag.findMany({});
};
interface SearchProps {
  searchParams: {
    currentType: string;
    tag: string;
    // message: string;
  };
}
const ResourcesPage = async ({ searchParams }: SearchProps) => {
  const data = await getResources({ ...searchParams });
  const resourceTypeData = await getResourcesType();
  const resourceTags = await getResourcesTags();
  // console.log(resourceTypeData);
  // console.log(data);
  // console.log(data[0]?.resourceTag);
  return (
    <section className="container p-3 my-6 space-y-4 mx-auto ">
      <div className="">
        <Filters resourceTypes={resourceTypeData} resourceTags={resourceTags} />
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
