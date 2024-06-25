import { workData } from "@/constants";

export const HowItWorks = () => {
  return (
    <div className="my-20">
      <h1 className=" mb-14 text-center text-3xl md:text-4xl font-inter text-slate-200 font-extrabold ">
        How It Works?
      </h1>
      <div className="flex flex-wrap gap-14 md:gap-8 justify-center items-center">
        {workData.map((item) => (
          <div
            className={`w-[300px] xl:w-[340px]   h-auto md:h-[400px] px-5 py-10 rounded-2xl flex flex-col  items-center justify-center  ${
              item.id == 1
                ? "bg-gradient-to-r from-violet-500 to-indigo-500"
                : item.id == 2
                  ? "bg-gradient-to-r from-yellow-600 to-orange-500"
                  : item.id == 3
                    ? "bg-gradient-to-r from-teal-600 to-cyan-500"
                    : ""
            }`}
            key={item.id}
          >
            <span className="">{<item.icon size={60} />}</span>
            <h3 className="text-3xl font-bold font-openSans my-4 text-center tracking-wide">
              {item.title}
            </h3>
            <p className="text-lg font-medium font-poppins text-center text-slate-100">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
