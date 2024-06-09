import { z } from "zod";
export const CreateQuizSchema = z.object({
	title: z.string().min(10, {
		message: "Title contains at least 10 characters!",
	}),
});
