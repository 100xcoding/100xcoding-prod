import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Challenges",
};
import { ChallengeCard } from "./_components/challenge-card";
// import { getChallenges } from "./_data-access";
async function getChallenges({ take, skip }: { take: number; skip: number }) {
  try {
    const challenges = await db.challenge.findMany({
      where: {
        publish: true,
      },
      take,
      skip,
      include: {
        challengeCategory: true,
      },
    });
    const total = await db.challenge.count();
    return {
      success: true,
      challenges,
      metadata: {
        hasNextPage: skip + take < total,
        totalPages: Math.ceil(total / take),
      },
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
import { Suspense } from "react";
import { Loader2 } from "@/components/loader2";
import { Pagination } from "@/components/pagination";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
const PAGE_SIZE = 8;
const ChallengesPage = async ({
  searchParams,
}: {
  searchParams: { page: string };
}) => {
  const pageNumber = Number(searchParams?.page || 1);
  const take = PAGE_SIZE;
  const skip = (pageNumber - 1) * take;
  const { challenges, metadata } = await getChallenges({ take, skip });
  // await new Promise(resolve => setTimeout(resolve, 3000))
  return (
    <div className="container p-3 my-10 mx-auto flex justify-between gap-10 flex-col min-h-[80vh]">
      <Suspense fallback={<Loader2 />}>
        <div className="flex flex-wrap gap-8 justify-center md:justify-start">
          {challenges &&
            challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} {...challenge} />
            ))}
          {challenges && challenges.length <= 0 && (
            <h2 className="text-center font-heading mx-auto m-10 text-6xl sm:text-7xl lg:text-8xl leading-[5rem] sm:leading-[7rem] lg:leading-[7rem] font-black	 ">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
                {"Coming Soon!"}
              </span>
              <span className="">⏳</span>
            </h2>
          )}
        </div>
        {metadata && metadata?.totalPages > 1 && <Pagination {...metadata} />}
      </Suspense>
    </div>
  );
};

export default ChallengesPage;
