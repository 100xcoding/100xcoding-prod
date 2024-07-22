import Link from "next/link";
import { Logo } from "./logo";
import { ProfileMenu } from "./profile-menu";
import { auth } from "@/auth";
import { navbarRoutes } from "@/constants";
import { Button } from "./ui/button";
import { NavbarItem } from "./navbar-item";

export const NavbarRoutes = async () => {
  const user = await auth();
  return (
    <div className="md:flex justify-between items-center hidden py-1.5 ">
      <div className="">
        <Link aria-label="100xcoding logo" href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex items-center gap-10">
        <ul className="flex gap-7 items-center text-lg">
          {navbarRoutes.map((route) => {
            return <NavbarItem key={route.id} {...route} />;
          })}
        </ul>
        {user?.user?.role == "creator" && (
          <Button asChild aria-label="portal">
            <Link aria-label="portal" href="/portal/challenges">
              Portal
            </Link>
          </Button>
        )}
        {user ? (
          <ProfileMenu user={user?.user} />
        ) : (
          <Button
            asChild
            className="text-base  tracking-wide px-5"
            aria-label="login"
          >
            <Link aria-label="login" href="/login">
              Login
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};
