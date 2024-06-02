import { getSignedUrlForS3Object } from "@/lib/s3";

export async function createUploadUrlAction(key: string, type: string) {
	return await getSignedUrlForS3Object(key, type);
}
