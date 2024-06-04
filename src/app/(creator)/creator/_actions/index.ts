"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { CreateChallengeSchema } from "@/schema/challenge-schema";
import { redirect } from "next/navigation";
import { z } from "zod";
type ChallengeInput = z.infer<typeof CreateChallengeSchema>;
export async function createChallengeAction(data: ChallengeInput) {
	try {
		const session = await auth();
		if (!session || !session.user || session.user.role !== "creator") {
			redirect("/?msg='sign-in first' ");
		}
		const result = CreateChallengeSchema.safeParse(data);
		if (result.error) {
			return { success: false, error: result.error.format() };
		}
		if (result.success) {
			const checkTitle = await db.challenge.findUnique({
				where: {
					slug: result?.data?.slug!,
				},
			});
			if (!checkTitle) {
				const challenge = await db.challenge.create({
					data: {
						creatorId: session.user.id,
						title: result?.data?.title,
						slug: result?.data?.slug,
						userId: session?.user.id,
					},
				});
				return { success: true, message: "Challenge created Successfully!" };
			}
			return { success: false, message: "Title already exist!" };
		}
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
			message: "Something went wrong",
		};
	}
	//TODO: Add Revalidate function
}
