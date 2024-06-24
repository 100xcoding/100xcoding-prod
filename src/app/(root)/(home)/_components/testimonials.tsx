import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonialsData } from "@/constants";

export const Testimonials = () => {
  return (
    // TODO:FIX THE BORDER COLOR ADD LINKEDIIN TAG REMOVE GRID AND ALSO CHANGE THE COLOR OF THE CARDS

    <div className="my-20  w-full  flex flex-col items-center justify-center overflow-hidden container mx-auto">
      <span className="text-[#ee6eff] font-poppins font-bold text-2xl mb-7">
        Testimonials
      </span>
      <h1 className="text-3xl md:text-4xl font-openSans font-bold text-center mb-14 z-10">
        What Our Users Are Saying
      </h1>
      <div className="flex justify-center w-full overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl">
          <InfiniteMovingCards
            items={testimonialsData}
            direction="right"
            speed="slow"
          />
          <InfiniteMovingCards
            items={testimonialsData}
            direction="left"
            speed="slow"
          />
        </div>
      </div>
    </div>
  );
};
