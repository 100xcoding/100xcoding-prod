import { Card, CardContent } from "@/components/ui/card";
import { getChallengeSolution } from "../_data-access";
import Link from "next/link";
import Image from "next/image";
import { getImageUrl } from "@/lib/utils";
import { ShowWebsite } from "../_components/show-website";

const SingleSolution = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { solution } = await getChallengeSolution(slug);
  // console.log(solution);
  return (
    <section className="container mx-auto">
      <Card className="bg-[#17023A]">
        <CardContent className="mt-4 flex flex-col-reverse lg:flex-row justify-between items-center gap-6 lg:gap-24">
          <div className="flex-1 space-y-4 md:space-y-6">
            <p className="dark:bg-primary max-w-max px-2 py-0.5 rounded-lg text-xs sm:text-sm font-raleway font-medium uppercase tracking-wider">
              {solution?.challenge.challengeCategory?.name}
            </p>
            <h2 className="capitalize font-roboto text-2xl md:text-4xl tracking-wider font-medium md:font-semibold">
              {solution?.challenge.title}
            </h2>
            <p className="font-inter text-sm md:text-lg text-slate-400">
              {solution?.challenge.description}
            </p>
            <Link
              href={`/playground/${solution?.challenge.slug}`}
              className="flex text-base md:text-lg items-center gap-2 bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 w-fit  px-4 py-2.5 rounded capitalize font-openSans tracking-wide font-medium"
            >
              start challenge
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
        </CardContent>
      </Card>
      <div className="mt-4">
        <ShowWebsite solution={solution} slug={slug} />
      </div>
    </section>
  );
};

export default SingleSolution;
