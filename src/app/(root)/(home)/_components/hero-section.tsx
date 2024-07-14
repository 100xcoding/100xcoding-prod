"use client";
import Link from "next/link";
import Image from "next/image";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
export const HeroSection = () => {
  const words = `Learn, Create,   Build and Grow`;
  return (
    // <div className="h-[42rem] w-full dark:bg-transparent dark:bg-grid-violet-400/[0.1] relative">
    //   <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
    //   <div className="h-full container mx-auto flex flex-col-reverse md:flex-row justify-center items-center gap-10 md:gap-5 py-16 ">
    //     <div className="w-full md:w-[50%]  text-center z-30 text-base/10">
    //       <h1 className="text-3xl sm:text-4xl  font-inter font-bold tracking-wider w-full ">
    //         <strong className="text-[#ee6eff]">Projects</strong> who helps to
    //         improve <strong className="text-[#ee6eff]">Coding</strong> skills!
    //       </h1>
    //       <p className="my-6 text-xl font-inter font-medium w-full  text-slate-300 md:w-[80%] mx-auto">
    //         Coding projects is the best way to learn and practice your skills
    //         and enhance your portfolio.
    //       </p>
    //       <div className="my-10 hover:scale-105 transition-all duration-300">
    //         <Link href={"/"}>
    //           <Button
    //             borderRadius=".6rem"
    //             className="inline-flex items-center justify-center font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-br from-indigo-700 to-pink-500 via-purple-600 w-fit text-base uppercase hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-lg active:from-violet-800 active:via-purple-800 active:to-pink-800 active:scale-95 transform transition-transform h-10 px-8 py-6 rounded-full"
    //           >
    //             Get Started Now
    //           </Button>
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="w-full md:w-[45%] mx-auto bg-violet-600 z-30 rounded-t-[22%] rounded-b-[20%] rounded-l-[20%] rounded-r-[45%] ">
    //       <Image
    //         src={"/hero-section-image.jpg"}
    //         width={400}
    //         height={450}
    //         alt="image"
    //         className="w-full md:px-1 md:py-1 rounded-t-[22%] rounded-b-[20%] rounded-l-[20%] rounded-r-[45%] shadow-xl shadow-violet-500"
    //       />
    //     </div>
    //   </div>
    // </div>
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
