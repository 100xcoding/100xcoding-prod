"use client";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { ChallengeFigmaSchema } from "@/schema/challenge-schema";
import { useCreatorChallengeById } from "@/services/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { Challenge } from "@prisma/client";
import { Pencil } from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { updateChallengeFigmaAction } from "../../../_actions";
import Link from "next/link";

interface FigmaFormProps {
	initialData: Challenge;
	challengeId: string;
}
export const FigmaForm = ({ initialData, challengeId }: FigmaFormProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const { refreshCreatorChallengeData } = useCreatorChallengeById(challengeId);

	const toggleEdit = useCallback(() => setIsEditing((current) => !current), []);
	const form = useForm<z.infer<typeof ChallengeFigmaSchema>>({
		resolver: zodResolver(ChallengeFigmaSchema),
		defaultValues: useMemo(
			() => ({
				figmaDesktop: initialData?.figmaDesktop || "",
				figmaMobile: initialData?.figmaMobile || "",
			}),
			[initialData]
		),
	});

	const { isSubmitting, isValid } = form.formState;

	const onSubmit = useCallback(
		async (values: z.infer<typeof ChallengeFigmaSchema>) => {
			const response = await updateChallengeFigmaAction(values, challengeId);
			if (response?.success) {
				setIsEditing(false);
				refreshCreatorChallengeData();
				toast.success(response.message);
			} else {
				if (Array.isArray(response?.error)) {
					response.error.map((er) => toast.error(er.message));
				}
				toast.error(response?.message);
			}
		},
		[challengeId, refreshCreatorChallengeData]
	);
	// <iframe
	// 	style="border: 1px solid rgba(0, 0, 0, 0.1);"
	// 	width="800"
	// 	height="450"
	// 	src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2F8U6L4KSLYJZwWDrm2t4tHX%2FPortfolio-Website-Design-(Community)%3Fnode-id%3D0-1%26t%3DsUSqniNSNoOZOQXQ-1"
	// 	allowfullscreen
	// ></iframe>
	return (
		<div className="mt-6  dark:bg-muted rounded-md p-4">
			<div className="font-medium flex items-center justify-between">
				Challenge Figma URLs
				<Button
					onClick={toggleEdit}
					variant="ghost"
				>
					{isEditing ? (
						<>Cancel</>
					) : (
						<>
							<Pencil className="h-4 w-4 mr-2" />
							Edit figma URL
						</>
					)}
				</Button>
			</div>
			{!isEditing && (
				<>
					<Link
						className={cn(
							"text-sm mt-2 underline block",
							!initialData?.figmaDesktop && "text-slate-500 italic"
						)}
						href={initialData?.figmaDesktop ? initialData?.figmaDesktop : ""}
					>
						{initialData?.figmaDesktop ? "Figma Desktop Src" : "No Src URL"}
					</Link>
					<Link
						className={cn(
							"text-sm mt-2 underline block",
							!initialData?.figmaMobile && "text-slate-500 italic"
						)}
						href={initialData?.figmaMobile ? initialData?.figmaMobile : ""}
					>
						{initialData?.figmaMobile ? "Figma Mobile Src" : "No Src URL"}
					</Link>
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
							name="figmaDesktop"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Figma Desktop Embed Code</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. ''"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="figmaMobile"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Figma Mobile Embed Code</FormLabel>
									<FormControl>
										<Input
											disabled={isSubmitting}
											placeholder="e.g. ''"
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
								variant={"default"}
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
