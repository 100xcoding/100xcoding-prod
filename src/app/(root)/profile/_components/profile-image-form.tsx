"use client";
import { createUploadUrlAction } from "@/actions/file-upload-actions";
import { updateProfileImageAction, updateProfileResumeAction } from "@/actions/update-profile-action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	appendDateToFileName,
	checkFileSize,
	getImageUrl,
	validateFileType,
} from "@/lib/utils";
import { useProfile } from "@/services/queries";
import React, { useRef } from "react";
import { toast } from "sonner";
export const ProfileImageForm = () => {
	const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
	const fileInputRef = useRef<HTMLInputElement>(null);
	const resumeInputRef = useRef<HTMLInputElement>(null);
	const { data, error, refreshProfile } = useProfile();

	const handleProfileImageChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const selectedFile = event.target.files && event.target.files[0];
		if (selectedFile) {
			if (!validateFileType(selectedFile, allowedTypes)) {
				toast.error(
					"Invalid file type. Only JPEG, PNG, and JPG files are allowed."
				);
				return;
			}
			if (!checkFileSize(selectedFile.size, 2)) {
				toast.error("Maximum size allowed 2 MB");
				return;
			}
			handleImageUpload(selectedFile);
		}
	};
	const handleImageUpload = async (profile: File) => {
		const originalFileName = profile.name;
		const fileNameWithDate = appendDateToFileName(originalFileName);
		// Create a new File object with the modified name
		const modifiedFile = new File([profile], fileNameWithDate, {
			type: profile.type,
		});

		const uploadUrl = await createUploadUrlAction(
			fileNameWithDate,
			profile.type
		);
		const response = await fetch(uploadUrl, {
			method: "PUT",
			body: modifiedFile,
		});
		if (response.ok && response.status === 200) {
			// console.log("CLOUD-RES", response);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
			const result = await updateProfileImageAction(fileNameWithDate);
			if (result.success) {
				toast.success(result?.message);
				refreshProfile();
			} else {
				toast.error(result.message);
			}
		} else {
			toast.error("Something went wrong, Try again!");
		}
	};
	const handleResumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const allowedTypes = ["application/pdf"];
		const selectedFile = event.target.files && event.target.files[0];
		if (selectedFile) {
			if (!validateFileType(selectedFile, allowedTypes)) {
				toast.error(
					"Invalid file type. Only PDF file is allowed."
				);
				return;
			}
			if (!checkFileSize(selectedFile.size, 2)) {
				toast.error("Maximum size allowed 2 MB");
				return;
			}
			handleResumeUpload(selectedFile);
		}
	};
	const handleResumeUpload = async (resume: File) => { 
		const originalFileName = resume.name;
		const fileNameWithDate = appendDateToFileName(originalFileName);
		// Create a new File object with the modified name
		const modifiedFile = new File([resume], fileNameWithDate, {
			type: resume.type,
		});

		const uploadUrl = await createUploadUrlAction(
			fileNameWithDate,
			resume.type
		);
		const response = await fetch(uploadUrl, {
			method: "PUT",
			body: modifiedFile,
		});
		if (response.ok && response.status === 200) {
			// console.log("CLOUD-RES", response);
			if (fileInputRef.current) {
				fileInputRef.current.value = "";
			}
			const result = await updateProfileResumeAction(fileNameWithDate);
			if (result.success) {
				toast.success(result?.message);
				refreshProfile();
			} else {
				toast.error(result.message);
			}
		} else {
			toast.error("Something went wrong, Try again!");
		}
	};
	return (
		<div className="w-full  dark:bg-foreground dark:text-secondary p-10 rounded-lg flex justify-center gap-20 items-center">
			<div className="flex gap-4 items-center ">
				<Avatar className="w-14 h-14 border border-gray-600">
					<AvatarImage
						src={
							data
								? getImageUrl(data?.profile?.profileImage!)
								: "https://github.com/shadcn.png"
						}
						alt={data ? data.username : "profile-img"}
					/>
					<AvatarFallback>CN</AvatarFallback>
				</Avatar>
				<Label htmlFor="profile">
					<Input
						type="file"
						id="profile"
						ref={fileInputRef}
						onChange={handleProfileImageChange}
						className="hidden text-lg tracking-wide font-poppins  dark:bg-input/10 dark:text-secondary dark:border-none  dark:placeholder:text-secondary/70 dark:ring-offset-transparent dark:focus-visible:ring-offset-[1px] dark:focus-visible:ring-1"
					/>
					<Button asChild>
						<span>Upload Image</span>
					</Button>
				</Label>
			</div>

			<div className="flex gap-4">
				<Label htmlFor="resume">
					<Input
						type="file"
						id="resume"
						ref={resumeInputRef}
						onChange={handleResumeChange}
						className="hidden text-lg tracking-wide font-poppins  dark:bg-input/10 dark:text-secondary dark:border-none  dark:placeholder:text-secondary/70 dark:ring-offset-transparent dark:focus-visible:ring-offset-[1px] dark:focus-visible:ring-1"
					/>
					<Button asChild>
						<span>Upload Resume</span>
					</Button>
				</Label>
			</div>
		</div>
	);
};
