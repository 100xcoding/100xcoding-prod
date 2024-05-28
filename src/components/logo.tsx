import Image from "next/image";
import React from "react";

export const logo = () => {
  return <Image src="/logo.svg" alt="logo" width={130} height={100}></Image>;
};
