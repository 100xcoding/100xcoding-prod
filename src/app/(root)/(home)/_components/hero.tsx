import Link from "next/link";

export const Hero = () => {
  return (
    <section className="h-full w-full  bg-dark-300   bg-grid-green-500/[0.2] relative">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-dark-300  [mask-image:radial-gradient(ellipse_at_center,transparent_10%,#0D0F10)]"></div>
      <div className="flex  flex-col items-center justify-center pb-10 md:pb-10 pt-7 md:pt-14  text-white  h-full max-h-screen container mx-auto">
        <p className="bg-blue-600 text-blue-400 font-semibold tracking-wider text-base md:text-lg capitalize rounded-full w-fit px-6 py-2 z-30  mb-4 md:mb-0">
          Build real world projects 🚀
        </p>
        <h1 className="text-[1.7rem]  text-center z-30  md:text-[3.2rem] mt-2 lg:mt-4 font-medium md:tracking-wide   leading-[1.3] md:leading-[1.4]">
          Transform Your Coding Expertise with Interactive{" "}
          <span className="text-primary font-bold">Projects</span> and{" "}
          <span className="text-primary font-bold">Challenges.</span>
        </h1>
        <p className="my-4 tracking-wider capitalize text-lg md:text-3xl text-slate-200 italic font-semibold border-b border-green-500 z-30">
          Learn, Create, Build and Grow
        </p>
        <Link
          aria-label="expore challenges"
          href="/challenges"
          className="font-semibold z-30 tracking-wide uppercase bg-green-600 text-green-500 px-6 py-2 rounded-full md:w-fit text-center md:mt-10 mt-2 text-xl"
        >
          Explore now 🚀
        </Link>
      </div>
    </section>
  );
};
