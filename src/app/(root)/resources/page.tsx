import { db } from "@/lib/db";
import { ResourceCard } from "./_components/resource-card";
import { Filters } from "./_components/filters";
import Link from "next/link";
import { Metadata } from "next";
import { TagFilter } from "./_components/tag-filter";
import { Suspense } from "react";
import { Pagination } from "./_components/pagination";
export const metadata: Metadata = {
  title: "Resources",
};
const PAGE_SIZE = 8;
interface IResource {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  url: string; // Add the 'url' field
  creatorId: string;
  isPublish: boolean;
  createdAt: Date;
  updatedAt: Date;
  resourceTypeId: string | null; // Add 'resourceTypeId'
  resourceLanguageId: string | null; // Add 'resourceLanguageId'
  resourceTag: {
    resourceTag: {
      name: string;
    };
  }[];
  resourceType: {
    name: string;
  } | null; // Allow null for resourceType
  resourceLanguage: {
    name: string;
  } | null;
}
const getResources = async ({
  currentType,
  tag,
  language,
  take = PAGE_SIZE,
  skip,
}: {
  currentType?: string;
  tag?: string;
  language?: string;
  take: number;
  skip: number;
}) => {
  const arrayTags = tag?.split(",");

  const totalCount = await db.resource.count({
    where: {
      isPublish: true,
      resourceTypeId: currentType,
      resourceLanguageId: language,
      resourceTag: {
        some: {
          resourceTag: {
            name: {
              in: arrayTags,
            },
          },
        },
      },
    },
  });

  const resources = await db.resource.findMany({
    where: {
      isPublish: true,
      resourceTypeId: currentType,
      resourceLanguageId: language,
      resourceTag: {
        some: {
          resourceTag: {
            name: {
              in: arrayTags,
            },
          },
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
    take: take,
    skip: skip,
  });
  return {
    data: resources,
    metadata: {
      hasNextPage: skip + take < totalCount,
      totalPages: Math.ceil(totalCount / take),
    },
  };
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
    page?: string;
  };
}
function shuffleArray(array: IResource[]) {
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
  const pageNumber = Number(searchParams?.page || 1); // Get the page number. Default to 1 if not provided.
  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;
  const { data, metadata } = await getResources({
    ...searchParams,
    take,
    skip,
  });
  const resourceTypeData = await getResourcesType();
  const resourceTags = await getResourcesTags();
  const resourceLanguages = await getResourcesLanguages();
  const finalResult: IResource[] = shuffleArray(data);

  return (
    <section className="container p-3 my-6 space-y-4 mx-auto ">
      <Filters
        resourceTypes={resourceTypeData}
        resourceLanguages={resourceLanguages}
      />
      <TagFilter resourceTags={resourceTags} />
      <Suspense fallback={<div>loading...</div>}>
        <div className="flex flex-wrap justify-center lg:justify-normal  items-center gap-4 mt-2">
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
      </Suspense>
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
      {data.length > 0 && (
        <div className="pt-6">
          <Pagination {...metadata} />
        </div>
      )}
    </section>
  );
};

export default ResourcesPage;
