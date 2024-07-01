import { formatterDescription } from "@/lib/utils";
export const ChallengeCard = ({ title, description, level, design }: any) => {
  return (
    <div className="w-full md:w-[340px] lg:w-[420px] rounded-xl bg-[#17023A] md:h-[510px] p-3.5 border border-[#5a5461]">
      <div className="w-full">
        <div className="bg-gradient-to-b from-violet-400 to-pink-400 via-orange-300 p-5 rounded-lg">
          <img
            src={design}
            alt={title}
            className="object-cover hover:scale-105 duration-500 rounded-lg"
          />
        </div>
      </div>
      <div className="pt-4 pl-1">
        <div className="flex font-lato text-lg font-medium    ">
          <p className="dark:bg-primary p-1.5 rounded-lg">{level}</p>
        </div>
        <h1 className="font-raleway font-bold text-2xl my-5">{title}</h1>
        <p className="font-poppins text-base text-muted-foreground">
          {formatterDescription(description)}
        </p>
      </div>
    </div>
  );
};
