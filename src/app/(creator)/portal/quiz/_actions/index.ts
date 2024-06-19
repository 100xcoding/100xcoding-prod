"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import {
	CreateQuizSchema,
	QuizCategorySchema,
	QuizDescriptionSchema,
	QuizDurationSchema,
	QuizQuestionScoreSchema,
} from "@/schema/quiz-schema";
import { redirect } from "next/navigation";
import { z } from "zod";
type CreateQuizInput = z.infer<typeof CreateQuizSchema>;
type QuizDescriptionInput = z.infer<typeof QuizDescriptionSchema>;
type QuizDurationInput = z.infer<typeof QuizDurationSchema>;
type QuizCategoryInput = z.infer<typeof QuizCategorySchema>;
type QuizQuestionScoreInput = z.infer<typeof QuizQuestionScoreSchema>;

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
		}
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
}
export async function updateQuizTitleAction(
	data: CreateQuizInput,
	quizId: string
) {
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
			await db.quiz.update({
				where: {
					id: quizId,
					creatorId: session.user.id,
				},
				data: {
					title: result?.data?.title,
				},
			});
			return { success: true, message: "Quiz title updated Successfully!" };
		}
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
}
export async function updateQuizDescriptionAction(
	data: QuizDescriptionInput,
	quizId: string
) {
	try {
		const session = await auth();
		if (!session || !session.user || session.user.role !== "creator") {
			redirect("/?msg='sign-in first' ");
		}
		const result = QuizDescriptionSchema.safeParse(data);
		if (result.error) {
			return { success: false, error: result.error.format() };
		}
		if (result.success) {
			await db.quiz.update({
				where: {
					id: quizId,
					creatorId: session.user.id,
				},
				data: {
					description: result.data.description,
				},
			});
			return {
				success: true,
				message: "Quiz description updated Successfully!",
			};
		}
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
}
export async function updateQuizDurationAction(
	data: QuizDurationInput,
	quizId: string
) {
	try {
		const session = await auth();
		if (!session || !session.user || session.user.role !== "creator") {
			redirect("/?msg='sign-in first' ");
		}
		const result = QuizDurationSchema.safeParse(data);
		if (result.error) {
			return { success: false, error: result.error.format() };
		}
		if (result.success) {
			await db.quiz.update({
				where: {
					id: quizId,
					creatorId: session.user.id,
				},
				data: {
					duration: result.data.duration,
				},
			});
			return {
				success: true,
				message: "Quiz duration updated Successfully!",
			};
		}
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
}
export async function updateQuizImageAction(fileName: string, quizId: string) {
	const session = await auth();
	if (!session || !session.user || session.user.role !== "creator") {
		redirect("/?msg='sign-in first' ");
	}
	if (!fileName) {
		return {
			success: false,
			message: "Something went wrong, Try again!",
		};
	}
	try {
		await db.quiz.update({
			where: {
				creatorId: session.user.id,
				id: quizId,
			},
			data: {
				image: fileName,
			},
		});
		return {
			success: true,
			message: "Image Upload Successfully!",
		};
	} catch (error) {
		console.log(error);
		return {
			success: false,
			message: "Something went wrong, Try again!",
			err: getErrorMessage(error),
		};
	}
}
export async function updateQuizCategoryAction(
	data: QuizCategoryInput,
	quizId: string
) {
	try {
		const session = await auth();
		if (!session || !session.user || session.user.role !== "creator") {
			redirect("/?msg='sign-in first' ");
		}
		const result = QuizCategorySchema.safeParse(data);
		if (result.error) {
			return { success: false, error: result.error.format() };
		}
		if (result.success) {
			await db.quiz.update({
				where: {
					id: quizId,
					creatorId: session.user.id,
				},
				data: {
					quizCategoryId: result.data.quizCategoryId,
				},
			});
			return {
				success: true,
				message: "Quiz category updated Successfully!",
			};
		}
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
}
export async function createQuizQuestionAction(text: string, quizId: string) {
	try {
		const session = await auth();
		if (!session || !session.user || session.user.role !== "creator") {
			redirect("/?msg='sign-in first' ");
		}
		if (!text || text.length <= 0) {
			return { success: false, message: "Enter the question text!" };
		}
		const quizQuestion = await db.quizQuestion.create({
			data: {
				creatorId: session.user.id,
				text: text,
				quizId: quizId,
			},
		});
		return { success: true, message: "Quiz Question created Successfully!" };
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
}
export async function updateQuizQuestionTitleAction(
	text: string,
	quizId: string,
	questionId: string
) {
	try {
		const session = await auth();
		if (!session || !session.user || session.user.role !== "creator") {
			redirect("/?msg='sign-in first' ");
		}
		if (!text || text.length <= 0) {
			return { success: false, message: "Enter the question text!" };
		}
		const quizQuestion = await db.quizQuestion.update({
			where: {
				id: questionId,
				quizId: quizId,
				creatorId: session.user.id,
			},
			data: {
				text: text,
			},
		});
		return { success: true, message: "Quiz Question updated Successfully!" };
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
}
export async function updateQuizQuestionScoreAction(
	data: QuizQuestionScoreInput,
	quizId: string,
	questionId: string
) {
	try {
		const session = await auth();
		if (!session || !session.user || session.user.role !== "creator") {
			redirect("/?msg='sign-in first' ");
		}
		const result = QuizQuestionScoreSchema.safeParse(data);
		if (result.error) {
			return { success: false, error: result.error.format() };
		}
		if (result.success) {
			await db.quizQuestion.update({
				where: {
					id: questionId,
					quizId,
					creatorId: session.user.id,
				},
				data: {
					score: result.data.score,
				},
			});
			return {
				success: true,
				message: "Question score updated Successfully!",
			};
		}
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
}
export async function createQuizQuestionOptionAction(
	text: string,
	isCorrect: boolean = false,
	questionId: string
) {
	try {
		const session = await auth();
		if (!session || !session.user || session.user.role !== "creator") {
			redirect("/?msg='sign-in first' ");
		}
		if (!text || text.length <= 0) {
			return { success: false, message: "Enter the question text!" };
		}
		const quizoptions = await db.quizOption.findMany({
			where: {
				questionId: questionId,
			},
		});
		if (quizoptions.length == 4) {
			return { success: false, message: "Max 4 options can be added!" };
		}
		const quizQuestion = await db.quizOption.create({
			data: {
				text: text,
				questionId: questionId,
				isCorrect: isCorrect,
			},
		});
		return { success: true, message: "Option created Successfully!" };
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
}
export async function updateQuizQuestionOptionAction(
	text: string,
	isCorrect: boolean = false,
	quizId: string
) {
	try {
		const session = await auth();
		if (!session || !session.user || session.user.role !== "creator") {
			redirect("/?msg='sign-in first' ");
		}
		if (!text || text.length <= 0) {
			return { success: false, message: "Enter the question text!" };
		}

		const quizQuestion = await db.quizOption.update({
			where: {
				id: quizId,
			},
			data: {
				text: text,
				isCorrect: isCorrect,
			},
		});
		return { success: true, message: "Option updated Successfully!" };
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
}
