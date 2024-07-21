"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
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
import { SocialLinkFormSchema } from "@/schema";
import { addSocialLink } from "../_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { SocialLink } from "@prisma/client";

interface SocialModalProps {
  initialData: SocialLink | undefined | null;
}
export const SocialModal = ({ initialData }: SocialModalProps) => {
  // console.log(socialLinkTypes);
  const router = useRouter();
  const form = useForm<z.infer<typeof SocialLinkFormSchema>>({
    resolver: zodResolver(SocialLinkFormSchema),
    defaultValues: {
      github: initialData?.github || undefined,
      twitter: initialData?.twitter || undefined,
      instagram: initialData?.instagram || undefined,
      youtube: initialData?.youtube || undefined,
      medium: initialData?.medium || undefined,
      threads: initialData?.threads || undefined,
      leetcode: initialData?.leetcode || undefined,
      gfg: initialData?.gfg || undefined,
      codechef: initialData?.codechef || undefined,
      codeforces: initialData?.codeforces || undefined,
      linkedIn: initialData?.linkedIn || undefined,
    },
  });
  const onSubmit = async (data: z.infer<typeof SocialLinkFormSchema>) => {
    const result = await addSocialLink(data);
    console.log(result);
    if (result.success) {
      router.refresh();
      toast.success("Added Successfully!");
    } else {
      toast.error(result.err);
    }
  };
  const { isSubmitting, isValid } = form.formState;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          className="text-green-500  border-green-500 rounded-full"
        >
          Add Social Links
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px] md:max-w-[625px] bg-dark-200 text-white border-none remove-scrollbar overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle>Add Social Links</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <FormField
                  control={form.control}
                  name="github"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Github URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g 'https://github.com/techysiddhant' "
                          className="profile-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="twitter"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">X URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g  "
                          className="profile-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="instagram"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Instagram URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g  "
                          className="profile-input"
                          // className="profile-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="youtube"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Youtube URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g  "
                          className="profile-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="medium"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Medium URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g  "
                          className="profile-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="threads"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">Threads URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g  "
                          className="profile-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="leetcode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">LeetCode URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g  "
                          className="profile-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="gfg"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">GFG URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g  "
                          className="profile-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="codechef"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">CodeChef URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g  "
                          className="profile-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="codeforces"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">
                        CodeForces URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g  "
                          className="profile-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="linkedIn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base">linkedIn URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g  "
                          className="profile-input"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogTrigger asChild>
                <Button type="submit">Save changes</Button>
              </DialogTrigger>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
