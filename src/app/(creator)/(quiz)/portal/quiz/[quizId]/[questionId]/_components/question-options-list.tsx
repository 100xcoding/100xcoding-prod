"use client";

import { cn } from "@/lib/utils";
import { Quiz, QuizOption } from "@prisma/client";
import { Pencil } from "lucide-react";
import { EditOption } from "./edit-option";

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
	console.log(initialData);
	return (
		<div className="mt-6 border dark:bg-muted  rounded-md p-4">
			{initialData?.map((option) => (
				<div
					className="flex items-center w-full border rounded-xl"
					key={option.id}
				>
					{/* <div
						className={cn(
							"px-2 py-3 border-r border-r-slate-200 hover:bg-slate-300 rounded-l-md transition"
						)}
					></div> */}
					<p>{option.text}</p>
					<div className="ml-auto pr-2 flex items-center gap-x-2">
						{/* <Pencil
							// onClick={() => onEdit(option.id)}
							className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
						/> */}
						<EditOption
							initialData={option}
							optionId={option.id}
						/>
					</div>
				</div>
			))}
		</div>
	);
};
