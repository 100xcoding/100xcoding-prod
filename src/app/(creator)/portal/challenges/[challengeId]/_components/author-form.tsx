"use client";

import { ChallengeAuthorSchema } from "@/schema/challenge-schema";
import { useCreatorChallengeById } from "@/services/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Challenge } from "@prisma/client";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { updateChallengeAuthorAction } from "../../_actions";

interface AuthorFormProps {
  initialData: Challenge;
  challengeId: string;
}

export const AuthorForm = ({ initialData, challengeId }: AuthorFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const { refreshCreatorChallengeData } = useCreatorChallengeById(challengeId);

  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
  const form = useForm<z.infer<typeof ChallengeAuthorSchema>>({
    resolver: zodResolver(ChallengeAuthorSchema),
    defaultValues: useMemo(
      () => ({
        authorName: initialData?.authorName || "",
        authorProfile: initialData?.authorProfile || "",
      }),
      [initialData],
    ),
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = useCallback(
    async (values: z.infer<typeof ChallengeAuthorSchema>) => {
      const response = await updateChallengeAuthorAction(values, challengeId);
      if (response?.success) {
        setIsEditing(false);
        refreshCreatorChallengeData();
        toast.success(response.message);
      } else {
        if (Array.isArray(response?.error)) {
          response.error.map((er) => toast.error(er.message));
        }
        toast.error(response?.message);
      }
    },
    [challengeId, refreshCreatorChallengeData],
  );
  return (
    <div className="mt-6  portal-form-box p-4">
      <div className="font-medium flex items-center justify-between">
        Challenge Author Details
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit author
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        <>
          <p className="text-sm mt-2">{initialData?.authorName}</p>
          <Link
            className={cn(
              "text-sm mt-2 underline block",
              !initialData?.authorProfile && "text-slate-500 italic",
            )}
            href={initialData?.authorProfile ? initialData?.authorProfile : ""}
          >
            {initialData?.authorProfile ? "Author Profile URL" : "No Profile"}
          </Link>
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
              name="authorName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. ''"
                      {...field}
                      className="portal-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="authorProfile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author Profile URL</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. ''"
                      {...field}
                      className="portal-input"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                variant={"default"}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      )}
    </div>
  );
};
