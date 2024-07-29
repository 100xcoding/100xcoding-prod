import Link from "next/link";
import { Logo } from "./logo";
import { FaYoutube } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";
import { FaXTwitter } from "react-icons/fa6";
import { FaDiscord } from "react-icons/fa";
export const Footer = () => {
  return (
    <footer className="bg-dark-400 text-white  py-2  px-2.5">
      <div className="container mx-auto flex flex-col lg:flex-row justify-between lg:items-center gap-7 md:gap-1">
        <Link aria-label="100xcoding logo" href={"/"} className="">
          <Logo />
        </Link>
        <div className="flex lg:items-center gap-4 flex-col lg:flex-row text-slate-200">
          <p className="">© 2024 100xCoding.com </p>
          <p> All rights reserved</p>
          <Link
            aria-label="privacy policy"
            href={"/privacy-policy"}
            className="hover:underline"
          >
            Privacy Policy
          </Link>
          <Link
            aria-label="Terms of use"
            href={"/terms"}
            className="hover:underline"
          >
            Terms of use
          </Link>
        </div>
        <div className="flex lg:justify-center items-center gap-5">
          <Link aria-label="twitter" href={"/"}>
            <FaXTwitter size={26} />
          </Link>
          <Link
            href={"https://www.youtube.com/@100xcoding"}
            aria-label="youtube"
          >
            <FaYoutube size={26} />
          </Link>
          <Link
            href={"https://www.instagram.com/100xcoding"}
            aria-label="instagram"
          >
            <BsInstagram size={26} />
          </Link>
          <Link href={"/"} aria-label="discord">
            <FaDiscord size={26} />
          </Link>
        </div>
      </div>
    </footer>
  );
};
