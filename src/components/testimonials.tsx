import { testimonialsData } from "@/constants";
import { InfiniteMovingCards } from "./ui/infinite-moving-cards";

export const Testimonials = () => {
  return (
    <div className="my-20 h-[30rem] w-full dark:bg-transparent dark:bg-grid-white/[0.2] relative flex flex-col items-center justify-center overflow-hidden">
      <h1 className="text-3xl md:text-4xl font-poppins font-extrabold tracking-wide text-center mb-14 z-10">What Our Users Are Saying</h1>
      <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
        <InfiniteMovingCards
        items={testimonialsData}
        direction="right"
        speed="slow"
      />
        </div>
      </div>
    </div>
  );
};
