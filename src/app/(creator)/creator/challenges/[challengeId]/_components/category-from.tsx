"use client";

import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combo-box";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { ChallengeCategorySchema } from "@/schema/challenge-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Challenge } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface CategoryFormProps {
	initialData: Challenge;
	challengeId: string;
	options: { label: string; value: string }[];
}
export const CategoryForm = ({initialData,challengeId,options}:CategoryFormProps) => {
    console.log("CT - ",options);
    const [isEditing, setIsEditing] = useState(false);

	const toggleEdit = () => setIsEditing((current) => !current);

	const router = useRouter();

	const form = useForm<z.infer<typeof ChallengeCategorySchema>>({
		resolver: zodResolver(ChallengeCategorySchema),
		defaultValues: {
			challengeCategoryId: initialData?.challengeCategoryId || "",
		},
	});

	const { isSubmitting, isValid } = form.formState;
    const onSubmit = async (values: z.infer<typeof ChallengeCategorySchema>) => {
		// try {
		// 	await axios.patch(`/api/courses/${courseId}`, values);
		// 	toast.success("Course updated");
		// 	toggleEdit();
		// 	router.refresh();
		// } catch {
		// 	toast.error("Something went wrong");
		// }
	};

	const selectedOption = options?.find(
		(option) => option.value === initialData.challengeCategoryId
	);
  return (
    <div className="mt-6 border dark:bg-muted rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Challenge category
				<Button
					onClick={toggleEdit}
					variant="ghost"
				>
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit category
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<p
					className={cn(
						"text-sm mt-2",
						!initialData?.challengeCategoryId && "text-slate-500 italic"
					)}
				>
					{selectedOption?.label || "No category"}
				</p>
			)}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="challengeCategoryId"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Combobox
											options={options?.map((option)=>(option))}
											{...field}
										/>
									</FormControl>
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
