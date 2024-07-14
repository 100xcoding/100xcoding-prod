import { SignIn } from "@/components/sign-in";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";

export const CallToAction = () => {
  const words = [
    {
      text: "Join 1000+",
    },
    {
      text: "people building",
    },
    {
      text: "portfolio-worthy",
    },
    {
      text: "projects",
    },
  ];
  const words2 = [
    {
      text: "and unleash",
    },
    {
      text: "your potential.",
    },
  ];
  return (
    // <section className="my-32  relative h-[42rem] md:h-[32rem] opacity-90 rounded-3xl dark:bg-transparent dark:bg-grid-violet-400/[0.1] flex flex-col justify-center py-10 md:py-0">
    //   <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-[#030712] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0.1%,black)]"></div>
    //   <div className="text-center z-30 container mx-auto ">
    //     <h1 className="text-3xl md:text-4xl font-inter font-extrabold  sm:w-[90%] md:w-[80%] xl:w-[70%] mx-auto leading-[10rem] text-white ">
    //       Join 1000+ people building portfolio-worthy projects and unleash your
    //       potential.
    //     </h1>
    //     <p className="my-12 text-lg font-poppins font-medium tracking-wide text-slate-400 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] mx-auto leading-10">
    //       Join our community of passionate learners and start your journey
    //       towards success. You&apos;ll gain the knowledge and confidence to
    //       reach your goals.
    //     </p>
    //     <div className="flex justify-center items-center mt-16">
    //       <SignIn className="" />
    //     </div>
    //   </div>
    // </section >
    <div className="h-full w-full  bg-dark-300  dark:bg-grid-white/[0.2] bg-grid-sm-green-500/[0.35]  relative">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-dark-300  [mask-image:radial-gradient(ellipse_at_center,transparent_10%,#0D0F10)]"></div>
      <div className="container mx-auto text-white py-10 flex flex-col justify-center">
        <p className="text-center text-white z-30 text-[1.6rem] tracking-wider font-semibold md:hidden">
          Join 1000+ people building portfolio-worthy projects and unleash your
          potential.
        </p>
        <div className="hidden md:block z-30">
          <TypewriterEffectSmooth
            words={words}
            className="justify-center"
            cursorClassName="bg-green-500"
          />
          <TypewriterEffectSmooth
            words={words2}
            cursorClassName="bg-green-500"
            className="text-xl md:text-4xl lg:text-5xl justify-center -mt-4"
          />
        </div>
        <p className=" mt-4 text-sm md:text-lg  font-medium tracking-wide text-dark-700 w-full sm:w-[90%] md:w-[70%] text-center mx-auto ">
          Join our community of passionate learners and start your journey
          towards success. You&apos;ll gain the knowledge and confidence to
          reach your goals.
        </p>
        <div className="z-30 flex items-center justify-center mt-10">
          <Link
            href="/login"
            className="bg-green-500 text-white w-fit px-6 py-2 text-lg rounded-full font-medium tracking-wide "
          >
            Get Started 🚀
          </Link>
        </div>
      </div>
    </div>
  );
};
