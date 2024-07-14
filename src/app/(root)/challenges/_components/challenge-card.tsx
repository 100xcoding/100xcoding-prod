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
  return (
    <>
      {/* <div className="flex text-white flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg bg-card max-w-[320px] md:max-w-[360px] lg:max-w-[400px]">
        <div className="">
          <Link href={`/challenges/${slug}`}>
            <Image
              src={getImageUrl(image!)}
              alt={title}
              width={"500"}
              height={"500"}
              className="rounded-lg hover:scale-105 duration-500 ease-in-out"
            />
          </Link>
        </div>
        <div className="mt-4 space-y-2 md:space-y-4">
          <p className="bg-primary max-w-max px-2 py-0.5 rounded-lg text-xs sm:text-sm font-raleway font-medium uppercase tracking-wider">
            {challengeCategory?.name}
          </p>
          <Link
            href={`/challenges/${slug}`}
            className="block hover:underline underline-offset-2 capitalize  tracking-wider text-xl md:text-2xl lg:text-3xl font-bold"
          >
            {title}
          </Link>
          <p className=" text-sm md:text-base text-dark-700">
            {description}
          </p>
        </div>
      </div> */}
      <Card className="max-w-[320px] md:max-w-[360px] lg:max-w-[400px] rounded-2xl  border-none  text-white bg-card bg-cover shadow-lg">
        <CardHeader>
          <Link href={`/challenges/${slug}`}>
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
