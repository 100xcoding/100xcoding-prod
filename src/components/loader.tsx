"use client";
import { GridLoader } from "react-spinners";
export const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <GridLoader size={20} color="#24AE7C" />
    </div>
  );
};
