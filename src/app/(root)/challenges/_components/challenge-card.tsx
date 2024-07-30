import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  challengeCategoryColorClass,
  challengesCategoryNames,
  cn,
  formatterDescription,
  getImageUrl,
} from "@/lib/utils";
import { Challenge } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
interface ChallengeCategory {
  name: string;
  id: string;
  score: number;
}
interface ChallengeProps extends Challenge {
  challengeCategory?: ChallengeCategory | null;
}

export const ChallengeCard = ({
  title,
  slug,
  description,
  image,
  challengeCategory,
}: ChallengeProps) => {
  const index = challengesCategoryNames.indexOf(challengeCategory?.name!);
  return (
    <>
      <Card className="max-w-[320px] md:max-w-[360px] lg:max-w-[400px] rounded-2xl  border-none  text-white bg-card bg-cover shadow-lg">
        <CardHeader>
          <Link aria-label={slug} href={`/challenges/${slug}`}>
            <Image
              src={getImageUrl(image!)}
              alt={title}
              width={"500"}
              height={"500"}
              className="rounded-lg hover:scale-105 duration-500 ease-in-out"
            />
          </Link>
        </CardHeader>
        <CardContent className=" space-y-2 md:space-y-4">
          <p
            className={cn(
              " rounded-full  w-fit px-4 py-2  text-xs xl:text-base  font-bold leading-[16px] uppercase tracking-widest",
              challengesCategoryNames.includes(challengeCategory?.name!) &&
                challengeCategoryColorClass(index),
            )}
          >
            {challengeCategory?.name}
          </p>

          <Link
            aria-label={slug}
            href={`/challenges/${slug}`}
            className="block hover:underline underline-offset-2 capitalize  tracking-wider text-xl md:text-2xl lg:text-3xl font-bold"
          >
            {title}
          </Link>
          <p className=" text-sm md:text-base text-dark-700 tracking-wide leading-[2rem!important]">
            {description}
          </p>
        </CardContent>
      </Card>
    </>
  );
};
