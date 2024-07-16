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
import { Textarea } from "@/components/ui/textarea";
import { ChallengeSolutionCommentSchema } from "@/schema/challenge-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { AddSolutionFeedback, updateSolutionFeedback } from "../_actions";
import { toast } from "sonner";
import { CommentList } from "./comment-list";
import { Comment } from "@prisma/client";
import { useRouter } from "next/navigation";
import { DialogTrigger } from "@/components/ui/dialog";
interface CommentFormProps extends Comment {
  user: {
    username: string;
    image?: string;
  };
}
interface CommentFormProps {
  slug: string;
  initialData?: Comment;
  edit?: boolean;
}
export const CommentForm = ({ slug, initialData, edit }: CommentFormProps) => {
  const form = useForm<z.infer<typeof ChallengeSolutionCommentSchema>>({
    resolver: zodResolver(ChallengeSolutionCommentSchema),
    defaultValues: useMemo(
      () => ({
        content: initialData?.content || "",
      }),
      [initialData],
    ),
  });
  const router = useRouter();
  const { isSubmitting, isValid } = form.formState;
  const onSubmit = useCallback(
    async (values: z.infer<typeof ChallengeSolutionCommentSchema>) => {
      if (edit) {
        const response = await updateSolutionFeedback(values, initialData?.id!);
        if (response?.success) {
          toast.success(response.message);
          router.refresh();
        } else {
          toast.error(response?.message);
        }
      } else {
        const response = await AddSolutionFeedback(values, slug);
        if (response?.success) {
          router.refresh();
          toast.success(response.message);
        } else {
          toast.error(response?.message);
        }
      }
    },
    [slug, edit, initialData, router],
  );
  return (
    <div className="">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea
                    disabled={isSubmitting}
                    placeholder="e.g. 'This challenge is about...'"
                    {...field}
                    className="portal-input"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center gap-x-2">
            {!edit && (
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant={"default"}
              >
                Add
              </Button>
            )}
            {edit && (
              <DialogTrigger asChild>
                <Button
                  disabled={!isValid || isSubmitting}
                  type="submit"
                  variant={"default"}
                >
                  Save Changes
                </Button>
              </DialogTrigger>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
