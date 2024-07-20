"use client";
import { Button } from "@/components/ui/button";
import { DialogTrigger } from "@/components/ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProfileFormSchema } from "@/schema";
import { updateProfile } from "../_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
interface Profile {
  id: string;
  userId: string;
  title: string | null;
  bio: string | null;
  website: string | null;
  profileImage: string | null;
  resume: string | null;
}
interface User {
  id: string;
  name: string | null;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  username: string;
  role: string; // Assuming these are the possible roles
  createdAt: Date;
  updatedAt: Date | null;
  profile: Profile | null;
}
interface EditProfileForm {
  initialData: User | undefined;
}
export const EditProfileForm = ({ initialData }: EditProfileForm) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof ProfileFormSchema>>({
    resolver: zodResolver(ProfileFormSchema),
    defaultValues: {
      email: initialData?.email || "",
      name: initialData?.name || "",
      username: initialData?.username,
      title: initialData?.profile?.title || "",
      website: initialData?.profile?.website || "",
      bio: initialData?.profile?.bio || "",
    },
  });
  const onSubmit = async (data: z.infer<typeof ProfileFormSchema>) => {
    const result = await updateProfile(data);
    // console.log(result);
    if (result.success) {
      router.refresh();
      toast.success("Update Successfully!");
    } else {
      toast.error(result?.err);
    }
  };
  const { isSubmitting, isValid } = form.formState;
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="e.g. 'John Doe'"
                  {...field}
                  className="portal-input"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Tag Line</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="e.g. ''"
                  {...field}
                  className="portal-input"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>About me</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isSubmitting}
                  placeholder="e.g. ''"
                  {...field}
                  className="portal-input"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="website"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Website</FormLabel>
              <FormControl>
                <Input
                  disabled={isSubmitting}
                  placeholder="e.g. ''"
                  {...field}
                  className="portal-input"
                />
              </FormControl>
            </FormItem>
          )}
        />
        <DialogTrigger asChild>
          <Button type="submit" className="w-full">
            Save changes
          </Button>
        </DialogTrigger>
      </form>
    </Form>
  );
};
