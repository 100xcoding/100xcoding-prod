"use client";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { logo as Logo } from "./logo";
import { Button } from "@/components/ui/button";
import { ProfileMenu } from "./profile-menu";
const routes = [];
export const NavbarRoutes = () => {
	return (
		<div className="md:flex justify-between items-center hidden">
			<div className="">
				<Link href="/">
					<Logo />
				</Link>
			</div>
			<div className="">
				<ul className="flex gap-7 items-center text-lg">
					<Link
						href={"/"}
						className="hover:border-b hover:border-white hover:scale-105 transition hover:text-white/85"
					>
						<li className="">Challenges</li>
					</Link>
					<Link
						href={"/"}
						className="hover:border-b hover:border-white hover:scale-105 transition hover:text-white/85"
					>
						<li className="">Solutions</li>
					</Link>
					<Link
						href={"/"}
						className="hover:border-b hover:border-white hover:scale-105 transition hover:text-white/85"
					>
						<li className="">Blog</li>
					</Link>
					<Link
						href={"/"}
						className="hover:border-b hover:border-white hover:scale-105 transition hover:text-white/85"
					>
						<li className="">Quizzes</li>
					</Link>
				</ul>
			</div>
		</div>
	);
};
