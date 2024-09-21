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
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { resourceInputFormSchema } from "@/schema";
import { getResourceContent } from "../_actions";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Combobox } from "@/components/ui/combo-box";
import {
  useCreatorResourceLanguages,
  useCreatorResourceTags,
  useCreatorResourceTypes,
} from "@/services/queries";
import { MultiSelect } from "@/components/ui/multi-select";
import FinalContent from "../_components/final-content";

type ResourceFetchData = {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  resourceType?: string;
  resourceTags?: string[] | undefined;
};
const ResourceCreatePage = () => {
  const router = useRouter();
  const [finalData, setFinalData] = useState<
    ResourceFetchData | null | undefined
  >(null);

  const [isLoading, setIsLoading] = useState(false);
  const { data: resourceTypes } = useCreatorResourceTypes();
  const { data: resourceTags } = useCreatorResourceTags();
  const { data: resourceLanguages } = useCreatorResourceLanguages();
  const form = useForm<z.infer<typeof resourceInputFormSchema>>({
    resolver: zodResolver(resourceInputFormSchema),
    defaultValues: {
      url: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof resourceInputFormSchema>) => {
    // console.log(values);
    setIsLoading(true);
    // console.log("URL FORMATION", `https://api.microlink.io?${values?.url}`)
    // const datas = await fetch(`https://api.microlink.io?${values?.url}`);
    // const res = await datas.json();
    // console.log(res.data);
    const response = await getResourceContent(values);
    if (response?.success) {
      toast.success(response.message);
      // console.log(response?.finalData);
      setFinalData(response?.finalData);
      //   router.push("/portal/challenges");
    } else {
      toast.error(response?.message);
      setIsLoading(false);
    }
  };
  // const handleChange = (fieldName: string, value: string) => {
  //   // console.log(fieldName)
  //   // console.log(value)
  //   setFinalData({
  //     ...finalData,
  //     [fieldName]: value || "",
  //   });
  // };

  return (
    <div className="max-w-5xl  text-white mx-auto flex flex-col md:items-center md:justify-center h-full p-6">
      <div className="w-full ">
        <h1 className="text-2xl text-center">Enter the URL</h1>
        {/* <p className="text-sm text-dark-700">
                    What would you like to name a challenge? Don&apos;t worry, you can
                    change this later.
                </p> */}
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 mt-8 w-1/2 mx-auto"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Resource URL</FormLabel>
                  <FormControl>
                    <Input
                      // disabled={isSubmitting}
                      placeholder="e.g. 'enter url'"
                      {...field}
                      className="portal-input w-full"
                    />
                  </FormControl>
                  <FormDescription>Enter a valid URL</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex items-center gap-x-2">
              <Link href="/portal/resources" aria-label="cancel">
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
      <div className="w-full space-y-2 mt-4">
        {finalData && (
          <>
            <FinalContent
              initialData={finalData}
              resourceTypes={resourceTypes?.map((resourceType: any) => ({
                label: resourceType?.name,
                value: resourceType?.id,
              }))}
              resourceTags={resourceTags?.map((resourceType: any) => ({
                label: resourceType?.name,
                value: resourceType?.id,
              }))}
              resourceLanguages={resourceLanguages?.map(
                (resourceLanguage: any) => ({
                  label: resourceLanguage?.name,
                  value: resourceLanguage?.id,
                }),
              )}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ResourceCreatePage;
