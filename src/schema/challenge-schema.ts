import { z } from "zod";
export const CreateChallengeSchema = z.object({
  title: z.string().min(10, {
    message: "Title contains at least 10 characters!",
  }),
  slug: z.string(),
});
export const ChallengeCategorySchema = z.object({
  challengeCategoryId: z.string().min(1),
});
export const ChallengeShortDescriptionSchema = z.object({
  description: z.string().min(1),
});
export const ChallengeTechSchema = z.object({
  challengeTechId: z.string().min(1),
});
export const ChallengeFigmaSchema = z.object({
  figmaDesktop: z.string().min(1),
  figmaMobile: z.string().min(1),
});
export const ChallengeAuthorSchema = z.object({
  authorName: z.string().optional(),
  authorProfile: z.string().optional(),
});
