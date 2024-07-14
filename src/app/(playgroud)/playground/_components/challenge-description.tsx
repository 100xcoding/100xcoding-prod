import Image from "next/image";
import { getImageUrl } from "@/lib/utils";

export const ChallengeDescription = ({
  image,
  title,
  description,
  about,
  resource,
}: {
  image: string;
  title: string;
  description: string;
  about: string;
  resource: string;
}) => {
  return (
    <div className="bg-dark-400 h-full px-4 py-2 overflow-y-auto remove-scrollbar">
      <h1 className="font-bold text-xl text-white mb-2 capitalize ">{title}</h1>
      <p className="text-sm text-dark-700 mb-4">{description}</p>
      <div className="relative aspect-[4/3]">
        <Image
          src={getImageUrl(image!)}
          width={400}
          height={300}
          className="w-full"
          alt={` Challenge`}
        />
      </div>
      <h2 className="mt-4 mb-2 text-white text-lg font-semibold">
        Challenge Requirements
      </h2>
      <div className="">{about}</div>
      <h2 className="mt-4 mb-2 text-white text-lg font-semibold">Resources</h2>
      <div className="">{resource}</div>
    </div>
  );
};
