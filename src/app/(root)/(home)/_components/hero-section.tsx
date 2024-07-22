"use client";
import Link from "next/link";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
export const HeroSection = () => {
  const words = `Learn, Create,   Build and Grow`;
  return (
    <div className="h-full w-full  bg-dark-300  dark:bg-grid-white/[0.2] bg-grid-green-500/[0.15]  relative">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-dark-300  [mask-image:radial-gradient(ellipse_at_center,transparent_10%,#0D0F10)]"></div>
      <div className="flex   text-white  h-full">
        <div className="container mx-auto z-30 flex flex-col  items-center gap-10">
          <div className="lg:max-w-[756px] mx-auto lg:size-full  flex flex-col justify-start pt-6 md:pt-10 lg:pt-40 gap-4 lg:px-4">
            <p className="bg-blue-600 text-blue-500 font-semibold tracking-wider text-base md:text-lg capitalize rounded-full w-fit px-6 py-2 ">
              Build real world projects 🚀
            </p>
            <h1 className="text-5xl  md:text-6xl mt-2 lg:mt-10 font-bold md:tracking-wide leading-[1.2] md:leading-[1.3]">
              Projects you can build to improve your coding skills!
            </h1>
            {/* <h3 className="text-4xl mt-1 md:mt-8 font-semibold text-white/90 tracking-wider">Learn, Create,   Build and Grow</h3> */}

            <TextGenerateEffect
              words={words}
              className="text-4xl font-semibold text-white/90 tracking-wider uppercase italic"
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
              src={"/hero.jpg"}
              alt="hero"
              height={500}
              width={500}
              className=" object-cover  lg:hidden aspect-video"
            />
          </div>
        </div>
        <Image
          src={"/hero.jpg"}
          alt="hero"
          height={400}
          width={600}
          className="max-w-[50%] ml-auto object-cover hidden lg:block"
        />
      </div>
    </div>
  );
};
