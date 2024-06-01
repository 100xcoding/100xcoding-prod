"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { toast } from "sonner";

export const ProfileImageForm = () => {
	const handleImageUpload = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const form = e.currentTarget as HTMLFormElement;
		const formData = new FormData(form);
		const file = formData.get("image") as File;
		// console.log(file);
		if (file.name === "") {
			toast.error("Upload an Image!");
			return;
		}
	};
	const onSubmitResume = () => {
		console.log("dasjk");
	};
	return (
		<div className="w-full  dark:bg-foreground dark:text-secondary p-10 rounded-lg flex justify-center gap-20 items-center">
			<form onSubmit={handleImageUpload}>
				<div className="flex gap-4 items-center ">
					<Avatar className="w-14 h-14">
						<AvatarImage
							src="https://github.com/shadcn.png"
							alt="@shadcn"
						/>
						<AvatarFallback>CN</AvatarFallback>
					</Avatar>
					<Input
						type="file"
						name="image"
						className="text-lg tracking-wide font-poppins  dark:bg-input/10 dark:text-secondary dark:border-none  dark:placeholder:text-secondary/70 dark:ring-offset-transparent dark:focus-visible:ring-offset-[1px] dark:focus-visible:ring-1"
					/>
					<Button type="submit">upload</Button>
				</div>
			</form>
			<form>
				<div className="flex gap-4">
					<Input type="file" />
					<Button type="submit">upload</Button>
				</div>
			</form>
		</div>
	);
};
