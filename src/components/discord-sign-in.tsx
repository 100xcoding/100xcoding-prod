"use client";
import { signin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaDiscord, FaGithub } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export function DiscordSignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await signin("discord");
  };
  return (
    <form onSubmit={handleSubmit}>
      <Button
        aria-label="Log in using Discord"
        type="submit"
        variant={"secondary"}
        disabled={isLoading}
        className="w-full tracking-wide bg-[#5865F2] flex items-center gap-4 text-base py-6"
      >
        {!isLoading && (
          <>
            <FaDiscord className="text-2xl" />
            <span>Log in using Discord</span>
          </>
        )}
        {isLoading && <ClipLoader color="#ffffff" />}
      </Button>
    </form>
  );
}
