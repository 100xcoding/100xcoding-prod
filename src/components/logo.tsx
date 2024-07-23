import Image from "next/image";

export const Logo = () => {
  return <Image src="/logo.svg" alt="logo" width={300} height={300} />;
  // return (
  //   <h1 className="tracking-wider font-bold text-2xl italic">100xCoding.com</h1>
  // );
};
