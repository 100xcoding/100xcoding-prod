"use client";

import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { getResourceContent } from "../_actions";
const FormSchema = z.object({
  url: z.string().url(),
});
export const AddResourceModal = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      url: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    await getResourceContent(data);
    console.log(data);
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">Add Resource</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-dark-200 text-white border-none">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when .
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className="portal-input"
                      placeholder="shadcn"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        {/* <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
