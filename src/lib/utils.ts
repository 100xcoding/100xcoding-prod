import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Env from "./env";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
export const getErrorMessage = (error: unknown): string => {
	let message: string;
	if (error instanceof Error) {
		message = error.message;
	} else if (typeof error === "string") {
		message = error;
	} else {
		message = "Something went wrong";
	}

	return message;
};
export function getImageUrl(fileKey: string) {
	return `${Env.NEXT_PUBLIC_BUCKET_URL}/${fileKey}`;
  }