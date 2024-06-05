import { z } from "zod";
export const CreateChallengeSchema = z.object({
    title:z.string().min(10,{
        message:"Title contains at least 10 characters!"
    }),
    slug:z.string()
})
export const ChallengeCategorySchema = z.object({
	challengeCategoryId: z.string().min(1),
});