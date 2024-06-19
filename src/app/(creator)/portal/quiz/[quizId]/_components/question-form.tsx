"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuizQuestion, Quiz } from "@prisma/client";
import { Loader2, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { QuestionsList } from "./questions-list";
import { createQuizQuestionAction } from "../../_actions";
import { useCreatorQuizById } from "@/services/queries";
import axios from "axios";
import Editor from "@/components/react-quil-editor";

interface QuestionFormProps {
	initialData: Quiz & { questions: QuizQuestion[] };
	quizId: string;
}
const formSchema = z.object({
	text: z.string().min(1),
});
const QuestionForm = ({ initialData, quizId }: QuestionFormProps) => {
	const [isCreating, setIsCreating] = useState(false);
	const [isUpdating, setIsUpdating] = useState(false);
	const [content, setContent] = useState<string>("");
	const toggleCreating = () => {
		setIsCreating((current) => !current);
	};
	const { refreshCreatorQuizData } = useCreatorQuizById(quizId);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		// defaultValues: {
		// 	text: "",
		// },
	});

	const { isSubmitting, isValid } = form.formState;

	const handleSubmit = useCallback(
		async (e: React.FormEvent) => {
			e.preventDefault();
			const response = await createQuizQuestionAction(content, quizId);
			if (response?.success) {
				setIsCreating(false);
				refreshCreatorQuizData();
				toast.success(response.message);
			} else {
				toast.error(response?.message);
			}
		},
		[quizId, refreshCreatorQuizData, content]
	);

	const onReorder = async (updateData: { id: string; position: number }[]) => {
		try {
			setIsUpdating(true);
			await axios.put(`/api/creator/quizes/${quizId}/reorder`, {
				list: updateData,
			});
			toast.success("Chapters reordered");
			router.refresh();
		} catch {
			toast.error("Something went wrong");
		} finally {
			setIsUpdating(false);
		}
	};

	const onEdit = (id: string) => {
		router.push(`/portal/quiz/${quizId}/${id}`);
	};

	return (
		<div className="relative mt-6 border dark:bg-muted rounded-md p-4">
			{isUpdating && (
				<div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
					<Loader2 className="animate-spin h-6 w-6 text-sky-700" />
				</div>
			)}
			<div className="font-medium flex items-center justify-between">
				Quiz Questions
				<Button
					onClick={toggleCreating}
					variant="ghost"
				>
					{isCreating ? (
						<>Cancel</>
					) : (
						<>
							<PlusCircle className="h-4 w-4 mr-2" />
							Add a question
						</>
					)}
				</Button>
			</div>
			{isCreating && (
				<form
					onSubmit={handleSubmit}
					className="space-y-4 mt-4"
				>
					<Editor
						value={content}
						setValue={setContent}
					/>
					<Button type="submit">Create</Button>
				</form>
			)}
			{!isCreating && (
				<div
					className={cn(
						"text-sm mt-2",
						!initialData?.questions?.length && "text-slate-500 italic"
					)}
				>
					{!initialData?.questions?.length && "No chapters"}
					<QuestionsList
						onEdit={onEdit}
						onReorder={onReorder}
						items={initialData?.questions || []}
					/>
				</div>
			)}
			{!isCreating && (
				<p className="text-xs text-muted-foreground mt-4">
					Drag and drop to reorder the chapters
				</p>
			)}
		</div>
	);
};

export default QuestionForm;
