"use client";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getSlug } from "@/lib/utils";
import { CreateChallengeSchema } from "@/schema/challenge-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface TitleFormProps {
    initialData: {
        title: string;
        slug:string;
    };
    challengeId: string;
}
export const TitleForm = ({ initialData, challengeId }: TitleFormProps) => {
    const [isEditing, setIsEditing] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const router = useRouter();

    const form = useForm<z.infer<typeof CreateChallengeSchema>>({
        resolver: zodResolver(CreateChallengeSchema),
        defaultValues: initialData,
    });

    const { isSubmitting, isValid } = form.formState;
    const title = form.watch("title");

	useEffect(() => {
		const newSlug = getSlug(title);
		form.setValue("slug", newSlug);

		return () => {
			form.setValue("slug", "");
		};
	}, [title, form]);
    const onSubmit = async (values: z.infer<typeof CreateChallengeSchema>) => {
        // try {
        // 	await axios.patch(`/api/courses/${courseId}`, values);
        // 	toast.success("Course updated");
        // 	toggleEdit();
        // 	router.refresh();
        // } catch {
        // 	toast.error("Something went wrong");
        // }
    };
    return (
        <div className="mt-6 border dark:bg-muted rounded-md p-4">
            <div className="font-medium flex items-center justify-between tracking-wide">
                Challenge title & slug
                <Button
                    onClick={toggleEdit}
                    variant="ghost"
                    className="cursor-pointer"
                >
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit title
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && <>
                <p className="text-sm mt-2">{initialData?.title}</p>
                <p className="text-sm mt-2">{initialData?.slug}</p>
            </>}
            {isEditing && (
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 mt-4"
                    >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Title</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Advanced web development'"
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
                        <FormField
							control={form.control}
							name="slug"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Title Slug</FormLabel>
									<FormControl>
										<Input
											readOnly
											// disabled={isSubmitting}
											placeholder="e.g. 'create-review-component'"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Slug is auto generate based on your title.
									</FormDescription>
									<FormMessage />
								</FormItem>
							)}
						/>
                        <div className="flex items-center gap-x-2">
                            <Button
                                disabled={!isValid || isSubmitting}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    )
}
