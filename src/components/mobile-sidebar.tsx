import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { logo as Logo } from "./logo";

import Link from "next/link";
import { ProfileMenu } from "./profile-menu";
import { auth } from "@/auth";
import { SignIn } from "./sign-in";
import { mobileNavbarRoutes } from "@/constants";
export const MobileSidebar = async () => {
  const user = await auth();
  return (
    <div className="flex justify-between items-center">
      <div className="w-24 md:hidden">
        <Logo />
      </div>
      <div className="flex gap-4 items-center">
        <span className="md:hidden">{user ? <ProfileMenu /> : ""}</span>
        <Sheet>
          <SheetTrigger className="md:hidden  hover:opacity-75 transition flex gap-6 items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent>
            <div className="p-2 mt-12 md:hidden relative">
              <ul className="flex flex-col  gap-6 mb-52">
                {mobileNavbarRoutes.map((route) => {
                  return (
                    <Link
                      href={route.path}
                      key={route.id}
                      className="flex gap-4 items-center hover:border-b hover:border-white hover:scale-105 transition hover:text-white/85 "
                    >
                      <span className="">{<route.symbol size={23}/>}</span>
                      <li className="">{route.text}</li>
                    </Link>
                  );
                })}
              </ul>
              <span className="fixed bottom-10">{user ? "" : <SignIn />}</span>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
