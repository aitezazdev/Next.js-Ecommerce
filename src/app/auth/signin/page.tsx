import SignForm from "@/components/auth/SignInForm";
import Link from "next/link";
import React from "react";

const page = () => {
  return (
    <div className="bg-zinc-950 min-h-[90vh] w-full pt-28 pb-12 flex items-center justify-center px-4">
      <div className="bg-zinc-900/40 border border-zinc-800 w-full sm:w-[420px] rounded-2xl p-6 sm:p-10 shadow-2xl">
        <div className="text-white text-center mb-6">
          <h3 className="text-xl uppercase tracking-widest font-bold">Welcome Back</h3>
          <p className="text-xs uppercase tracking-wider text-zinc-450 mt-2 font-medium">
            Enter details to access your account
          </p>
        </div>
        
        <SignForm />

        <p className="text-zinc-550 text-center text-xs mt-6 uppercase tracking-wider font-semibold">
          New here?
          <Link
            href={"/auth/signup"}
            className="text-brand hover:underline px-2 transition-all">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default page;
