import { Resource } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  challengeCategoryColorClass,
  challengesCategoryNames,
  cn,
  formatterDescription,
  getImageUrl,
  sliceText,
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
type Tag = {
  name: string;
};
type ResourceTag = {
  resourceTag: {
    name: string;
  };
};
interface ResourceCardProps {
  resource: Resource;
  type: {
    name: string;
  };
  language: {
    name: string;
  };
  tags: ResourceTag[];
}
export const ResourceCard = ({
  resource,
  tags,
  type,
  language,
}: ResourceCardProps) => {
  return (
    <div className="max-w-[320px] p-3 max-h-[410px] h-[410px] flex flex-col  gap-2 rounded-2xl  border-none  text-white bg-card bg-cover shadow-lg pb-0">
      <div>
        <Link href={`${resource.url}`} aria-label="resource-thumbnail">
          <Image
            src={resource.imageUrl ?? ""}
            alt={resource.title}
            width={"500"}
            height={"500"}
            className="rounded-lg hover:scale-105 duration-500 ease-in-out"
          />
        </Link>
      </div>
      <div className="space-y-2 flex flex-col justify-between h-full mb-4">
        <div className="">
          <div className="flex justify-between items-center">
            <Badge className="bg-dark-600 uppercase">{type.name}</Badge>
            <Badge className="bg-dark-600 uppercase">{language.name}</Badge>
          </div>
          <Link
            aria-label="solution title"
            href={`${resource.url}`}
            className="block hover:underline underline-offset-2 capitalize  tracking-wider text-[18px]  font-bold"
          >
            {sliceText(resource.title, 52)}
          </Link>
          <p className=" text-sm text-dark-700 tracking-wide leading-[1.5rem!important] break-words">
            {sliceText(resource.description!, 100)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 ">
          {tags &&
            tags?.map(({ resourceTag }, ind) => (
              <Badge key={ind}>{resourceTag.name}</Badge>
            ))}
        </div>
      </div>
    </div>
  );
};
