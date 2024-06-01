import React from "react";
import Link from "next/link";
import { logo as Logo } from "./logo";
import { FaYoutube } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className=" bg-primary py-2  px-2.5">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between lg:items-center gap-7 md:gap-1">
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
        <div className="flex lg:justify-center items-center gap-5">
          <Link href={"/"}>
            <FaXTwitter size={26}/>
          </Link>
          <Link href={"/"}>
            <FaYoutube size={26}/>
          </Link>
          <Link href={"/"}>
            <BsInstagram size={26}/>
          </Link>
          <Link href={"/"}>
            <FaDiscord size={26}/>
          </Link>
        </div>
      </div>
    </footer>
  );
};
