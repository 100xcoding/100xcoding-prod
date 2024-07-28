import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Solutions ",
};
import { SolutionCard } from "./_components/solution-card";
import { getChallengeSolutions } from "./_data-access";

const SolutionsPage = async () => {
  const { solutions } = await getChallengeSolutions();
  return (
    <section className="container p-3 my-10 mx-auto ">
      <div className="flex flex-wrap gap-8 justify-center md:justify-start">
        {solutions &&
          solutions.map((solution) => (
            <SolutionCard key={solution.id} {...solution} />
          ))}
      </div>
    </section>
  );
};

export default SolutionsPage;
