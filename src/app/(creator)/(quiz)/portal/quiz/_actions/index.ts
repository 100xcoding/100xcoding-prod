"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { CreateQuizSchema } from "@/schema/quiz-schema";
import { redirect } from "next/navigation";
import { z } from "zod";
type CreateQuizInput = z.infer<typeof CreateQuizSchema>;
export async function createQuizAction(data: CreateQuizInput) {
	try {
		const session = await auth();
		if (!session || !session.user || session.user.role !== "creator") {
			redirect("/?msg='sign-in first' ");
		}
		const result = CreateQuizSchema.safeParse(data);
		if (result.error) {
			return { success: false, error: result.error.format() };
		}
		if (result.success) {
			const quiz = await db.quiz.create({
				data: {
					creatorId: session.user.id,
					title: result?.data?.title,
				},
			});
			return { success: true, message: "quiz created Successfully!" };
			// return { success: false, message: "Title already exist!" };
		}
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
}
