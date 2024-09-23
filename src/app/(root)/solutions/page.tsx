import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Solutions ",
};
import { SolutionCard } from "./_components/solution-card";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
async function getChallengeSolutions() {
  try {
    const solutions = await db.challengeSolution.findMany({
      where: {
        status: true,
      },
      include: {
        challenge: {
          include: {
            challengeCategory: true,
          },
        },
        user: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
    return {
      success: true,
      solutions,
    };
  } catch (error) {
    return {
      success: false,
      err: getErrorMessage(error),
      message: "Something went wrong",
    };
  }
}
const SolutionsPage = async () => {
  const { solutions } = await getChallengeSolutions();
  return (
    <section className="container p-3 my-10 mx-auto ">
      <div className="flex flex-wrap gap-8 justify-center md:justify-start">
        {solutions &&
          solutions.map((solution) => (
            <SolutionCard key={solution.id} {...solution} />
          ))}
        {solutions && solutions.length <= 0 && (
          <h2 className="text-center font-heading mx-auto m-10 text-2xl sm:text-xl lg:text-3xl   font-black	 ">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              {
                "Be the First to Break Ground: Publish Your First Solution and Lead the Way!"
              }
            </span>
            <span className="">🚀</span>
          </h2>
        )}
      </div>
    </section>
  );
};

export default SolutionsPage;
