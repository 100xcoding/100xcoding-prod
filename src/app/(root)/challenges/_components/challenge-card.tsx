import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn, formatterDescription, getImageUrl } from "@/lib/utils";
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
const challengesCategoryIds = [
  "2bed94f6-379c-4dd6-b021-50d1b5926696",
  "ffd31115-a78f-43a3-86fd-83f24dc467d2",
  "24019dd4-31a6-4ae8-8863-e0998c6ebf23",
  "23cc9c69-28a7-469d-a33e-b36e68129322",
];

export const ChallengeCard = ({
  title,
  slug,
  description,
  image,
  challengeCategory,
}: ChallengeProps) => {
  const getColorClass = (index: number) => {
    const colors = [
      "bg-blue-700 text-sky-100",
      "bg-fuchsia-700 text-fuchsia-200",
      "bg-green-700 text-green-200",
      "bg-red-800 text-red-200",
    ];
    return colors[index % colors.length];
  };
  const index = challengesCategoryIds.indexOf(challengeCategory?.id!);
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
              challengesCategoryIds.includes(challengeCategory?.id!) &&
                getColorClass(index),
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
