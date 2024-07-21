import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Logo } from "./logo";
import Link from "next/link";
import { ProfileMenu } from "./profile-menu";
import { auth } from "@/auth";
import { mobileNavbarRoutes } from "@/constants";
import { Button } from "./ui/button";
export const MobileSidebar = async () => {
  const session = await auth();
  return (
    <div className="flex justify-between items-center">
      <div className="md:hidden">
        <Logo />
      </div>
      <div className="flex gap-4 items-center">
        <div className="md:hidden">
          {session?.user && <ProfileMenu user={session?.user} />}
        </div>
        <Sheet>
          <SheetTrigger className="md:hidden  hover:opacity-75 transition flex gap-6 items-center">
            <Menu size={28} />
          </SheetTrigger>
          <SheetContent className="bg-dark-200 text-white border-green-500">
            <div className="p-2 mt-12 md:hidden flex flex-col justify-between h-full pb-20">
              <ul className="flex flex-col  gap-6 ">
                {mobileNavbarRoutes.map((route) => {
                  return (
                    <Link
                      href={route.path}
                      key={route.id}
                      className="flex gap-4 items-center font-medium tracking-wide transition hover:text-green-500"
                    >
                      <span>{<route.symbol size={23} />}</span>
                      <li>{route.text}</li>
                    </Link>
                  );
                })}
              </ul>
              {!session?.user && (
                <Button
                  asChild
                  className="text-base w-full  tracking-wide px-5"
                >
                  <Link href="/login" className="block w-full">
                    Get Started 🚀
                  </Link>
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};
