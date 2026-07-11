"use client";

import React from "react";
import { IoSearch } from "react-icons/io5";
import Form from "next/form";
import { useSearchParams } from "next/navigation";

type Props = {
  onSearch?: () => void;
};

const Search = ({ onSearch }: Props) => {
  const searchParams = useSearchParams();
  return (
    <Form onSubmit={onSearch} action="/search" className="flex items-center">
      <input
        name="query"
        key={searchParams.get("query")}
        autoComplete="off"
        defaultValue={searchParams.get("query") || ""}
        className="w-full md:w-48 lg:w-80 bg-zinc-900/50 border border-zinc-800 focus:border-zinc-700 text-white outline-none rounded-full py-1.5 pl-4 pr-10 placeholder:text-xs placeholder:uppercase placeholder:tracking-wider placeholder:text-zinc-500 text-xs transition-all duration-300"
        type="text"
        placeholder="Search..."
      />
      <button type="submit" className="relative right-8 text-zinc-400 hover:text-white transition-colors cursor-pointer">
        <IoSearch size={14} />
      </button>
    </Form>
  );
};

export default Search;
