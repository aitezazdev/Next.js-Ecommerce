import SignUpForm from "@/components/auth/SignUpForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-zinc-950 min-h-[90vh] w-full pt-28 pb-12 flex items-center justify-center px-4">
      <div className="bg-zinc-900/40 border border-zinc-800/80 w-full sm:w-[420px] rounded-2xl p-6 sm:p-10 shadow-2xl">
        <div className="text-white text-center mb-6">
          <h3 className="text-xl uppercase tracking-widest font-bold">Create Account</h3>
          <p className="text-xs uppercase tracking-wider text-zinc-450 mt-2 font-medium">
            Join us to explore the premium clothing collections
          </p>
        </div>

        <SignUpForm />

        <p className="text-zinc-550 text-center text-xs mt-6 uppercase tracking-wider font-semibold">
          Already registered?
          <Link
            href={"/auth/signin"}
            className="text-white hover:underline px-2 transition-all">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
