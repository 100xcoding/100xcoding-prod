import { Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export const QuizCard = () => {
  return (
    <div className="p-4 bg-card bg-cover shadow-lg  border-none rounded-2xl max-w-[360px] w-full space-y-4 ">
      <div className="">
        <Image
          src="https://images.unsplash.com/photo-1580894908361-967195033215?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          width={"500"}
          height={500}
          alt="quiz-image"
          className="rounded-xl"
        />
      </div>
      <div className="space-y-3 px-1">
        <p className="bg-green-600 rounded-full text-green-400 w-fit px-4 py-2  text-xs xl:text-sm  font-semibold leading-[16px] uppercase tracking-widest">
          javscript
        </p>
        <h2 className="capitalize  tracking-wider text-xl md:text-2xl lg:text-3xl font-bold">
          JavaScript Quiz
        </h2>
        <p className="text-sm tracking-wide font-medium text-dark-700">
          Our JavaScript MCQ quiz is designed to challenge and educate, making
          it an ideal platform for developers of all levels.
        </p>
        <h4 className="w-full flex items-center justify-between text-dark-700">
          Question count <span className="">10</span>
        </h4>
        <h5 className="w-full flex items-center justify-between text-dark-700">
          Max Score <span>100</span>
        </h5>
        <h5 className="w-full flex items-center justify-between text-dark-700">
          Duration <span>10 mins</span>
        </h5>
        <div className="flex items-center justify-between">
          <p>89+ members completed</p>
          <Link href="/">
            <Play className="bg-green-500  rounded-full p-2 w-10 h-10" />
          </Link>
        </div>
      </div>
    </div>
  );
};
