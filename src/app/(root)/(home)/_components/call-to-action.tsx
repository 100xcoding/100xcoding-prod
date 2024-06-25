import { SignIn } from "@/components/sign-in";

export const CallToAction = () => {
  return (
    <div className="my-32  relative h-[32rem] opacity-90 rounded-3xl dark:bg-transparent dark:bg-grid-violet-400/[0.1] flex flex-col justify-center">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-[#030712] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_0.1%,black)]"></div>
      <div className="text-center z-30 container mx-auto">
        <h1 className="text-3xl md:text-4xl font-inter font-extrabold  sm:w-[90%] md:w-[80%] xl:w-[70%] mx-auto leading-7 text-white">
          Join 1000+ people building portfolio-worthy projects and unleash your
          potential.
        </h1>
        <p className="my-12 text-lg font-poppins font-medium tracking-wide text-slate-400 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] mx-auto leading-10">
          Join our community of passionate learners and start your journey
          towards success. You'll gain the knowledge and confidence to reach
          your goals.
        </p>
        <div className="flex justify-center items-center mt-16">
          <SignIn className="" />
        </div>
      </div>
    </div>
  );
};
