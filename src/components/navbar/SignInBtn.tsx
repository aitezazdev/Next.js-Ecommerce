import Link from "next/link";
import React from "react";

const SignInBtn = () => {
  return (
    <Link href={"/auth/signin"} className="px-5 py-2 cursor-pointer rounded-full bg-brand text-white font-semibold text-xs uppercase tracking-widest hover:bg-brand-hover hover:scale-[1.01] active:scale-[0.99] transition-all duration-300">
      Sign In
    </Link>
  );
};

export default SignInBtn;
