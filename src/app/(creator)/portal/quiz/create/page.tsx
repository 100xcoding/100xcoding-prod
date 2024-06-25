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
import { z } from "zod";
import Link from "next/link";
import React from "react";
import { toast } from "sonner";
import { CreateQuizSchema } from "@/schema/quiz-schema";
import { createQuizAction } from "../_actions";

const CreateQuizPage = () => {
  const form = useForm<z.infer<typeof CreateQuizSchema>>({
    resolver: zodResolver(CreateQuizSchema),
    defaultValues: {
      title: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof CreateQuizSchema>) => {
    // console.log(values);
    const response = await createQuizAction(values);
    if (response?.success) {
      toast.success(response.message);
    } else {
      if (Array.isArray(response?.error)) {
        response.error.map((er) => toast.error(er.message));
      }
      toast.error(response?.message);
    }
  };
  return (
    <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
      <div>
        <h1 className="text-2xl">Name the quiz</h1>
        <p className="text-sm text-slate-600">
          What would you like to name a quiz? Don&apos;t worry, you can change
          this later.
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
                  <FormLabel>Quiz title</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isSubmitting}
                      placeholder="e.g. 'javascript array quiz '"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Title at least contains 10 characters!
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex items-center gap-x-2">
              <Link href="/">
                <Button type="button" variant="ghost">
                  Cancel
                </Button>
              </Link>
              <Button
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

export default CreateQuizPage;
