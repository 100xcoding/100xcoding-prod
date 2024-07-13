import { challengeData } from "@/constants";
import { ChallengeCard } from "./_components/challenge-card";
import { getChallenges } from "./_data-access";

const ChallengesPage = async () => {
  const data = await getChallenges();
  // console.log(data.challenges);
  return (
    <div className="container p-3 my-20 mx-auto ">
      <div className="flex flex-wrap gap-8 justify-center md:justify-start">
        {data?.challenges &&
          data?.challenges.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
      </div>
    </div>
  );
};

export default ChallengesPage;
