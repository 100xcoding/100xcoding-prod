"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { ProfileFormSchema } from "@/schema";
import { redirect } from "next/navigation";
import { z } from "zod";
type Inputs = z.infer<typeof ProfileFormSchema>;
export async function updateProfileAction(data: Inputs) {
	try {
		const session = await auth();
		if (!session || !session.user || session.user.role !== "user") {
			redirect("/?msg='sign-in first' ");
		}
		const result = ProfileFormSchema.safeParse(data);
		if (result.error) {
			return { success: false, error: result.error.format() };
		}
		if (result.success) {
			const profileData = await db.profile.update({
				where: {
					userId: session.user.id,
				},
				data: {
					...result?.data,
				},
			});
			return { success: true, data: profileData };
		}
	} catch (error) {
		return {
			success: false,
			err: getErrorMessage(error),
		};
	}
	//TODO: Add Revalidate function
}
