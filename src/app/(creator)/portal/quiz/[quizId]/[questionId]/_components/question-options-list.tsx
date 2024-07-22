"use client";

import { cn } from "@/lib/utils";
import { Quiz, QuizOption } from "@prisma/client";
import { Pencil } from "lucide-react";
import { EditOption } from "./edit-option";
import parse from "html-react-parser";

interface QuestionOptionsListProps {
  initialData: QuizOption[];
  quizId: string;
  questionId: string;
}
export const QuestionOptionsList = ({
  initialData,
  quizId,
  questionId,
}: QuestionOptionsListProps) => {
  const onEdit = (id: string) => {};
  // console.log(initialData);
  return (
    <div className="mt-6 portal-form-box p-4 space-y-3">
      {initialData?.map((option) => (
        <div className="flex items-center w-full  rounded-xl" key={option.id}>
          {/* <div
						className={cn(
							"px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
						)}
					></div> */}
          <div className="prose prose-a:text-green-500 prose-headings:text-white text-white ">
            {parse(option?.text || "")}
          </div>
          <div className="ml-auto pr-2 flex items-center gap-x-2">
            {/* <Pencil
							// onClick={() => onEdit(option.id)}
							className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
						/> */}
            <EditOption initialData={option} optionId={option.id} />
          </div>
        </div>
      ))}
    </div>
  );
};
