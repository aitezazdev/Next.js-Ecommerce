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
        className="w-full md:w-48 lg:w-80 border border-gray-600 outline-none rounded-md py-1.5 px-3 placeholder:text-sm placeholder:text-gray-400"
        type="text"
        placeholder="Search for Products ..."
      />
      <button type="submit" className="relative right-7 text-gray-400">
        <IoSearch />
      </button>
    </Form>
  );
};

export default Search;
