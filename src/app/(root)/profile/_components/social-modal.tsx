"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getSocialTypes } from "../_data-access";
// import { SocialLinkType } from "@prisma/client";
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
import { Combobox } from "@/components/ui/combo-box";
import { SocialLinkModalSchema } from "@/schema";
import { addSocialLink } from "@/actions/update-profile-action";
type SocialLinkType = {
  label: string;
  value: string;
};
interface SocialModalProps {
  socialLinkTypes: SocialLinkType[] | undefined;
}
export const SocialModal = ({ socialLinkTypes }: SocialModalProps) => {
  // console.log(socialLinkTypes);
  const form = useForm<z.infer<typeof SocialLinkModalSchema>>({
    resolver: zodResolver(SocialLinkModalSchema),
  });
  const onSubmit = async (data: z.infer<typeof SocialLinkModalSchema>) => {
    const result = await addSocialLink(data);
    // console.log(result);
  };
  const { isSubmitting, isValid } = form.formState;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full">Add Social Links</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-dark-200 text-white border-none">
        <DialogHeader>
          <DialogTitle>Add Social Links</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="socialLinkId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Select Social Platform</FormLabel>
                    <FormControl>
                      <Combobox options={socialLinkTypes || []} {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="socialLink"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter URL</FormLabel>
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
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </div>
        {/* <DialogFooter>
                    <Button type="submit">Save changes</Button>
                </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};
