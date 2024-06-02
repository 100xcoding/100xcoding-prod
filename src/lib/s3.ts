import {
	S3Client,
	ListBucketsCommand,
	ListObjectsV2Command,
	GetObjectCommand,
	PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import Env from "./env";

const s3Client = new S3Client({
	region: "APAC",
	endpoint: `https://${Env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
	credentials: {
		accessKeyId: Env.CLOUDFLARE_ACCESS_KEY_ID,
		secretAccessKey: Env.CLOUDFLARE_SECRET_ACCESS_KEY,
	},
});

export async function getSignedUrlForS3Object(key: string, type: string) {
	return await getSignedUrl(
		s3Client,
		new PutObjectCommand({
			Bucket: Env.BUCKET_NAME,
			Key: key,
			ContentType: type,
		}),
		{ expiresIn: 3600 }
	);
}
