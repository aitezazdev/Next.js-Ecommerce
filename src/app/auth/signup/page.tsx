import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-[#171717] min-h-[90vh] w-full pt-20 md:pt-30">
      <div className="bg-[#000000] w-[calc(100%-32px)] sm:w-[420px] mx-auto rounded-lg p-6 sm:p-8 shadow-2xl">
        <div className="text-white">
          <h3 className="text-4xl text-center font-bold">Hey Stranger</h3>
          <p className="font-semibold text-center my-2 text-lg">
            Ready to shop the coolest gear?
          </p>
        </div>

        <SignUpForm />

        <p className="text-white text-center my-2">
          Already have an account?
          <Link
            href={"/auth/signin"}
            className="text-blue-500 hover:cursor-pointer px-1 hover:text-blue-600 transition-colors duration-300">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
