import { SignIn } from "./sign-in";

export const CallToAction = () => {
  return (
    <div className="my-32">
      <div className="text-center">
        <h1 className="text-3xl md:text-4xl font-inter font-extrabold tracking-wide text-violet-500  w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[65%] mx-auto leading-7">
          Join 1000+ people building portfolio-worthy projects and unleash
          your potential.
        </h1>
        <p className="my-12 text-lg font-poppins font-medium tracking-wide text-slate-300 w-full sm:w-[90%] md:w-[80%] lg:w-[75%] mx-auto leading-10">
          Are you ready to take your skills to the next level and achieve your
          dreams? Join our community of passionate learners and start your
          journey towards success. With our expert-led courses and personalized
          support, you'll gain the knowledge and confidence to reach your goals.
          Don't wait—transform your future now!
        </p>
        <div className="flex justify-center items-center mt-16"><SignIn className="bg-violet-700 hover:bg-violet-800" /></div>
      </div>
    </div>
  );
};
