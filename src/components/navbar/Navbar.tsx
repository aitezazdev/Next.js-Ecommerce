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
    <nav className="bg-zinc-950/80 backdrop-blur-md text-white py-3 select-none fixed w-full z-50 border-b border-zinc-900/80">
      <div className="flex items-center justify-between md:py-2 py-1 px-4 md:px-8">
        <h1 className="text-lg md:text-xl font-bold tracking-wider">
          <Link href="/" className="hover:opacity-90 transition-opacity">ZAZ STORE</Link>
        </h1>

        <div className="hidden md:flex space-x-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-xs uppercase tracking-widest transition-colors font-medium ${
                  isActive
                    ? "text-white"
                    : "text-zinc-400 hover:text-white"
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

        <div className="flex md:hidden items-center gap-3">
          <CartBtn />
          <button
            onClick={openMobileMenu}
            className="p-2 rounded-lg hover:bg-zinc-900 border border-zinc-800 transition-colors"
            aria-label="Open mobile menu">
            <RxHamburgerMenu size={20} />
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
          className={`fixed top-0 right-0 h-full w-[280px] sm:w-[320px] bg-zinc-950/95 border-l border-zinc-900 shadow-2xl flex flex-col transform transition-transform duration-300 z-50 ${
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}>
          <div className="flex justify-between items-center px-5 py-4 border-b border-zinc-900">
            <h2 className="text-sm uppercase tracking-widest text-zinc-400 font-semibold">Menu</h2>
            <button
              className="text-white border rounded-lg p-1.5 border-zinc-800 cursor-pointer hover:bg-zinc-900 transition-all duration-300"
              onClick={closeMobileMenu}>
              <IoClose size={18} />
            </button>
          </div>

          <div className="p-4 border-b border-zinc-900">
            <Search onSearch={closeMobileMenu} />
          </div>

          <div className="flex flex-col space-y-1 p-4 grow overflow-y-auto">
            <Link
              href="/search"
              className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors font-medium text-xs uppercase tracking-wider"
              onClick={closeMobileMenu}>
              All Products
            </Link>
            <Link
              href="/search/shirts"
              className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors font-medium text-xs uppercase tracking-wider"
              onClick={closeMobileMenu}>
              Shirts
            </Link>
            <Link
              href="/search/shoes"
              className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors font-medium text-xs uppercase tracking-wider"
              onClick={closeMobileMenu}>
              Shoes
            </Link>
            <Link
              href="/search/pants"
              className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors font-medium text-xs uppercase tracking-wider"
              onClick={closeMobileMenu}>
              Pants
            </Link>
            <Link
              href="/search/caps"
              className="px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-colors font-medium text-xs uppercase tracking-wider"
              onClick={closeMobileMenu}>
              Caps
            </Link>
          </div>

          <div className="p-5 border-t border-zinc-900 bg-zinc-950 flex justify-center">
            {user ? <SignOutBtn /> : <LoginBtn />}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
