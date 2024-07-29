"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { WhatsappShareButton } from "react-share";
import { IoMdShare } from "react-icons/io";
import { WhatsappButton } from "./whatsapp-button";
export const SocialShare = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="rounded-full lg:flex lg:items-center lg:gap-2"
          aria-label="share"
        >
          {" "}
          <IoMdShare size={22} /> <span className="hidden lg:block">Share</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] border-none text-white bg-dark-500">
        <DialogHeader>
          <DialogTitle>Share Profile</DialogTitle>
          <DialogDescription>
            <WhatsappButton />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
