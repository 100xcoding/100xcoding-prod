"use client";
import { Button } from "@/components/ui/button";
import { useCreatorQuizQuestionById } from "@/services/queries";
import { PlusCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { createQuizQuestionOptionAction } from "../../../_actions";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { QuestionOptionsList } from "./question-options-list";
import Editor from "@/components/react-quil-editor";
import { Quiz, QuizQuestion, QuizOption } from "@prisma/client";
// interface QuizOption {
//   id: string;
//   text: string;
//   isCorrect: boolean;
//   questionId: string;
// }

// interface QuizQuestion {
//   id: string;
//   text: string;
//   quizId: string;
//   creatorId: string;
//   options: QuizOption[];
//   score?: number;
//   position?: number;
// }

// interface Quiz {
//   id: string;
//   title: string;
//   description: string | null;
//   creatorId: string;
//   duration: number | null;
//   quizCategoryId: string | null;
//   image: string | null;
//   createdAt: Date;
//   updatedAt: Date;
//   isPublished: boolean;
// }
// interface InitialData {
//   quiz: Quiz;
//   question: QuizQuestion;
// }
// interface QuestionOptionFormProps {
//   initialData: InitialData;
//   quizId: string;
//   questionId: string;
// }
type QuizWithQuestions = Quiz & {
  questions: (QuizQuestion & {
    options: QuizOption[];
  })[];
};

interface QuestionOptionFormProps {
  initialData: QuizWithQuestions;
  quizId: string;
  questionId: string;
}
export const QuestionOptionForm = ({
  initialData,
  quizId,
  questionId,
}: QuestionOptionFormProps) => {
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
    <div className="relative mt-6 portal-form-box p-4">
      <div className="font-medium flex items-center justify-between">
        Quiz Questions
        <Button onClick={toggleCreating} aria-label="add a option">
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
          <Button type="submit" aria-label="create">
            Create
          </Button>
        </form>
      )}
      {!isCreating && (
        <div
          className={cn(
            "text-sm mt-2",
            !initialData?.questions?.[0]?.options?.length &&
              "text-slate-500 italic",
          )}
        >
          {!initialData?.questions?.[0]?.options?.length && "No options"}
          <QuestionOptionsList
            // onEdit={onEdit}
            // onReorder={onReorder}
            quizId={quizId}
            questionId={questionId}
            initialData={initialData?.questions?.[0]?.options || []}
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
