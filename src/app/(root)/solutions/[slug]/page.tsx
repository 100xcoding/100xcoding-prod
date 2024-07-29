import { Card, CardHeader } from "@/components/ui/card";
import { getChallengeSolution, getChallengeSolutions } from "../_data-access";
import Link from "next/link";
import Image from "next/image";
import { cn, getImageUrl } from "@/lib/utils";
import { ShowWebsite } from "../_components/show-website";
import { cache, Suspense } from "react";
import { Loader2 } from "@/components/loader2";
import { CommentForm } from "../_components/comment-form";
import { CommentList } from "../_components/comment-list";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { FaArrowRightLong } from "react-icons/fa6";
import { Metadata } from "next";

export const revalidate = 60 * 60 * 24;
export async function generateStaticParams() {
  const { solutions } = await getChallengeSolutions();
  return solutions?.map(({ slug }: { slug: string }) => ({ slug })) ?? [];
}
// manual cache
const getSolutionCache = cache(async (slug: string) => {
  return await getChallengeSolution(slug);
});
export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { solution } = await getSolutionCache(slug);
  return {
    title: `${solution?.challenge?.title} - Solution`,
    description: solution?.challenge?.description,
    openGraph: {
      title: solution?.challenge?.title,
      description: solution?.challenge?.description!,
      images: [
        {
          url: getImageUrl(solution?.challenge?.image!),
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: solution?.challenge?.title,
      description: solution?.challenge?.description!,
      images: [
        {
          url: getImageUrl(solution?.challenge?.image!),
        },
      ],
    },
  };
}
const challengesCategoryIds = [
  "2bed94f6-379c-4dd6-b021-50d1b5926696",
  "ffd31115-a78f-43a3-86fd-83f24dc467d2",
  "24019dd4-31a6-4ae8-8863-e0998c6ebf23",
  "23cc9c69-28a7-469d-a33e-b36e68129322",
];
const SingleSolution = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { solution } = await getSolutionCache(slug);
  const session = await auth();
  const getColorClass = (index: number) => {
    const colors = [
      "bg-blue-700 text-sky-100",
      "bg-fuchsia-700 text-fuchsia-200",
      "bg-green-700 text-green-200",
      "bg-red-800 text-red-200",
    ];
    return colors[index % colors.length];
  };
  const index = challengesCategoryIds.indexOf(
    solution?.challenge?.challengeCategory?.id!,
  );
  return (
    <section className="container mx-auto mt-4 ">
      <Suspense fallback={<Loader2 />}>
        <Card className="bg-cardLg bg-cover border-none text-white shadow-lg  rounded-2xl">
          <CardHeader className="mt-4 flex flex-col-reverse lg:flex-row justify-between items-center gap-6 lg:gap-24">
            <div className="flex-1 space-y-4 md:space-y-6">
              <p
                className={cn(
                  " rounded-full  w-fit px-4 py-2  text-xs xl:text-base  font-bold leading-[16px] uppercase tracking-widest",
                  challengesCategoryIds.includes(
                    solution?.challenge?.challengeCategory?.id!,
                  ) && getColorClass(index),
                )}
              >
                {solution?.challenge.challengeCategory?.name}
              </p>
              <h2 className="capitalize text-2xl md:text-4xl tracking-wider font-medium md:font-semibold">
                {solution?.challenge.title}
              </h2>
              <p className="text-sm md:text-lg text-dark-700">
                {solution?.challenge.description}
              </p>
              <Link
                aria-label="solution"
                href={`/solutions`}
                className="flex text-base md:text-lg items-center gap-2  w-fit  px-4 py-2.5 rounded-lg bg-green-500 capitalize font-openSans tracking-wide font-medium"
              >
                Explore more
                <FaArrowRightLong size={22} />
              </Link>
            </div>
            <div className="    ">
              <Image
                src={getImageUrl(solution?.challenge?.image!)}
                width={"500"}
                height={"500"}
                alt={solution?.challenge?.title!}
              />
            </div>
          </CardHeader>
        </Card>
      </Suspense>
      <Suspense fallback={<Loader2 />}>
        <div className="mt-4">
          <ShowWebsite solution={solution} slug={slug} />
        </div>
      </Suspense>
      <div className="my-6 text-white bg-dark-500 p-4 rounded-md space-y-4">
        <div className="flex justify-between items-center">
          <p className="capitalize font-semibold text-3xl">Feedback</p>
          {!session?.user && (
            <Button asChild aria-label="add a feedback">
              <Link
                aria-label="add a feedback"
                href={`/login?redirect=/solutions/${slug}`}
              >
                Add a Feedback
              </Link>
            </Button>
          )}
        </div>
        {session?.user && (
          <>
            <CommentForm slug={slug} />
            <CommentList slug={slug} />
          </>
        )}
      </div>
    </section>
  );
};

export default SingleSolution;
