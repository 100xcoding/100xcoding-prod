import { workData } from "@/constants";

export const HowItWorks = () => {
  return (
    <div className="my-20">
      <h1 className=" mb-14 text-center text-3xl md:text-4xl font-poppins text-slate-200 font-extrabold tracking-wider">
        How It Works?
      </h1>
      <div className="flex flex-wrap gap-14 justify-center items-center">
        {workData.map((item) => (
          <div
            className="w-[300px] md:w-[325px] lg:w-[340px] xl:w-[365px] h-auto md:h-[400px] px-5 py-10 rounded-2xl border-[1px] border-cyan-400 flex flex-col  items-center shadow-lg shadow-cyan-400 justify-center"
            key={item.id}
          >
            <span className="">{<item.icon size={60} />}</span>
            <h3 className="text-3xl font-bold font-openSans my-4 text-center tracking-wide">
              {item.title}
            </h3>
            <p className="text-lg font-medium font-poppins text-center text-slate-300">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
