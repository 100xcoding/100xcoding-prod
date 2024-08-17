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
  const form = useForm<z.infer<typeof resourceInputFormSchema>>({
    resolver: zodResolver(resourceInputFormSchema),
    defaultValues: {
      url: "",
    },
  });
  const onSubmit = async (values: z.infer<typeof resourceInputFormSchema>) => {
    // console.log(values);
    setIsLoading(true);
    const response = await getResourceContent(values);
    if (response?.success) {
      toast.success(response.message);
      console.log(response?.finalData);
      setFinalData(response?.finalData);
      //   router.push("/portal/challenges");
    } else {
      toast.error(response?.message);
      setIsLoading(false);
    }
  };
  const handleChange = (fieldName: string, value: string) => {
    // console.log(fieldName)
    // console.log(value)
    setFinalData({
      ...finalData,
      [fieldName]: value || "",
    });
  };
  // const handleTest = (values: string[]) => {
  //   // console.log(values);
  //   setResourceTags(prev => {
  //     const combinedValues = [...prev, ...values];
  //     // Use a Set to eliminate duplicates and convert it back to an array
  //     return Array.from(new Set(combinedValues));
  //   });
  // };
  // console.log(resourceTags);
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
            />
            {/* <div className="flex w-full items-center gap-2 justify-between">
              <Input
                className="portal-input"
                value={finalData?.title}
                onChange={(e) => handleChange("title", e.target.value)}
              />
              <Input value={finalData?.url} className="portal-input" readOnly />
            </div> */}
            {/* <Textarea
              className="portal-input"
              value={finalData?.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <Combobox options={resourceTypes?.map((resourceType: any) => (
              {
                label: resourceType?.name,
                value: resourceType?.id
              }
            ))} onChange={(selected) => handleChange("resourceType", selected)} value={finalData?.resourceType} />
            <MultiSelect options={resourceTypes?.map((resourceType: any) => (
              {
                label: resourceType?.name,
                value: resourceType?.id
              }
            ))} defaultValue={[]} onValueChange={(value) => handleTest(value)} />
            <Image
              src={finalData?.imageUrl!}
              alt="thumbnail"
              width="500"
              height="500"
            /> */}
          </>
        )}
      </div>
    </div>
  );
};

export default ResourceCreatePage;
