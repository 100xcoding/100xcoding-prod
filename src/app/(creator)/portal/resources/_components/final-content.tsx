"use client";
import { Button } from "@/components/ui/button";
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
import { resourceDataFormSchema } from "@/schema";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { Combobox } from "@/components/ui/combo-box";
import MultipleSelector from "@/components/ui/multiple-selector";
import { addResource } from "../_actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type ResourceFetchData = {
  title?: string;
  description?: string;
  url?: string;
  imageUrl?: string;
  resourceType?: string;
  resourceTags?: string[] | undefined;
};
type FinalContentProps = {
  initialData: ResourceFetchData;
  resourceTypes: { label: string; value: string }[];
  resourceTags: { label: string; value: string }[];
  resourceLanguages: { label: string; value: string }[];
};
const FinalContent = ({
  initialData,
  resourceTypes,
  resourceTags,
  resourceLanguages,
}: FinalContentProps) => {
  const saveForm = useForm<z.infer<typeof resourceDataFormSchema>>({
    resolver: zodResolver(resourceDataFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      url: initialData?.url ?? "",
      description: initialData?.description ?? "",
      imageUrl: initialData?.imageUrl ?? "",
    },
  });
  const { reset } = saveForm;
  const router = useRouter();
  async function onSubmitResource(
    data: z.infer<typeof resourceDataFormSchema>,
  ) {
    // await getResourceContent(data);
    // console.log(data);
    const result = await addResource(data);
    // console.log(result);
    if (result?.success) {
      toast.success("Resource added successfully!");
      reset({
        title: "",
        url: "",
        description: "",
        imageUrl: "",
        resourceType: "",
        resourceTags: [],
        resourceLanguage: "",
      });
      router.refresh();
      router.push("/portal/resources");
    } else {
      toast.error("Something went wrong!");
    }
  }
  return (
    <div className="w-full mt-4">
      <Form {...saveForm}>
        <form
          onSubmit={saveForm.handleSubmit(onSubmitResource)}
          className="w-full flex flex-col items-center justify-between gap-4 px-4 "
        >
          <div className="w-full flex justify-between gap-4 ">
            <FormField
              control={saveForm.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Enter Title</FormLabel>
                  <FormControl>
                    <Input
                      className="portal-input "
                      placeholder="enter title"
                      {...field}
                    />
                  </FormControl>
                  {/* <FormDescription>
                                            Enter valid URL.
                                        </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={saveForm.control}
              name="url"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Enter URL</FormLabel>
                  <FormControl>
                    <Input
                      className="portal-input "
                      placeholder="enter url"
                      readOnly
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={saveForm.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Enter Description</FormLabel>
                <FormControl>
                  <Textarea
                    className="portal-input "
                    placeholder="enter description"
                    {...field}
                  />
                </FormControl>
                {/* <FormDescription>
                                            Enter valid URL.
                                        </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={saveForm.control}
            name="resourceType"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Select Type</FormLabel>
                <FormControl>
                  {/* <Input
                                        className="portal-input border w-[400px]"
                                        placeholder="enter url"
                                        {...field}
                                    /> */}
                  <Combobox
                    options={resourceTypes}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={saveForm.control}
            name="resourceLanguage"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Select Language</FormLabel>
                <FormControl>
                  {/* <Input
                                        className="portal-input border w-[400px]"
                                        placeholder="enter url"
                                        {...field}
                                    /> */}
                  <Combobox
                    options={resourceLanguages}
                    value={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={saveForm.control}
            name="resourceTags"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Select Tags</FormLabel>
                <FormControl>
                  {/* <Input
                                        className="portal-input border w-[400px]"
                                        placeholder="enter url"
                                        {...field}
                                    /> */}
                  <MultipleSelector
                    defaultOptions={resourceTags}
                    {...field}
                    placeholder="Select frameworks you like..."
                  />
                  {/* <MultiSelect placeholder="Select options" variant={'default'} options={resourceTags} onValueChange={field.onChange} defaultValue={[]} /> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={saveForm.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                {/* <FormLabel>Enter URL</FormLabel> */}
                <FormControl>
                  {/* <Input hidden className="portal-input border w-[400px]" placeholder="enter title" {...field} /> */}
                  <Image
                    src={field.value}
                    alt="thumbnail"
                    width={"500"}
                    height={"500"}
                  />
                </FormControl>
                {/* <FormDescription>
                                            Enter valid URL.
                                        </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-6">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default FinalContent;
