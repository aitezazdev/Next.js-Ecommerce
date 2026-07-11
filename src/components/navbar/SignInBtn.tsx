import Link from "next/link";
import React from "react";

const SignInBtn = () => {
  return (
    <Link href={"/auth/signin"} className="px-5 py-2 cursor-pointer rounded-full bg-white text-zinc-950 font-semibold text-xs uppercase tracking-widest hover:bg-zinc-200 transition-colors duration-300">
      Sign In
    </Link>
  );
};

export default SignInBtn;
