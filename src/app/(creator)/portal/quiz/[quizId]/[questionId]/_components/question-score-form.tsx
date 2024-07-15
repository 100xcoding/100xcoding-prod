"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { QuizQuestionScoreSchema } from "@/schema/quiz-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateQuizQuestionScoreAction } from "../../../_actions";
import { useCreatorQuizQuestionById } from "@/services/queries";
interface QuestionScoreFormProps {
  initialData: {
    score: number;
  };
  quizId: string;
  questionId: string;
}
export const QuestionScoreForm = ({
  initialData,
  quizId,
  questionId,
}: QuestionScoreFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
  const { refreshCreatorQuizQuestionData } = useCreatorQuizQuestionById(
    questionId,
    quizId,
  );
  const defaultValues = useMemo(
    () => ({
      score: initialData?.score ?? 1,
    }),
    [initialData],
  );
  const form = useForm<z.infer<typeof QuizQuestionScoreSchema>>({
    resolver: zodResolver(QuizQuestionScoreSchema),
    defaultValues,
  });
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(
    async (values: z.infer<typeof QuizQuestionScoreSchema>) => {
      const response = await updateQuizQuestionScoreAction(
        values,
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
    [questionId, refreshCreatorQuizQuestionData, quizId],
  );
  return (
    <div className="mt-6 portal-form-box p-4">
      <div className="font-medium flex items-center justify-between tracking-wide">
        Question score
        <Button onClick={toggleEdit} variant="ghost" className="cursor-pointer">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit duration
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p className="text-sm mt-2">{initialData?.score}</p>
        </>
      )}
      {isEditing && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      className="portal-input"
                      placeholder="e.g. '1'"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>Enter Score at least 1</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
