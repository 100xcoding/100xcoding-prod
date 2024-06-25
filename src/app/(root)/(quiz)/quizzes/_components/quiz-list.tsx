import { QuizCard } from "./quiz-card";

export const QuizList = () => {
  return (
    <div className="flex w-full items-center gap-10 flex-wrap justify-start lg:justify-center">
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
      <QuizCard />
    </div>
  );
};
