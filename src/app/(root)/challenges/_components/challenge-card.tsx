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
    <Card className="max-w-[320px] md:max-w-[360px] lg:max-w-[400px] rounded-lg  border bg-[#17023A]">
      <CardHeader className="bg-gradient-to-b from-violet-400 to-pink-400 via-orange-300 p-5 rounded-t-lg">
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
      <CardContent className="mt-4 space-y-2 md:space-y-4">
        <p className="dark:bg-primary max-w-max px-2 py-0.5 rounded-lg text-xs sm:text-sm font-raleway font-medium uppercase tracking-wider">
          {challengeCategory?.name}
        </p>
        <Link
          href={`/challenges/${slug}`}
          className="block hover:underline underline-offset-2 capitalize font-inter tracking-wider text-xl md:text-2xl lg:text-3xl font-bold"
        >
          {title}
        </Link>
        <p className="font-inter text-sm md:text-base text-slate-400">
          {description}
        </p>
      </CardContent>
    </Card>
  );
};
