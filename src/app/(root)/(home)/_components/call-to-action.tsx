import { SignIn } from "@/components/sign-in";

export const CallToAction = () => {
  return (
    <div className="my-32 bg-primary py-7 opacity-90 rounded-3xl">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-inter font-extrabold tracking-wide   w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto leading-7">
          Join 1000+ people building portfolio-worthy projects and unleash your
          potential.
        </h1>
        <p className="my-12 text-lg font-poppins font-medium tracking-wide text-slate-300 w-full sm:w-[90%] md:w-[70%] lg:w-[50%] mx-auto leading-10">
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
