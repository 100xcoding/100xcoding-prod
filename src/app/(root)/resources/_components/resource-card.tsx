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
} from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  tags: ResourceTag[];
}
export const ResourceCard = ({ resource, tags, type }: ResourceCardProps) => {
  // console.log(user);

  // const index = challengesCategoryNames.indexOf(
  //     challenge?.challengeCategory?.name!,
  // );
  return (
    <Card className="max-w-[320px] md:max-w-[360px] lg:max-w-[400px] rounded-2xl  border-none  text-white bg-card bg-cover shadow-lg">
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
      <CardContent className="space-y-2 md:space-y-4">
        {/* <p
                    className={cn(
                        " rounded-full  w-fit px-4 py-2  text-xs xl:text-base  font-bold leading-[16px] uppercase tracking-widest",
                        challengesCategoryNames.includes(
                            challenge?.challengeCategory?.name!,
                        ) && challengeCategoryColorClass(index),
                    )}
                >
                    {challenge.challengeCategory?.name}
                </p> */}
        <Link
          aria-label="solution title"
          href={`${resource.url}`}
          className="block hover:underline underline-offset-2 capitalize  tracking-wider text-xl md:text-2xl lg:text-3xl font-bold"
        >
          {resource.title}
        </Link>
        <p className=" text-sm md:text-base text-dark-700 tracking-wide leading-[1.6rem!important]">
          {resource.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-4"></CardFooter>
    </Card>
  );
};
