"use client";
import { signout } from "@/actions/auth";
import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";

export function SignOut() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    await signout();
  };
  return (
    <form onSubmit={handleSubmit}>
      <Button
        variant={"secondary"}
        className="w-full bg-red-600 text-red-500 space-x-4"
        type="submit"
      >
        {isLoading ? (
          <ClipLoader color="#f37877" />
        ) : (
          <>
            <MdLogout size={21} />
            <span> Sign Out</span>
          </>
        )}
      </Button>
    </form>
  );
}
