import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import Link from "next/link";
import { SignOut } from "@/components/sign-out";
import { getUser } from "@/actions/update-profile-action";
export const ProfileMenu = async ({ user }: any) => {
  const { user: userData } = await getUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="w-14 h-14">
          <AvatarImage
            src={user?.image}
            alt="profile-picture"
            className="object-contain"
          />
          <AvatarFallback className="bg-green-600 text-green-500 uppercase text-xl font-semibold">
            {user?.name ? user?.name?.slice(0, 1) : "C"}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 md:w-52 border-none bg-dark-400 text-white">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link
              area-label="profile"
              href={`/${userData?.username}`}
              className="flex gap-3 items-center "
            >
              <FaUser size={21} />
              <div className="text-base">
                <p className="">Profile</p>
                <p className="text-xs">{user?.email}</p>
              </div>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="bg-green-500 " />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild className="">
            <SignOut />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
