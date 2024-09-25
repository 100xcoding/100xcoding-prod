import { Skeleton } from "@/components/ui/skeleton";
const temp = [1, 2, 3, 4, 5, 6, 7, 8];
const LoadingCard = () => {
  return (
    <div className="max-w-[320px]   h-[380px]  flex flex-col  gap-2  ">
      <Skeleton className="rounded-lg bg-dark-500 w-[320px] h-[360px]" />
      <div className="flex h-full  flex-col justify-between pb-4 w-full">
        <div className="flex justify-between ">
          <Skeleton className="h-5 w-[50px] bg-dark-500 rounded-full" />
          <Skeleton className="h-5 w-[50px] bg-dark-500 rounded-full" />
        </div>
        <Skeleton className="h-8 w-[320px] bg-dark-500  rounded-xl" />
        <Skeleton className="h-8 w-[180px] bg-dark-500  rounded-xl" />
        <Skeleton className="h-6 w-[320px] bg-dark-500 rounded-full" />
      </div>
    </div>
  );
};
const Loading = () => {
  return (
    <section className="container p-3 my-6 space-y-4 mx-auto">
      <div className="flex flex-wrap justify-center lg:justify-normal  items-center gap-4 mt-2">
        {temp.map((item) => (
          <LoadingCard key={item} />
        ))}
      </div>
    </section>
  );
};

export default Loading;
