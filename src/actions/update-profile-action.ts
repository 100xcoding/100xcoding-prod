"use server";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import { getErrorMessage } from "@/lib/utils";
import { ProfileFormSchema } from "@/schema";
import { redirect } from "next/navigation";
import { z } from "zod";
import { createUploadUrlAction } from "./file-upload-actions";
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
export async function addProfileImageAction(
	fileName: string,
	fileType: string,
	fileData: Blob
) {
	const uploadUrl = await createUploadUrlAction(fileName, fileType);
	if (!uploadUrl) {
		return {
			success: false,
			message: "URL Failed, Try again!",
		};
	}
	const response = await fetch(uploadUrl, {
		method: "PUT",
		body: fileData,
	});
	console.log(response);
	//TODO: Update the image name in the profile schema
	if (response.ok && response.status === 200) {
		return {
			success: true,
			message: "Image Upload Successfully!",
		};
	}
	return {
		success: false,
		message: "Something went wrong, Try again!",
	};
	// TODO: re-Validate the Path
}
