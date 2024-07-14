import { challengeData } from "@/constants";
import { ChallengeCard } from "./_components/challenge-card";
import { getChallenges } from "./_data-access";

const ChallengesPage = async () => {
  const data = await getChallenges();
  // console.log(data.challenges);
  return (
    <div className="container p-3 my-10 mx-auto ">
      <div className="flex flex-wrap gap-8 justify-center md:justify-start">
        {data?.challenges &&
          data?.challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        {/* <div className="flex flex-1 flex-col gap-6 rounded-2xl bg-cover p-6 shadow-lg bg-card w-[300px] h-[200px]">

        </div> */}
      </div>
    </div>
  );
};

export default ChallengesPage;
