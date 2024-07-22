"use client";
import Editor from "@/components/react-quil-editor";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { QuizOption } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { updateQuizQuestionOptionAction } from "../../../_actions";
import { useCreatorQuizQuestionById } from "@/services/queries";
import { Button } from "@/components/ui/button";
interface EditOptionProps {
  initialData: QuizOption;
  optionId: string;
  questionId?: string;
}
export const EditOption = ({
  initialData,
  optionId,
  questionId,
}: EditOptionProps) => {
  const [content, setContent] = useState<string>(initialData?.text || "");
  const [isCorrect, setIsCorrect] = useState<boolean>(
    initialData?.isCorrect || false,
  );
  // const { refreshCreatorQuizQuestionData } = useCreatorQuizQuestionById(
  // 	questionId,
  // 	quizId
  // );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      console.log(content);
      const response = await updateQuizQuestionOptionAction(
        content,
        isCorrect,
        optionId,
      );
      if (response?.success) {
        setContent("");
        // setIsCreating(false);
        // refreshCreatorQuizQuestionData();
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    },
    [optionId, content, isCorrect],
  );
  useEffect(() => {
    setContent(initialData?.text || "");
    setIsCorrect(initialData?.isCorrect || false);
  }, [initialData]);
  return (
    <Dialog>
      <DialogTrigger className="bg-blue-600 text-blue-500 px-6 py-2 rounded-full">
        Open
      </DialogTrigger>
      <DialogContent className="portal-form-box">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <Editor setValue={setContent} value={content} />
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
          <DialogDescription></DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
