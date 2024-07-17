import { auth } from "@/auth";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import Link from "next/link";

export const CallToAction = async () => {
  const session = await auth();
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
    <div className="h-full w-full  bg-dark-300  dark:bg-grid-white/[0.2] bg-grid-sm-green-500/[0.35]  relative">
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
          {session?.user ? (
            <Link
              href="/login"
              className="bg-green-500 text-white w-fit px-6 py-2 text-lg rounded-full font-medium tracking-wide "
            >
              Take a challenge 🚀
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-green-500 text-white w-fit px-6 py-2 text-lg rounded-full font-medium tracking-wide "
            >
              Get Started 🚀
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
