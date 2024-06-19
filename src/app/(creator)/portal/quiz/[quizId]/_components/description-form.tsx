"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useCreatorQuizById } from "@/services/queries";
import { QuizDescriptionSchema } from "@/schema/quiz-schema";
import { updateQuizDescriptionAction } from "../../_actions";
import { Quiz } from "@prisma/client";
import { Textarea } from "@/components/ui/textarea";

interface DescriptionFormProps {
	initialData: Quiz;
	quizId: string;
}
export const DescriptionForm = ({
	initialData,
	quizId,
}: DescriptionFormProps) => {
	const { refreshCreatorQuizData } = useCreatorQuizById(quizId);
	const [isEditing, setIsEditing] = useState(false);
	const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
	const defaultValues = useMemo(
		() => ({
			description: initialData?.description || "",
		}),
		[initialData]
	);
	const form = useForm<z.infer<typeof QuizDescriptionSchema>>({
		resolver: zodResolver(QuizDescriptionSchema),
		defaultValues,
	});
	useEffect(() => {
		form.reset(defaultValues);
	}, [defaultValues, form]);
	const { isSubmitting, isValid } = form.formState;

	const onSubmit = useCallback(
		async (values: z.infer<typeof QuizDescriptionSchema>) => {
			const response = await updateQuizDescriptionAction(values, quizId);
			if (response?.success) {
				setIsEditing(false);
				refreshCreatorQuizData();
				toast.success(response.message);
			} else {
				toast.error(response?.message);
			}
		},
		[quizId, refreshCreatorQuizData]
	);
	return (
		<div className="mt-6  dark:bg-muted rounded-md p-4">
			<div className="font-medium flex items-center justify-between tracking-wide">
				Quiz description
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
							Edit description
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<>
					<p className="text-sm mt-2">{initialData?.description}</p>
				</>
			)}
			{isEditing && (
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-4 mt-4"
					>
						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											disabled={isSubmitting}
											placeholder="e.g. 'javascript quiz'"
											{...field}
										/>
									</FormControl>
									<FormDescription>
										Discription at least contains 10 characters!
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
	);
};
