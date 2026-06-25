"use client";
import Link from "next/link";
import React, { useState } from "react";
import Search from "./Search";
import LoginBtn from "./SignInBtn";
import CartBtn from "./CartBtn";
import SignOutBtn from "./SignOutBtn";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IoClose } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const { user } = useSelector((state: RootState) => state.auth);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const pathname = usePathname();
  const navLinks = [
    { href: "/search", label: "All" },
    { href: "/search/shirts", label: "Shirts" },
    { href: "/search/shoes", label: "Shoes" },
  ];

  const openMobileMenu = () => setIsMobileMenuOpen(true);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <nav className="bg-[#171717] text-white py-2 select-none fixed w-full z-50">
      <div className="flex items-center justify-between md:py-2 py-1 px-4 md:px-10">
        <h1 className="text-lg md:text-xl font-bold">
          <Link href="/">ZAZ STORE.</Link>
        </h1>

        <div className="hidden md:flex space-x-5 text-gray-400">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  isActive
                    ? "text-blue-500 font-bold"
                    : "text-gray-400 hover:text-white"
                }`}>
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden md:block">
          <Search />
        </div>

        <div className="hidden md:flex gap-4 items-center">
          <CartBtn />
          {user ? <SignOutBtn /> : <LoginBtn />}
        </div>

        <div className="flex md:hidden items-center gap-2">
          <CartBtn />
          <button
            onClick={openMobileMenu}
            className="p-2 rounded-md hover:bg-gray-700 transition-colors"
            aria-label="Open mobile menu">
            <RxHamburgerMenu size={24} />
          </button>
        </div>
      </div>

      <div
        onClick={closeMobileMenu}
        className={`fixed inset-0 z-50 cursor-pointer bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}>
        <div
          onClick={(e) => e.stopPropagation()}
          className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-[#121212] border-l border-gray-800/80 shadow-2xl flex flex-col transform transition-transform duration-300 z-50 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <div className="flex justify-between items-center px-5 py-4 border-b border-gray-800/60">
            <h2 className="text-lg font-bold tracking-wide">Menu</h2>
            <button
              className="text-xl border rounded-md p-1.5 border-gray-700 cursor-pointer hover:bg-gray-800 transition-all duration-300"
              onClick={closeMobileMenu}>
              <IoClose size={20} />
            </button>
          </div>

          <div className="p-4 border-b border-gray-800/60">
            <Search onSearch={closeMobileMenu} />
          </div>

          <div className="flex flex-col space-y-1.5 p-4 grow overflow-y-auto">
            <Link
              href="/search"
              className="px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-md transition-colors font-medium text-sm"
              onClick={closeMobileMenu}>
              All Products
            </Link>
            <Link
              href="/search/shirts"
              className="px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-md transition-colors font-medium text-sm"
              onClick={closeMobileMenu}>
              Shirts
            </Link>
            <Link
              href="/search/shoes"
              className="px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-md transition-colors font-medium text-sm"
              onClick={closeMobileMenu}>
              Shoes
            </Link>
            <Link
              href="/search/pants"
              className="px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-md transition-colors font-medium text-sm"
              onClick={closeMobileMenu}>
              Pants
            </Link>
            <Link
              href="/search/caps"
              className="px-4 py-2.5 text-gray-400 hover:text-white hover:bg-gray-800/60 rounded-md transition-colors font-medium text-sm"
              onClick={closeMobileMenu}>
              Caps
            </Link>
          </div>

          <div className="p-5 border-t border-gray-800/60 bg-[#171717]/50 flex justify-center">
            {user ? <SignOutBtn /> : <LoginBtn />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
