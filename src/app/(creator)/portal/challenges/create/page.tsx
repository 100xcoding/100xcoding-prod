"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormLabel,
  FormMessage,
  FormItem,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateChallengeSchema } from "@/schema/challenge-schema";
import { z } from "zod";
import Link from "next/link";
import React from "react";
import { getSlug } from "@/lib/utils";
import { createChallengeAction } from "../_actions";
import { toast } from "sonner";
import { redirect, useRouter } from "next/navigation";
const CreateChallenge = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof CreateChallengeSchema>>({
    resolver: zodResolver(CreateChallengeSchema),
    defaultValues: {
      title: "",
      slug: "",
    },
  });
  const title = form.watch("title");

  React.useEffect(() => {
    const newSlug = getSlug(title);
    form.setValue("slug", newSlug);

    return () => {
      form.setValue("slug", "");
    };
  }, [title, form]);
  const onSubmit = async (values: z.infer<typeof CreateChallengeSchema>) => {
    // console.log(values);
    const response = await createChallengeAction(values);
    if (response?.success) {
      toast.success(response.message);
      router.push("/portal/challenges");
    } else {
      toast.error(response?.message);
    }
  };
  return (
    <div className="max-w-5xl text-white mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name the challenge</h1>
        <p className="text-sm text-dark-700">
          What would you like to name a challenge? Don&apos;t worry, you can
          change this later.
        </p>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course title</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isSubmitting}
                      placeholder="e.g. 'Create review component'"
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
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title Slug</FormLabel>
                  <FormControl>
                    <Input
                      readOnly
                      className="portal-input"
                      // disabled={isSubmitting}
                      placeholder="e.g. 'create-review-component'"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Slug is auto generate based on your title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/portal/challenges" aria-label="cancel">
                <Button type="button" variant="ghost" aria-label="cancel">
                  Cancel
                </Button>
              </Link>
              <Button
                aria-label="continue"
                type="submit"
                // disabled={isSubmitting}
              >
                Continue
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateChallenge;
