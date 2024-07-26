"use server";
import Link from "next/link";

export const LinkCard = ({ url, icon: Icon }: any) => {
  return (
    <Link
      aria-label={`${Icon}`}
      href={url}
      className="bg-blue-600 p-1  text-blue-200 rounded-full w-10 text-2xl h-10 items-center flex justify-center"
    >
      <Icon />
    </Link>
  );
};
