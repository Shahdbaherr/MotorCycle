"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";

type NavProps = {
  className?: string;
  id?: string;
};

const NavBar = ({ className, id }: NavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [nestedDropdownOpen, setNestedDropdownOpen] = useState<string | null>(
    null
  );

  const toggleDropdown = (menu: string) => {
    setOpenDropdown((current) => (current === menu ? null : menu));
    // Close nested dropdowns when switching main dropdowns
    if (openDropdown !== menu) {
      setNestedDropdownOpen(null);
    }
  };

  const toggleNestedDropdown = (submenu: string) => {
    setNestedDropdownOpen((current) => (current === submenu ? null : submenu));
  };

  return (
    <nav
      className={cn(
        "absolute z-50 top-0 w-full bg-transparent text-white ",
        className
      )}
      id={id}
    >
      <div className="flex justify-between items-center px-6 md:px-20 py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="logo" width={150} height={75} priority />
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex space-x-8 text-lg">
          <Link href="#home" className="hover:text-primary transition">
            Home
          </Link>
          <div className="relative">
            <button
              onClick={() => toggleDropdown("motorcycle")}
              className="flex items-center hover:text-primary transition"
            >
              Motorcycle
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {openDropdown === "motorcycle" && (
              <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 text-black">
                <Link
                  href="#sports"
                  className="block px-4 py-2 hover:text-primary rounded-lg"
                >
                  Sports
                </Link>
                <div className="relative">
                  <button
                    onClick={() => toggleNestedDropdown("ports")}
                    className="flex px-4 py-2 w-full text-left  justify-between items-center hover:text-primary rounded-lg"
                  >
                    Ports
                    <svg
                      className="w-4 h-4 ml-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      ></path>
                    </svg>
                  </button>
                  {nestedDropdownOpen === "ports" && (
                    <div className="absolute w-[5vw] left-full top-0 mt-0 bg-white border border-gray-300 rounded-lg shadow-lg z-20">
                      <Link
                        href="#port-type1"
                        className="block px-4 py-2 hover:text-primary rounded-lg"
                      >
                        Item 1
                      </Link>
                      <Link
                        href="#port-type2"
                        className="block px-4 py-2 hover:text-primary rounded-lg"
                      >
                        Item 2
                      </Link>
                    </div>
                  )}
                </div>
                <Link
                  href="#cruiser"
                  className="block px-4 py-2 hover:text-primary rounded-lg"
                >
                  Cruiser
                </Link>
                <Link
                  href="#electric"
                  className="block px-4 py-2 hover:text-primary rounded-lg"
                >
                  Electric
                </Link>
              </div>
            )}
          </div>
          <div className="relative">
            <button
              onClick={() => toggleDropdown("videos")}
              className="flex items-center hover:text-primary transition"
            >
              Videos
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {openDropdown === "videos" && (
              <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 text-black">
                <Link
                  href="#reviews"
                  className="block px-4 py-2 hover:text-primary rounded-lg"
                >
                  Reviews
                </Link>
                <Link
                  href="#trailers"
                  className="block px-4 py-2 hover:text-primary rounded-lg"
                >
                  Trailers
                </Link>
                <Link
                  href="#tutorials"
                  className="block px-4 py-2 hover:text-primary rounded-lg"
                >
                  Tutorials
                </Link>
              </div>
            )}
          </div>
          <Link href="#shooting" className="hover:text-primary transition">
            Shooting
          </Link>
          <Link href="#contact" className="hover:text-primary transition">
            Contact Us
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center relative w-[289px]">
          <input
            type="text"
            placeholder="Search for motorcycle"
            className="w-full h-[48px] px-4 pr-12 rounded-full bg-transparent text-white border border-white focus:outline-none"
          />
          <button className="absolute right-2 flex items-center justify-center w-[32px] h-[32px] bg-white rounded-full">
            <svg
              className="w-6 h-6 text-primary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="10" cy="10" r="7" strokeWidth="2"></circle>
              <line x1="16" y1="16" x2="20" y2="20" strokeWidth="2"></line>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;