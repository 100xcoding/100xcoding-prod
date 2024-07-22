import Link from "next/link";
import React from "react";

const VerificationPage = () => {
  return (
    <div className="bg-dark-300 text-white flex items-center justify-center h-screen w-full">
      <div className="w-[400px] p-8 rounded-xl bg-dark-500 text-white space-y-4 text-center">
        <h1 className=" font-medium tracking-wide text-4xl capitalize">
          Check your email
        </h1>
        <p className="text-lg tracking-wide">
          A sign in link has been sent to <br /> your email address.
          <br /> via
        </p>
        <Link
          aria-label="100xcoding"
          href="/"
          className=" font-bold text-2xl block pt-6"
        >
          100xCoding.com
        </Link>
      </div>
    </div>
  );
};

export default VerificationPage;
