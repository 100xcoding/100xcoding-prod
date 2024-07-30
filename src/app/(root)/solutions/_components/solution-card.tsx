import {
  Challenge as PrismaChallenge,
  ChallengeCategory as PrismaChallengeCategory,
} from "@prisma/client";
import moment from "moment";
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

type Challenge = PrismaChallenge & {
  challengeCategory?: PrismaChallengeCategory | null;
};
interface SolutionCardProps {
  challenge: Challenge;
  user: {
    name: string | null;
    image: string | null;
  };
  updatedAt: Date;
  slug: string;
}
export const SolutionCard = ({
  challenge,
  user,
  updatedAt,
  slug,
}: SolutionCardProps) => {
  // console.log(user);

  const index = challengesCategoryNames.indexOf(
    challenge?.challengeCategory?.name!,
  );
  return (
    <Card className="max-w-[320px] md:max-w-[360px] lg:max-w-[400px] rounded-2xl  border-none  text-white bg-card bg-cover shadow-lg">
      <CardHeader>
        <Link href={`/solutions/${slug}`} aria-label="solution-image">
          <Image
            src={getImageUrl(challenge?.image!)}
            alt={challenge?.title}
            width={"500"}
            height={"500"}
            className="rounded-lg hover:scale-105 duration-500 ease-in-out"
          />
        </Link>
      </CardHeader>
      <CardContent className="space-y-2 md:space-y-4">
        <p
          className={cn(
            " rounded-full  w-fit px-4 py-2  text-xs xl:text-base  font-bold leading-[16px] uppercase tracking-widest",
            challengesCategoryNames.includes(
              challenge?.challengeCategory?.name!,
            ) && challengeCategoryColorClass(index),
          )}
        >
          {challenge.challengeCategory?.name}
        </p>
        <Link
          aria-label="solution title"
          href={`/solutions/${slug}`}
          className="block hover:underline underline-offset-2 capitalize  tracking-wider text-xl md:text-2xl lg:text-3xl font-bold"
        >
          {challenge?.title}
        </Link>
        <p className=" text-sm md:text-base text-dark-700 tracking-wide leading-[1.6rem!important]">
          {challenge?.description}
        </p>
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <Avatar className="h-12 w-12 object-cover">
          <AvatarImage src={user?.image!} alt={user?.name!} />
          <AvatarFallback className="capitalize text-xl font-bold">
            {user?.name!.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="">
          <h4 className=" text-lg">{user?.name}</h4>
          <p className=" text-slate-400">{moment(updatedAt).fromNow()}</p>
        </div>
      </CardFooter>
    </Card>
  );
};
