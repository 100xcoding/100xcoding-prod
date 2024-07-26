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
import { getSlug } from "@/lib/utils";
import { CreateChallengeSchema } from "@/schema/challenge-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { updateTitleChallengeAction } from "../../_actions";
import { toast } from "sonner";
import { useCreatorChallengeById } from "@/services/queries";

interface TitleFormProps {
  initialData: {
    title: string;
    slug: string;
  };
  challengeId: string;
}
export const TitleForm = ({ initialData, challengeId }: TitleFormProps) => {
  const { refreshCreatorChallengeData } = useCreatorChallengeById(challengeId);
  const [isEditing, setIsEditing] = useState(false);
  const [slug, setSlug] = useState(initialData?.slug);
  const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);

  const router = useRouter();

  const form = useForm<z.infer<typeof CreateChallengeSchema>>({
    resolver: zodResolver(CreateChallengeSchema),
    defaultValues: useMemo(
      () => ({
        title: initialData?.title || "",
        slug: initialData?.slug || "",
      }),
      [initialData],
    ),
  });
  const title = form.watch("title");
  useEffect(() => {
    if (isEditing) {
      const newSlug = getSlug(title);
      setSlug(newSlug); // Set slug state directly
    }
  }, [title, isEditing]);
  const { isSubmitting, isValid } = form.formState;
  // console.log(initialData);
  useEffect(() => {
    // Initialize form values from initialData when editing starts
    if (isEditing) {
      form.reset({
        title: initialData?.title,
        slug: initialData?.slug,
      });
      setSlug(initialData?.slug);
    }
  }, [isEditing, initialData, form]);
  const onSubmit = useCallback(
    async (values: z.infer<typeof CreateChallengeSchema>) => {
      values.slug = slug;
      const response = await updateTitleChallengeAction(values, challengeId);
      if (response?.success) {
        setIsEditing(false);
        refreshCreatorChallengeData();
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    },
    [slug, challengeId, refreshCreatorChallengeData],
  );
  return (
    <div className="mt-6  portal-form-box p-4">
      <div className="font-medium flex items-center justify-between tracking-wide">
        Challenge title & slug
        <Button
          onClick={toggleEdit}
          variant="ghost"
          className="cursor-pointer"
          aria-label="edit title"
        >
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
        <>
          <p className="text-sm mt-2">{initialData?.title}</p>
          {/* <p className="text-sm mt-2">{initialData?.slug}</p> */}
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
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Advanced web development'"
                      {...field}
                      className="portal-input"
                    />
                  </FormControl>
                  <FormDescription>
                    Title at least contains 10 characters!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
							control={form.control}
							name="slug"
							render={({ field }) => (
								
							)}
						/> */}
            <FormItem>
              <FormLabel>Title Slug</FormLabel>
              <FormControl>
                <Input
                  readOnly
                  disabled
                  // disabled={isSubmitting}
                  placeholder="e.g. 'create-review-component'"
                  // {...field}
                  value={slug}
                  className="portal-input"
                />
              </FormControl>
              <FormDescription>
                Slug is auto generate based on your title.
              </FormDescription>
              <FormMessage />
            </FormItem>
            <div className="flex items-center gap-x-2">
              <Button
                disabled={!isValid || isSubmitting}
                type="submit"
                aria-label="save"
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
