import { challengeData } from "@/constants";
import { ChallengeCard } from "./_components/challenge-card";
import { getChallenges } from "./_data-access";
import { Suspense } from "react";
import { Loader } from "@/components/loader";
import { Loader2 } from "@/components/loader2";
import { Pagination } from "@/components/pagination";
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
  // console.log(metadata);
  // await new Promise(resolve => setTimeout(resolve, 3000))
  if (!metadata) {
    return;
  }
  return (
    <div className="container p-3 my-10 mx-auto ">
      <Suspense fallback={<Loader2 />}>
        <div className="flex flex-wrap gap-8 justify-center md:justify-start">
          {challenges &&
            challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} {...challenge} />
            ))}
        </div>
        <Pagination {...metadata} />
      </Suspense>
    </div>
  );
};

export default ChallengesPage;
