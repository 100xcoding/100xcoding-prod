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
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useCreatorQuizById } from "@/services/queries";
import { QuizDurationSchema } from "@/schema/quiz-schema";
import { updateQuizDurationAction } from "../../_actions";
import { Quiz } from "@prisma/client";

interface DurationFormProps {
  initialData: Quiz;
  quizId: string;
}
export const DurationForm = ({ initialData, quizId }: DurationFormProps) => {
  const { refreshCreatorQuizData } = useCreatorQuizById(quizId);
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
  const defaultValues = useMemo(
    () => ({
      duration: initialData?.duration ?? 1,
    }),
    [initialData],
  );
  const form = useForm<z.infer<typeof QuizDurationSchema>>({
    resolver: zodResolver(QuizDurationSchema),
    defaultValues,
  });
  useEffect(() => {
    form.reset(defaultValues);
  }, [defaultValues, form]);
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(
    async (values: z.infer<typeof QuizDurationSchema>) => {
      const response = await updateQuizDurationAction(values, quizId);
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
  return (
    <div className="mt-6  dark:bg-muted rounded-md p-4">
      <div className="font-medium flex items-center justify-between tracking-wide">
        Quiz duration
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
          <p className="text-sm mt-2">{initialData?.duration}</p>
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
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Duration</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting}
                      placeholder="e.g. '1'"
                      {...field}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter Duration in minutes, and at least 1 min
                  </FormDescription>
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
