import { Button } from "@/components/ui/moving-border";
import Link from "next/link";

export const HeroSection = () => {
  return (
    // TODO: APPLY THE GRID ALSO ADD CONTAINER CLASS AND WRAP THE WHOLE SECTION INI CONTAINER NOT GRID
    //TODO: TWO COLUMN LAYOUT REFERENCE IS CODERSGYAN WEBSITE
    <div className="">
      <div className="w-full  text-center my-20">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-mono font-bold tracking-wider w-full sm:w-[85%] xl:w-[70%] mx-auto ">
          {" "}
          <strong className="text-primary">Projects</strong> who helps to
          improve <strong className="text-primary">Coding</strong> skills!
        </h1>
        <p className="my-6 text-xl font-inter font-medium w-full sm:w-[70%] lg:w-[60%] mx-auto text-slate-300">
          Coding projects is the best way to learn and practice your skills and
          enhance your portfolio.
        </p>
        <div className="my-10">
          <Link href={"/"}>
            <Button
              borderRadius=".6rem"
              className="inline-flex items-center justify-center font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-br from-violet-700 to-pink-700 via-purple-700 w-fit text-base uppercase hover:from-violet-600 hover:via-purple-600 hover:to-pink-600 hover:shadow-lg active:from-violet-800 active:via-purple-800 active:to-pink-800 active:scale-95 transform transition-transform h-10 px-8 py-6 rounded-full"
            >
              Start Building now.
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
