import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatterDescription, getImageUrl } from "@/lib/utils";
import { Challenge } from "@prisma/client";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
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
          <p className="bg-green-600 rounded-full text-green-400 w-fit px-4 py-2  text-xs xl:text-sm  font-semibold leading-[16px] uppercase tracking-widest">
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
