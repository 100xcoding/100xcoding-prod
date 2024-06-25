"use client";
import { Button } from "@/components/ui/button";
import { useCreatorQuizQuestionById } from "@/services/queries";
import { Quiz, QuizOption } from "@prisma/client";
import { PlusCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { createQuizQuestionOptionAction } from "../../../_actions";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { QuestionOptionsList } from "./question-options-list";
import Editor from "@/components/react-quil-editor";

interface QuestionOptionFormProps {
  initialData: Quiz & QuizOption;
  quizId: string;
  questionId: string;
}

export const QuestionOptionForm = ({
  initialData,
  quizId,
  questionId,
}: QuestionOptionFormProps) => {
  // console.log(initialData);
  const [isCreating, setIsCreating] = useState(false);
  const [content, setContent] = useState<string>("");
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };
  const { refreshCreatorQuizQuestionData } = useCreatorQuizQuestionById(
    questionId,
    quizId,
  );
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const response = await createQuizQuestionOptionAction(
        content,
        isCorrect,
        questionId,
      );
      if (response?.success) {
        setIsCreating(false);
        refreshCreatorQuizQuestionData();
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    },
    [questionId, refreshCreatorQuizQuestionData, content, isCorrect],
  );
  return (
    <div className="relative mt-6 border dark:bg-muted rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Quiz Questions
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add a option
            </>
          )}
        </Button>
      </div>
      {isCreating && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Editor value={content} setValue={setContent} />
          <div className="flex items-center space-x-2">
            <Checkbox
              id="isCorrect"
              checked={isCorrect}
              onCheckedChange={() => setIsCorrect((prev) => !prev)}
            />
            <label
              htmlFor="isCorrect"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Mark as Correct option
            </label>
          </div>
          <Button type="submit">Create</Button>
        </form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.options?.length && "text-slate-500 italic",
          )}
        >
          {!initialData?.options?.length && "No options"}
          <QuestionOptionsList
            // onEdit={onEdit}
            // onReorder={onReorder}
            quizId={quizId}
            questionId={questionId}
            initialData={initialData?.options! || []}
          />
        </div>
      )}
      {/* {!isCreating && (
				<p className="text-xs text-muted-foreground mt-4">
					Drag and drop to reorder the chapters
				</p>
			)} */}
    </div>
  );
};
