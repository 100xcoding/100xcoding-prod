"use client";

import { ClockLoader } from "react-spinners";

export const Loader2 = () => {
  return (
    <div className="flex items-center justify-center h-full w-full">
      <ClockLoader size={30} color="#24AE7C" />
    </div>
  );
};
