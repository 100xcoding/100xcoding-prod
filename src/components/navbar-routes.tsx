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
    <div className="hidden md:flex items-center gap- w-full z-30 py-2 justify-around">
      <div className="z-30">
        <Link aria-label="100xcoding logo" href="/">
          <Logo />
        </Link>
      </div>
      <div className="flex gap-8 items-center text-lg lg:text-2xl z-30">
        {navbarRoutes.map((route) => {
          return <NavbarItem key={route.id} {...route} />;
        })}
        {user?.user?.role == "creator" && (
          <Button asChild aria-label="portal" className="z-30">
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
            className="text-base z-30  tracking-wide px-5"
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
