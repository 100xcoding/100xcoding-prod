"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { ProfileFormSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const ProfileForm = () => {
	const form = useForm<z.infer<typeof ProfileFormSchema>>({
		resolver: zodResolver(ProfileFormSchema),
		defaultValues: {
			email: "sidjain80@gmail.com",
			username: "techysiddhant",
		},
	});
	const onSubmit = (data: z.infer<typeof ProfileFormSchema>) => {
		console.log(data);
	};
	return (
		<div className="w-full  dark:bg-foreground dark:text-secondary p-10 rounded-lg">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-2/3 space-y-6 mx-auto"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 gap-10">
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">Email</FormLabel>
									<FormControl>
										<Input
											disabled
											placeholder="title"
											className="w-full  text-lg tracking-wide font-poppins  dark:bg-input/10 dark:text-secondary dark:border-none  dark:placeholder:text-secondary/70 dark:ring-offset-transparent dark:focus-visible:ring-offset-[1px] dark:focus-visible:ring-1"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">Username</FormLabel>
									<FormControl>
										<Input
											disabled
											placeholder="title"
											className="w-full  text-lg tracking-wide font-poppins  dark:bg-input/10 dark:text-secondary dark:border-none  dark:placeholder:text-secondary/70 dark:ring-offset-transparent dark:focus-visible:ring-offset-[1px] dark:focus-visible:ring-1"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">Profile Title</FormLabel>
									<FormControl>
										<Input
											placeholder="title"
											className="w-full text-lg tracking-wide font-poppins  dark:bg-input/10 dark:text-secondary dark:border-none  dark:placeholder:text-secondary/70 dark:ring-offset-transparent dark:focus-visible:ring-offset-[1px] dark:focus-visible:ring-1"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="website"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">Website URL</FormLabel>
									<FormControl>
										<Input
											placeholder="website"
											className="w-full text-lg tracking-wide font-poppins  dark:bg-input/10 dark:text-secondary dark:border-none  dark:placeholder:text-secondary/70 dark:ring-offset-transparent dark:focus-visible:ring-offset-[1px] dark:focus-visible:ring-1"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<FormField
						control={form.control}
						name="bio"
						render={({ field }) => (
							<FormItem>
								<FormLabel className="text-xl">Bio</FormLabel>
								<FormControl>
									<Textarea
										{...field}
										className="w-full text-lg tracking-wide font-poppins  dark:bg-input/10 dark:text-secondary dark:border-none  dark:placeholder:text-secondary/70 dark:ring-offset-transparent dark:focus-visible:ring-offset-[1px] dark:focus-visible:ring-1"
										placeholder="Type your message here."
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						className="w-full"
						type="submit"
					>
						Save changes
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default ProfileForm;
