import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getChallengeSolution } from "../_data-access";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { ShowWebsite } from "../_components/show-website";
import { Suspense } from "react";
import { Loader2 } from "@/components/loader2";

const SingleSolution = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { solution } = await getChallengeSolution(slug);
  // console.log(solution);
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
                href={`/playground/${solution?.challenge.slug}`}
                className="flex text-base md:text-lg items-center gap-2  w-fit  px-4 py-2.5 rounded-lg bg-green-500 capitalize font-openSans tracking-wide font-medium"
              >
                Explore more
                {/* <Play /> */}
              </Link>
            </div>
            <div className=" border   ">
              <Image
                src={getImageUrl(solution?.challenge?.image!)}
                width={"500"}
                height={"500"}
                alt={solution?.challenge?.title!}
                className=" "
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
    </section>
  );
};

export default SingleSolution;
