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
  // console.log(user);

  // const index = challengesCategoryNames.indexOf(
  //     challenge?.challengeCategory?.name!,
  // );
  return (
    <Card className="max-w-[320px] md:max-w-[340px] max-h-[480px] h-[450px]  rounded-2xl  border-none  text-white bg-card bg-cover shadow-lg pb-0">
      <CardHeader>
        <Link href={`${resource.url}`} aria-label="resource-thumbnail">
          <Image
            src={resource.imageUrl ?? ""}
            alt={resource.title}
            width={"500"}
            height={"500"}
            className="rounded-lg hover:scale-105 duration-500 ease-in-out"
          />
        </Link>
      </CardHeader>
      <div className="">
        <CardContent className="space-y-2">
          <div className="flex justify-between items-center">
            <Badge className="bg-dark-600 uppercase">{type.name}</Badge>
            <Badge className="bg-dark-600 uppercase">{language.name}</Badge>
          </div>
          <Link
            aria-label="solution title"
            href={`${resource.url}`}
            className="block hover:underline underline-offset-2 capitalize  tracking-wider text-xl  font-bold"
          >
            {sliceText(resource.title, 52)}
          </Link>
          <p className=" text-sm text-dark-700 tracking-wide leading-[1.5rem!important]">
            {sliceText(resource.description!, 120)}
          </p>
          <div className="flex flex-wrap items-center gap-3 ">
            {tags &&
              tags?.map(({ resourceTag }, ind) => (
                <Badge key={ind}>{resourceTag.name}</Badge>
              ))}
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
