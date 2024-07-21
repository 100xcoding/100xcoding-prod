"use client";
import { signin } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FaGithub } from "react-icons/fa";
import { ClipLoader } from "react-spinners";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await signin();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Button
        type="submit"
        variant={"secondary"}
        disabled={isLoading}
        className="w-full tracking-wide bg-dark-200 flex items-center gap-4 text-base py-6"
      >
        {!isLoading && (
          <>
            <FaGithub className="text-2xl" />
            <span>Log in using GitHub</span>
          </>
        )}
        {isLoading && <ClipLoader color="#ffffff" />}
      </Button>
    </form>
  );
}
