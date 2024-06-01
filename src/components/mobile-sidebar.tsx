"use client";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { logo as Logo } from "./logo";
import { FaCode } from "react-icons/fa6";
import { HiCodeBracketSquare } from "react-icons/hi2";
import { GrResources } from "react-icons/gr";
import { SiMicrodotblog } from "react-icons/si";
import Link from "next/link";
import { ProfileMenu } from "./profile-menu";
export const MobileSidebar = () => {
	return (
		<div className="flex justify-between items-center">
			<div className="w-24 md:hidden">
				<Logo />
			</div>
			<div className="flex gap-4 items-center">
				<span className="md:hidden">
					<ProfileMenu />
				</span>
				<Sheet>
					<SheetTrigger className="md:hidden  hover:opacity-75 transition flex gap-6 items-center">
						<Menu />
					</SheetTrigger>
					<SheetContent>
						<div className="p-2 mt-12 md:hidden">
							<ul className="flex flex-col  gap-6">
								<Link
									href={"/"}
									className=" flex gap-4 items-center hover:border-b hover:border-white hover:scale-105 transition hover:text-white/85 "
								>
									<span className="">
										<FaCode size={23} />
									</span>
									<li className="">Challenges</li>
								</Link>
								<Link
									href={"/"}
									className="flex gap-4 items-center hover:border-b hover:border-white hover:scale-105 transition hover:text-white/85 "
								>
									<span>
										<HiCodeBracketSquare size={23} />
									</span>
									<li className="">Solutions</li>
								</Link>
								<Link
									href={"/"}
									className="flex gap-4 items-center hover:border-b hover:border-white hover:scale-105 transition hover:text-white/85 "
								>
									<span className="">
										<GrResources size={23} />
									</span>
									<li className="">Blog</li>
								</Link>
								<Link
									href={"/"}
									className="flex gap-4 items-center hover:border-b hover:border-white hover:scale-105 transition hover:text-white/85 "
								>
									<span>
										<SiMicrodotblog size={23} />
									</span>
									<li className="">Quizzes</li>
								</Link>
							</ul>
						</div>
					</SheetContent>
				</Sheet>
			</div>
		</div>
	);
};
