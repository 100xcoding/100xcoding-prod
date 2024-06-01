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
import { SocialLinkFormSchema } from "@/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
export const SocialForm = () => {
	const form = useForm<z.infer<typeof SocialLinkFormSchema>>({
		resolver: zodResolver(SocialLinkFormSchema),
		// defaultValues: {
		// 	github: "https://github.com/techysiddhant",
		// 	twitter: "",
		// 	instagram: "",
		// 	youtube: "",
		// 	medium: "",
		// 	threads: "",
		// 	leetcode: "",
		// 	gfg: "",
		// 	codechef: "",
		// 	codeforces: "",
		// 	linkedIn: "",
		// },
	});
	const onSubmit = (data: z.infer<typeof SocialLinkFormSchema>) => {
		console.log(data);
	};
	return (
		<div className="w-full  dark:bg-foreground dark:text-secondary p-10 rounded-lg">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-2/3 space-y-6 mx-auto"
				>
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
						<FormField
							control={form.control}
							name="github"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">Github URL</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g 'https://github.com/techysiddhant' "
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
							name="twitter"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">X URL</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g  "
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
							name="instagram"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">Instagram URL</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g  "
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
							name="youtube"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">Youtube URL</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g  "
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
							name="medium"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">Medium URL</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g  "
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
							name="threads"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">Threads URL</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g  "
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
							name="leetcode"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">LeetCode URL</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g  "
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
							name="gfg"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">GFG URL</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g  "
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
							name="codechef"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">CodeChef URL</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g  "
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
							name="codeforces"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">CodeForces URL</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g  "
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
							name="linkedIn"
							render={({ field }) => (
								<FormItem>
									<FormLabel className="text-xl">linkedIn URL</FormLabel>
									<FormControl>
										<Input
											placeholder="e.g  "
											className="w-full  text-lg tracking-wide font-poppins  dark:bg-input/10 dark:text-secondary dark:border-none  dark:placeholder:text-secondary/70 dark:ring-offset-transparent dark:focus-visible:ring-offset-[1px] dark:focus-visible:ring-1"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>

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
