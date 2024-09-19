import { db } from "@/lib/db";
import { ResourceCard } from "./_components/resource-card";
import { Filters } from "./_components/filters";
import Link from "next/link";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Resources",
};
const getResources = async ({
  currentType,
  tag,
  language,
}: {
  currentType?: string;
  tag?: string;
  language?: string;
}) => {
  return await db.resource.findMany({
    where: {
      isPublish: true,
      resourceTypeId: currentType,
      resourceLanguageId: language,
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
      resourceLanguage: {
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
const getResourcesLanguages = async () => {
  return await db.resourceLanguage.findMany({});
};
interface SearchProps {
  searchParams: {
    currentType: string;
    tag: string;
    language: string;
  };
}
function shuffleArray(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle
  while (currentIndex !== 0) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Swap it with the current element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}
const ResourcesPage = async ({ searchParams }: SearchProps) => {
  const data = await getResources({ ...searchParams });
  const resourceTypeData = await getResourcesType();
  const resourceTags = await getResourcesTags();
  const resourceLanguages = await getResourcesLanguages();
  const finalResult = shuffleArray(data);
  return (
    <section className="container p-3 my-6 space-y-4 mx-auto ">
      <div className="">
        <Filters
          resourceTypes={resourceTypeData}
          resourceTags={resourceTags}
          resourceLanguages={resourceLanguages}
        />
      </div>
      <div className="flex flex-wrap  items-center gap-4">
        {data.length > 0 &&
          finalResult.map((item) => (
            <ResourceCard
              resource={item}
              tags={item.resourceTag!}
              type={item.resourceType!}
              language={item.resourceLanguage!}
              key={item.id}
            />
          ))}
      </div>
      <div className="">
        {data.length === 0 && (
          <div className="text-center">
            <p className="text-lg tracking-wide">
              We are currently adding new resources. If you have good resources
              to share, please send them to us at{" "}
            </p>
            <Link
              className="underline text-green-500 text-xl"
              href={`mailto:connect@100xcoding.com`}
            >
              connect@100xcoding.com
            </Link>{" "}
            <span className="pl-2 text-lg tracking-wide">
              so we can include them on the website!
            </span>
          </div>
        )}
      </div>
    </section>
  );
};

export default ResourcesPage;
