"use client";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { useCallback, useState } from "react";
import { updateQuizQuestionTitleAction } from "../../../_actions";
import { useCreatorQuizQuestionById } from "@/services/queries";
import { toast } from "sonner";
import Editor from "@/components/react-quil-editor";
import parse from "html-react-parser";

interface QuestionTitleFormProps {
  initialData: {
    text: string;
  };
  quizId: string;
  questionId: string;
}
export const QuestionTitleForm = ({
  initialData,
  quizId,
  questionId,
}: QuestionTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
  const [content, setContent] = useState<string>("");
  const { refreshCreatorQuizQuestionData } = useCreatorQuizQuestionById(
    questionId,
    quizId,
  );
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const response = await updateQuizQuestionTitleAction(
        content,
        quizId,
        questionId,
      );
      if (response?.success) {
        setIsEditing(false);
        refreshCreatorQuizQuestionData();
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    },
    [refreshCreatorQuizQuestionData, questionId, content, quizId],
  );
  return (
    <div className="mt-6 portal-form-box p-4">
      <div className="font-medium flex items-center justify-between">
        Question text
        <Button onClick={toggleEdit} variant="ghost" aria-label="edit title">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit title
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <div className="text-sm mt-2">
          <div className="prose prose-a:text-green-500 prose-headings:text-white text-white ">
            {parse(initialData?.text || "")}
          </div>
        </div>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <Editor value={content} setValue={setContent} />
          <Button type="submit" aria-label="create">
            Create
          </Button>
        </form>
      )}
    </div>
  );
};
