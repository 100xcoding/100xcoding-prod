import { z } from "zod";
export const CreateQuizSchema = z.object({
	title: z.string().min(10, {
		message: "Title contains at least 10 characters!",
	}),
});
export const QuizDescriptionSchema = z.object({
	description: z.string().min(10, {
		message: "Description contains at least 10 characters!",
	}),
});
export const QuizDurationSchema = z.object({
	duration: z.number().gte(1, {
		message: "Duration at least 1 min",
	}),
});
export const QuizCategorySchema = z.object({
	quizCategoryId: z.string().min(1),
});
export const QuizQuestionScoreSchema = z.object({
	score: z.number().gte(1, {
		message: "score at least 1 ",
	}),
});
