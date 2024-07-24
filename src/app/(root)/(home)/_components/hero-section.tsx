"use client";
import Link from "next/link";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
export const HeroSection = () => {
  const words = `Learn, Create,   Build and Grow`;
  return (
    <div className="h-full w-full  bg-dark-300  dark:bg-grid-white/[0.2] bg-grid-green-500/[0.15]  relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-dark-300  [mask-image:radial-gradient(ellipse_at_center,transparent_10%,#0D0F10)]"></div>
      <div className="flex   text-white  h-full">
        <div className="container mx-auto z-30 flex flex-col  items-center gap-10 lg:gap-0">
          <div className="lg:max-w-[956px] mx-auto lg:size-full  flex flex-col justify-start pt-6 md:pt-10 lg:pt-40 gap-4 lg:px-4">
            <p className="bg-blue-600 text-blue-500 font-semibold tracking-wider text-base md:text-lg capitalize rounded-full w-fit px-6 py-2 ">
              Build real world projects 🚀
            </p>
            <h1 className="text-4xl   md:text-[3.2rem] mt-2 lg:mt-10 font-medium md:tracking-wide   leading-[1.2] md:leading-[1.4]">
              Transform Your{" "}
              <span className="text-primary font-bold">Coding</span> Expertise{" "}
              <br /> with Interactive{" "}
              <span className="text-primary font-bold">Projects</span> and{" "}
              <span className="text-primary font-bold">Challenges.</span>
            </h1>
            <TextGenerateEffect
              words={words}
              className="text-base md:text-[1.8rem] font-semibold text-white/70 tracking-wider uppercase italic"
            />
            <Link
              aria-label="expore challenges"
              href="/challenges"
              className="font-semibold tracking-wide uppercase bg-green-600 text-green-500 px-6 py-2 rounded-full md:w-fit text-center md:mt-10 mt-2 text-lg"
            >
              Explore now 🚀
            </Link>
          </div>
          <div className="">
            <Image
              src={"/hero.webp"}
              alt="hero"
              height={500}
              width={500}
              priority
              className="object-cover  lg:hidden aspect-video"
            />
          </div>
        </div>
        <Image
          src={"/hero.webp"}
          alt="hero"
          height={400}
          width={600}
          priority
          className="max-w-[50%] ml-auto object-cover hidden lg:block"
        />
      </div>
    </div>
  );
};
