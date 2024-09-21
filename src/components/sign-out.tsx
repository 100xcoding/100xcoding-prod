"use client";
import { signout } from "@/actions/auth";
import { useState } from "react";
import { MdLogout } from "react-icons/md";
import { Button } from "./ui/button";
import { ClipLoader } from "react-spinners";
import { signOut } from "next-auth/react";
import { LoadingButton } from "./ui/loading-button";
export function SignOut() {
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    // await signout();
    signOut();
  };
  return (
    <form onSubmit={handleSubmit}>
      <LoadingButton
        aria-label="sign out"
        variant={"secondary"}
        className="w-full bg-red-600 text-red-500 space-x-4"
        type="submit"
        loading={isLoading}
        disabled={isLoading}
      >
        <MdLogout size={21} />
        <span> Sign Out</span>
      </LoadingButton>
      {/* <Button
        aria-label="sign out"
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
      </Button> */}
    </form>
  );
}
