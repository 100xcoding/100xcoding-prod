import Link from "next/link";
import { Logo } from "./logo";
import { ProfileMenu } from "./profile-menu";
import { SignIn } from "@/components/sign-in";
import { auth } from "@/auth";
import { navbarRoutes } from "@/constants";

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
          {navbarRoutes.map((route) => {
            return (
              <Link
                href={route.path}
                key={route.id}
                className="hover:border-b hover:border-white hover:scale-105 transition hover:text-white/85"
              >
                {route.text}
              </Link>
            );
          })}
        </ul>
        {user ? <ProfileMenu /> : <SignIn />}
      </div>
    </div>
  );
};
