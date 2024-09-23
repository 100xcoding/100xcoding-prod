import React from "react";
import { QuizList } from "./_components/quiz-list";
import { QuizCategories } from "./_components/quiz-categories";
const items = [
  {
    id: "123",
    name: "Javascript",
  },
];
const QuizPage = () => {
  return (
    <div className="py-10 container mx-auto text-white">
      {/* <div className=" my-4">
        <QuizCategories items={items} />
      </div>
      <QuizList /> */}
      <h2 className="text-green-500 font-bold text-4xl tracking-wider text-center">
        Prepare Yourself! <br /> Exciting New Quizzes Are Just Around the
        Corner!
      </h2>
    </div>
  );
};

export default QuizPage;
