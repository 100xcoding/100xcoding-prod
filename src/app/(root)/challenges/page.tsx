import { challengeData } from "@/constants";
import { ChallengeCard } from "./_components/challenge-card";

const ChallengesPage = () => {
  return (
    <div className="container p-3 my-20 mx-auto ">
      {/* <iframe
        loading="lazy"
        className="h-[600px]  w-full  overflow-hidden"
        src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FMVzrLHy5cA3kX9zdnUaKMT%2FDeveloper-Portfolio-Design-(Community)%3Fnode-id%3D0-1%26t%3D6uHjKfpW3Gee14ZB-1"
      ></iframe> */}
      <div className="flex justify-center">
        <div className="flex flex-wrap gap-8">
          {challengeData.map((challenge) => (
            <ChallengeCard key={challenge.id} {...challenge} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChallengesPage;
