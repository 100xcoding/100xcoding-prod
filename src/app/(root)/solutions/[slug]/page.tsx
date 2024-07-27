import { Card, CardHeader } from "@/components/ui/card";
import { getChallengeSolution } from "../_data-access";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { ShowWebsite } from "../_components/show-website";
import { Suspense } from "react";
import { Loader2 } from "@/components/loader2";
import { CommentForm } from "../_components/comment-form";
import { CommentList } from "../_components/comment-list";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { FaArrowRightLong } from "react-icons/fa6";

const SingleSolution = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { solution } = await getChallengeSolution(slug);
  const session = await auth();
  return (
    <section className="container mx-auto mt-4 ">
      <Suspense fallback={<Loader2 />}>
        <Card className="bg-cardLg bg-cover border-none text-white shadow-lg  rounded-2xl">
          <CardHeader className="mt-4 flex flex-col-reverse lg:flex-row justify-between items-center gap-6 lg:gap-24">
            <div className="flex-1 space-y-4 md:space-y-6">
              <p className="bg-green-600 rounded-full text-green-400 w-fit px-4 py-2  text-xs xl:text-sm  font-semibold leading-[16px] uppercase tracking-widest">
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
