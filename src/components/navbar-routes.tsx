import Link from "next/link";
import { logo as Logo } from "./logo";
import { ProfileMenu } from "./profile-menu";
import { SignIn } from "@/components/sign-in";
import { auth } from "@/auth";

export const NavbarRoutes = async () => {
	const user = await auth();
	return (
		<div className="md:flex justify-between items-center hidden py-1.5">
			<div className="">
				<Link href="/">
					<Logo />
				</Link>
			</div>
			<div className="flex items-center gap-10">
				<ul className="flex gap-7 items-center text-lg">
					<Link
						href={"/challenges"}
						className="hover:border-b hover:border-white hover:scale-105 transition hover:text-white/85"
					>
						<li className="">Challenges</li>
					</Link>
					<Link
						href={"/solutions"}
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
				{user ? <ProfileMenu /> : <SignIn />}
			</div>
		</div>
	);
};
