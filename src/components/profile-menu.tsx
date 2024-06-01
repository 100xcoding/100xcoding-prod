import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
export const ProfileMenu = ({ data }: any) => {
  const handleLogout = async () => {
		await signOut();
	}; 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="">
          <Avatar>
            <AvatarImage src={data?.image} />
            <AvatarFallback>S</AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-44 md:w-52">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={"/profile"} className="flex gap-3 items-center text-lg">
              <FaUser size={21}/>
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem >
            <div className="flex gap-3 items-center cursor-pointer text-lg">
              <MdLogout size={21}/>
              <span>Logout</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
