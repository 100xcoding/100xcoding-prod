"use client";
import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combo-box";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ChallengeCategorySchema } from "@/schema/challenge-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Quiz } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useCreatorQuizById } from "@/services/queries";
import { QuizCategorySchema } from "@/schema/quiz-schema";
import { updateQuizCategoryAction } from "../../_actions";

interface CategoryFormProps {
  initialData: Quiz;
  quizId: string;
  options: { label: string; value: string }[];
}
export const CategoryForm = ({
  initialData,
  quizId,
  options,
}: CategoryFormProps) => {
  const { refreshCreatorQuizData } = useCreatorQuizById(quizId);
  const [isEditing, setIsEditing] = useState(false);

  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);

  const form = useForm<z.infer<typeof QuizCategorySchema>>({
    resolver: zodResolver(ChallengeCategorySchema),
    defaultValues: useMemo(
      () => ({
        quizCategoryId: initialData?.quizCategoryId || "",
      }),
      [initialData],
    ),
  });
  const { control, handleSubmit } = form;
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(
    async (values: z.infer<typeof QuizCategorySchema>) => {
      const response = await updateQuizCategoryAction(values, quizId);
      if (response?.success) {
        setIsEditing(false);
        refreshCreatorQuizData();
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    },
    [quizId, refreshCreatorQuizData],
  );

  const selectedOption = useMemo(() => {
    return options?.find(
      (option) => option?.value === initialData?.quizCategoryId,
    );
  }, [options, initialData?.quizCategoryId]);
  return (
    <div className="mt-6  dark:bg-muted rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Challenge category
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit category
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <p
          className={cn(
            "text-sm mt-2 capitalize",
            !initialData?.quizCategoryId && "text-slate-500 italic",
          )}
        >
          {selectedOption?.label || "No category"}
        </p>
      )}
      {isEditing && (
        <Form {...form}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={control}
              name="quizCategoryId"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Combobox options={options} {...field} />
                  </FormControl>
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
