"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { magicLinkSignIn } from "@/actions/auth";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
const formSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: "Email is required!",
    })
    .email("Email is not valid"),
});
type FormSchema = z.infer<typeof formSchema>;
export function MagicSignIn() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const formData = new FormData();
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key as keyof FormSchema]);
    });
    await magicLinkSignIn(formData);
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-base ">Email</FormLabel>
              <FormControl>
                <Input
                  className="bg-dark-400 ring-offset-green-500  focus-visible:ring-green-500 border-none py-6 text-base"
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          aria-label="Log in using magic link"
          type="submit"
          disabled={isLoading}
          className="w-full tracking-wider font-poppins  capitalize py-6 text-base"
        >
          {isLoading ? (
            <ClipLoader color="#ffffff" />
          ) : (
            "Log in using magic link"
          )}
        </Button>
      </form>
    </Form>
  );
}
