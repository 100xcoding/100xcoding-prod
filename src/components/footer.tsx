import React from "react";
import Link from "next/link";
import { logo as Logo } from "./logo";
import { X, Youtube, Instagram } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="flex flex-col lg:flex-row justify-around lg:items-center bg-primary py-2 gap-7 md:gap-1 px-2.5">
      <Link href={"/"} className="">
        <Logo />
      </Link>
      <div className="flex lg:items-center gap-4 flex-col lg:flex-row text-slate-200">
        <p className="">© 2024 codebits. All rights reserved </p>
        <Link href={"/"} className="hover:underline">
          Privacy Policy
        </Link>
        <Link href={"/"} className="hover:underline">
          Terms of use
        </Link>
      </div>
      <div className="flex lg:justify-center items-center gap-3">
        <Link href={"/"}>
          <X />
        </Link>
        <Link href={"/"}>
          <Youtube />
        </Link>
        <Link href={"/"}>
          <Instagram />
        </Link>
      </div>
    </footer>
  );
};
