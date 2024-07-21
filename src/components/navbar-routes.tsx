import Link from "next/link";
import { Logo } from "./logo";
import { ProfileMenu } from "./profile-menu";
import { auth } from "@/auth";
import { navbarRoutes } from "@/constants";
import { Button } from "./ui/button";

export const NavbarRoutes = async () => {
  const user = await auth();
  return (
    <div className="md:flex justify-between items-center hidden py-1.5 ">
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
                className="font-medium tracking-wide transition hover:text-green-500"
              >
                {route.text}
              </Link>
            );
          })}
        </ul>
        {user?.user?.role == "creator" && (
          <Button asChild>
            <Link href="/portal/challenges">Portal</Link>
          </Button>
        )}
        {user ? (
          <ProfileMenu user={user?.user} />
        ) : (
          <Button asChild className="text-base  tracking-wide px-5">
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
};
