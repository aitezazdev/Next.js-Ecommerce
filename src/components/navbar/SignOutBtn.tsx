"use client";

import { signOutUser } from "@/redux/auth/authThunk";
import { AppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { PulseLoader } from "react-spinners";
import { toast } from "react-toastify";

const SignOutBtn = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await dispatch(signOutUser()).unwrap();
      router.refresh();
      toast.success("Signed out successful");
    } catch (error: any) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="border border-zinc-800 px-5 py-2 text-zinc-300 font-semibold rounded-full text-xs uppercase tracking-widest cursor-pointer transition-all duration-250 hover:text-white hover:bg-zinc-900 hover:border-zinc-700 min-w-[100px] flex items-center justify-center">
      {loading ? <PulseLoader size={4} color="#fff" /> : "Sign Out"}
    </button>
  );
};

export default SignOutBtn;
