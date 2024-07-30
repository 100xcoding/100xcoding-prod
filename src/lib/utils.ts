import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Env from "./env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

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
export const validateFileType = (
  file: File,
  allowedTypes: string[],
): boolean => {
  return allowedTypes.includes(file.type);
};
export function checkFileSize(fileSize: number, maxSizeInMB: number) {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  if (fileSize > maxSizeInBytes) {
    return false;
  }
  return true;
}
export function appendDateToFileName(fileName: string): string {
  const currentDate = new Date();
  const formattedDate = currentDate.toISOString(); // Format: YYYY-MM-DD
  const extensionIndex = fileName.lastIndexOf(".");
  if (extensionIndex !== -1) {
    const baseName = fileName.slice(0, extensionIndex);
    const extension = fileName.slice(extensionIndex);
    return `${baseName}_${formattedDate}${extension}`;
  } else {
    return `${fileName}_${formattedDate}`;
  }
}
export const getSlug = (text: string) => {
  if (!text) {
    return "";
  }
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^\w\-]+/g, "") // Remove all non-word chars
    .replace(/\-\-+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
};

export const formatterDescription = (description: string) => {
  return description.length > 130
    ? `${description.slice(0, 130)}...`
    : description;
};
export const challengesCategoryNames = [
  "Starter",
  "Learner",
  "Skilled",
  "Master",
];
export const challengeCategoryColorClass = (index: number) => {
  const colors = [
    "bg-blue-700 text-sky-100",
    "bg-fuchsia-700 text-fuchsia-200",
    "bg-green-700 text-green-200",
    "bg-red-800 text-red-200",
  ];
  return colors[index % colors.length];
};
