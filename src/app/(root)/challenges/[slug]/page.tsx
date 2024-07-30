import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getAllChallenges, getChallenge } from "../_data-access";
import Link from "next/link";
import Image from "next/image";
import {
  challengeCategoryColorClass,
  challengesCategoryNames,
  cn,
  getImageUrl,
} from "@/lib/utils";
import { Play } from "lucide-react";
import { Suspense, cache } from "react";
import { Loader2 } from "@/components/loader2";
import { Metadata } from "next";
import parse from "html-react-parser";
import { FaDiscord } from "react-icons/fa";
import { notFound } from "next/navigation";
interface AllChallengeIdType {
  id: string;
}
// export const revalidate = 60 * 60 * 24;
export async function generateStaticParams() {
  const { challenges }: any = await getAllChallenges();
  return challenges?.map(({ slug }: { slug: string }) => ({ slug })) ?? [];
}
// manual cache
const getChallengeCache = cache(async (slug: string) => {
  return await getChallenge(slug);
});

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { challenge } = await getChallengeCache(slug);
  return {
    title: challenge?.title,
    description: challenge?.description,
    openGraph: {
      title: challenge?.title,
      description: challenge?.description!,
      images: [
        {
          url: getImageUrl(challenge?.image!),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: challenge?.title,
      description: challenge?.description!,
      images: [
        {
          url: getImageUrl(challenge?.image!),
        },
      ],
    },
  };
}
const SingleChallenge = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { challenge } = await getChallengeCache(slug);
  if (!challenge) {
    notFound();
  }
  const index = challengesCategoryNames.indexOf(
    challenge?.challengeCategory?.name!,
  );
  return (
    <section className="container mx-auto p-3 my-10 space-y-8">
      <Suspense fallback={<Loader2 />}>
        <Card className="bg-cardLg bg-no-repeat bg-cover shadow-lg w-full text-white border-none rounded-3xl ">
          <CardHeader className="flex  flex-col-reverse lg:flex-row justify-between items-center gap-6 lg:gap-24 ">
            <div className="flex-1 space-y-4 md:space-y-6 pt-4">
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
              <h2 className="capitalize text-2xl md:text-4xl tracking-wider font-medium md:font-semibold">
                {challenge.title}
              </h2>
              <p className="text-sm md:text-lg text-dark-700">
                {challenge.description}
              </p>
              <Link
                aria-label="start-challenge"
                href={`/playground/${challenge.slug}`}
                className="flex text-base md:text-lg items-center gap-2  w-fit  px-4 py-2.5 rounded-lg bg-green-500 text-white capitalize font-openSans tracking-wide font-medium"
              >
                start challenge
                <Play />
              </Link>
            </div>
            <div className="">
              <Image
                src={getImageUrl(challenge?.image!)}
                width={"500"}
                height={"500"}
                alt={challenge?.title}
                className=" "
              />
            </div>
          </CardHeader>
        </Card>
        <Card className="bg-cover shadow-lg text-white border-none bg-card rounded-2xl">
          <CardContent className="p-4">
            <iframe
              loading="lazy"
              className="h-[600px]  w-full  overflow-hidden rounded-xl"
              src={challenge.figmaDesktop!}
            ></iframe>
          </CardContent>
          {challenge?.authorName && (
            <CardFooter className="px-4 py-1">
              <p className="text-sm">
                CreatedBy: {challenge?.authorName}{" "}
                <Link
                  href={challenge?.authorProfile!}
                  className="underline ml-4 text-green-500"
                  target="_blank"
                >
                  View Profile
                </Link>
              </p>
            </CardFooter>
          )}
        </Card>
        <div className="flex gap-4 flex-wrap lg:flex-nowrap w-full">
          <Card className="bg-cover shadow-lg text-white border-none bg-card rounded-2xl min-w-max">
            <CardHeader>
              <h3 className="font-semibold tracking-wide text-3xl">📝Brief</h3>
            </CardHeader>
            <CardContent>
              <div className="prose w-full prose-a:text-green-500 prose-headings:text-white text-white ">
                {parse(challenge.about || "")}
              </div>
            </CardContent>
          </Card>
          <div className="space-y-4 ">
            <Card className="bg-cover shadow-lg text-white border-none bg-card rounded-2xl">
              <CardHeader>
                <h3 className="text-xl">💡Resources</h3>
              </CardHeader>
              <CardContent>
                <div className="prose prose-a:text-green-500 prose-headings:text-white text-white ">
                  {parse(challenge.resource || " ")}
                </div>
              </CardContent>
            </Card>
            <Card className="bg-cover shadow-lg text-white border-none bg-card rounded-2xl">
              <CardHeader>
                <h3 className="text-xl">Get Involved with the Community</h3>
              </CardHeader>
              <CardContent>
                <p className="text-base text-dark-700">
                  Join our Discord community and share your solutions with
                  others. Ask questions and get answers from the fellow
                  developers, help others and get involved with the community.
                </p>
              </CardContent>
              <CardFooter>
                <Link
                  aria-label="join discord"
                  href={"/"}
                  className="flex text-base md:text-lg items-center gap-2  w-fit  px-4 py-2.5 rounded-lg bg-[#5865F2] text-white capitalize  tracking-wide font-medium"
                >
                  join discord
                  <FaDiscord />
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </Suspense>
    </section>
  );
};

export default SingleChallenge;
