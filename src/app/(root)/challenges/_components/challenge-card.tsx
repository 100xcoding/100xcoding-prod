import { formatterDescription } from "@/lib/utils";
export const ChallengeCard = ({ title, description, level, design }: any) => {
  return (
    <div className="w-full md:w-[340px] lg:w-[420px] rounded-xl bg-[#251738] md:h-[510px] p-3.5 border border-[#5a5461]">
      <div className="w-full">
        <div className="bg-gradient-to-b from-violet-400 to-pink-400 via-orange-300 p-5 rounded-lg">
          <img
            src={design}
            alt={title}
            className="object-cover hover:scale-105 duration-500"
          />
        </div>
      </div>
      <div className="pt-4 pl-1">
        <h1 className="font-raleway font-bold text-2xl">{title}</h1>
        <div className="flex justify-end my-4 font-lato text-lg font-medium">
          {level}
        </div>
        <p className="font-poppins text-base text-slate-200">
          {formatterDescription(description)}
        </p>
      </div>
    </div>
  );
};
