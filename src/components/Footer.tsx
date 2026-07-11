import React from "react";
import { BiSolidCopyright } from "react-icons/bi";

const fetchCreatedDate = (): number => {
  const date = 2025;
  return date;
};

const fetchCurrentDate = (): number => {
  const date = new Date();
  return date.getFullYear();
};

const checkForYears = (): number | string => {
  const createdDate = fetchCreatedDate();
  const currentDate = fetchCurrentDate();

  if (createdDate === currentDate) {
    return createdDate;
  } else {
    return `${createdDate}-${currentDate}`;
  }
};

const Footer = () => {
  return (
    <footer className="bg-zinc-950 text-zinc-500 flex flex-col md:flex-row items-center justify-between py-8 px-6 md:px-10 border-t border-zinc-800 gap-4 text-xs uppercase tracking-wider">
      <div className="flex items-center space-x-6 flex-col md:flex-row gap-2 md:gap-0">
        <div className="flex items-center space-x-1.5">
          <BiSolidCopyright className="text-sm" />
          <span>{checkForYears()}</span>
        </div>
        <p className="normal-case tracking-normal">All rights reserved</p>
      </div>
      <div className="flex items-center space-x-1">
        <span>Created by</span>
        <a
          className="text-zinc-300 hover:text-brand font-medium transition-colors"
          href="https://github.com/aitezazdev"
          target="_blank"
          rel="noopener noreferrer">
          Aitezaz.
        </a>
      </div>
    </footer>
  );
};

export default Footer;
