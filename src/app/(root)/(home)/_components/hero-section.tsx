import { Button } from "@/components/ui/moving-border";
import Link from "next/link";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="h-[42rem] w-full dark:bg-transparent dark:bg-grid-violet-400/[0.1] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="h-full container mx-auto flex flex-col-reverse md:flex-row justify-center items-center gap-10 md:gap-5 py-16 ">
        <div className="w-full md:w-[50%]  text-center z-30 text-base/10">
          <h1 className="text-3xl sm:text-4xl  font-inter font-bold tracking-wider w-full ">
            <strong className="text-[#ee6eff]">Projects</strong> who helps to
            improve <strong className="text-[#ee6eff]">Coding</strong> skills!
          </h1>
          <p className="my-6 text-xl font-inter font-medium w-full  text-slate-300 md:w-[80%] mx-auto">
            Coding projects is the best way to learn and practice your skills
            and enhance your portfolio.
          </p>
          <div className="my-10 hover:scale-105 transition-all duration-300">
            <Link href={"/"}>
              <Button
                borderRadius=".6rem"
                className="inline-flex items-center justify-center font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-br from-indigo-700 to-pink-500 via-purple-600 w-fit text-base uppercase hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-lg active:from-violet-800 active:via-purple-800 active:to-pink-800 active:scale-95 transform transition-transform h-10 px-8 py-6 rounded-full"
              >
                Get Started Now
              </Button>
            </Link>
          </div>
        </div>
        <div className="w-full md:w-[45%] mx-auto bg-violet-600 z-30 rounded-t-[22%] rounded-b-[20%] rounded-l-[20%] rounded-r-[45%] ">
          <Image
            src={"/hero-section-image.jpg"}
            width={400}
            height={450}
            alt="image"
            className="w-full md:px-1 md:py-1 rounded-t-[22%] rounded-b-[20%] rounded-l-[20%] rounded-r-[45%] shadow-xl shadow-violet-500"
          />
        </div>
      </div>
    </div>
  );
};
