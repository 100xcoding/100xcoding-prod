import { Card } from "@/components/ui/card";
import { workData } from "@/constants";

export const HowItWorks = () => {
  return (
    <div className="my-20">
      <h1 className=" mb-14 text-center text-3xl md:text-4xl  text-slate-200 font-extrabold ">
        How It Works?
      </h1>
      <div className="flex flex-wrap gap-14 md:gap-8 justify-center items-center">
        {workData.map((item) => (
          <Card
            className={`w-[300px] xl:w-[360px]   h-auto md:h-[400px] px-5 py-10 rounded-2xl flex flex-col  items-center justify-center border-none shadow-lg ${
              item.id == 1
                ? "bg-blue-600 text-blue-500"
                : item.id == 2
                  ? " text-teal-200 bg-teal-800"
                  : item.id == 3
                    ? "bg-green-600 text-green-500"
                    : ""
            }`}
            key={item.id}
          >
            <span className="">{<item.icon size={60} />}</span>
            <h2 className="text-3xl font-bold my-4 text-center tracking-wide">
              {item.title}
            </h2>
            <p className="text-lg font-medium text-center text-slate-100">
              {item.description}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};
