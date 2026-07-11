"use client";

import {
  UserSignInFormData,
  UserFormSchemaSignIn,
} from "@/lib/validations/clientUserZod";
import { signInUser } from "@/redux/auth/authThunk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { PulseLoader } from "react-spinners";

const SignInForm = () => {
  const dispatch = useDispatch<any>();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<UserSignInFormData>({
    resolver: zodResolver(UserFormSchemaSignIn),
  });

  const onSubmit = async (data: UserSignInFormData) => {
    try {
      await dispatch(signInUser(data)).unwrap();
      toast.success("Signed in successfully!");
      reset();
      router.push("/");
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 mt-6 text-white">
      <div className="flex flex-col">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5" htmlFor="email">Email Address</label>
        <input
          {...register("email")}
          type="email"
          name="email"
          id="email"
          placeholder="name@example.com"
          className="outline-none bg-zinc-900/50 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-650 transition-all"
          autoComplete="off"
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>
      <div className="flex flex-col">
        <label className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1.5" htmlFor="password">Password</label>
        <input
          {...register("password")}
          type="password"
          name="password"
          id="password"
          placeholder="••••••••"
          className="outline-none bg-zinc-900/50 border border-zinc-800 focus:border-zinc-600 rounded-xl px-4 py-3 text-sm placeholder:text-zinc-650 transition-all"
          autoComplete="off"
        />
        {errors.password && (
          <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className={`px-4 py-3.5 my-2 transition-all duration-200 w-full cursor-pointer text-xs font-bold uppercase tracking-widest rounded-full min-h-[44px] flex items-center justify-center ${
          isSubmitting
            ? "bg-zinc-900 text-zinc-500 border border-zinc-800 cursor-not-allowed"
            : "bg-white text-zinc-950 hover:bg-zinc-200 shadow-xl"
        }`}>
        {isSubmitting ? <PulseLoader size={4} color="#52525b" /> : "Sign In"}
      </button>
    </form>
  );
};

export default SignInForm;
