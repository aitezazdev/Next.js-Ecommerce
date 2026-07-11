"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

const CollectionSidebar = () => {
  const pathname = usePathname();
  const items = [
    { href: "/search", label: "All" },
    { href: "/search/shirts", label: "Shirts" },
    { href: "/search/shoes", label: "Shoes" },
    { href: "/search/pants", label: "Pants" },
    { href: "/search/caps", label: "Caps" },
  ];

  return (
    <aside className="w-full md:w-auto md:px-4 md:pr-10 md:mr-7 shrink-0">
      {}
      <div className="hidden md:block">
        <strong className="text-zinc-550 uppercase tracking-widest text-[10px] font-bold block mb-3">Collections</strong>
        <div className="flex flex-col space-y-2">
          {items.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                className={`text-xs uppercase tracking-wider transition-colors duration-250 ${
                  isActive ? "text-brand font-semibold" : "text-zinc-450 hover:text-white"
                }`}
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {}
      <div className="md:hidden px-4 mb-4 overflow-x-auto scrollbar-none flex gap-2 w-full py-1">
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              className={`px-4 py-1.5 rounded-full text-[10px] uppercase tracking-wider font-semibold border transition-all shrink-0 ${
                isActive
                  ? "bg-brand text-white border-zinc-200 shadow-md"
                  : "bg-zinc-900/50 text-zinc-400 border-zinc-800 hover:text-white hover:border-zinc-800"
              }`}
              href={item.href}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </aside>
  );
};

export default CollectionSidebar;