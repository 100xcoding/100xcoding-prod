"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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
import { resourceDataFormSchema, resourceInputFormSchema } from "@/schema";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useEffect, useState } from "react";
export const SaveResource = ({ initialData, isLoading }: any) => {
  const [toggle, setToggle] = useState(false);
  console.log(initialData);
  const saveForm = useForm<z.infer<typeof resourceDataFormSchema>>({
    resolver: zodResolver(resourceDataFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      url: initialData?.url ?? "",
      imageUrl: initialData?.images[0] ?? "",
    },
  });
  async function onSubmitResource(
    data: z.infer<typeof resourceDataFormSchema>,
  ) {
    // await getResourceContent(data);
    console.log(data);
  }
  useEffect(() => {}, [initialData]);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="default">Open</Button>
      </SheetTrigger>
      <SheetContent className="bg-dark-200 text-white border-none w-[400px] sm:max-w-[740px] sm:min-w-[50%]">
        <SheetHeader>
          <SheetTitle>Add Resource</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. Click save when
          </SheetDescription>
        </SheetHeader>
        {isLoading && <div>Loading...</div>}
        {!isLoading && (
          <div className="w-full mt-4">
            <Form {...saveForm}>
              <form
                onSubmit={saveForm.handleSubmit(onSubmitResource)}
                className="w-full flex flex-col items-center justify-between max-w-full "
              >
                <FormField
                  control={saveForm.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter URL</FormLabel>
                      <FormControl>
                        <Input
                          className="portal-input border w-[400px]"
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
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter URL</FormLabel>
                      <FormControl>
                        <Textarea
                          className="portal-input border w-[400px]"
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
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter URL</FormLabel>
                      <FormControl>
                        <Input
                          className="portal-input border w-[400px]"
                          placeholder="enter url"
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
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter URL</FormLabel>
                      <FormControl>
                        {/* <Input hidden className="portal-input border w-[400px]" placeholder="enter title" {...field} /> */}
                        <Image
                          src={initialData?.images[0]}
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
        )}
        <SheetFooter>
          {/* <SheetClose asChild>
                        <Button type="submit">Save changes</Button>
                    </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
