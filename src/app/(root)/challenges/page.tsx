import { challengeData } from "@/constants";
import { ChallengeCard } from "./_components/challenge-card";
import { getChallenges } from "./_data-access";
import { Suspense } from "react";
import { Loader } from "@/components/loader";
import { Loader2 } from "@/components/loader2";

const ChallengesPage = async () => {
  const data = await getChallenges();
  // console.log(data.challenges);
  // await new Promise(resolve => setTimeout(resolve, 3000))
  return (
    <div className="container p-3 my-10 mx-auto ">
      <Suspense fallback={<Loader2 />}>
        <div className="flex flex-wrap gap-8 justify-center md:justify-start">
          {data?.challenges &&
            data?.challenges.map((challenge) => (
              <ChallengeCard key={challenge.id} {...challenge} />
            ))}
        </div>
      </Suspense>
    </div>
  );
};

export default ChallengesPage;
