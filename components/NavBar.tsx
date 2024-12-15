"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";
type NavProps = {
  className?: string;
  id?: string;
};

const NavBar = ({ className, id }: NavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const [nestedDropdownOpen, setNestedDropdownOpen] = useState<string | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleDropdown = (menu: string) => {
    setOpenDropdown((current) => (current === menu ? null : menu));
    if (openDropdown !== menu) {
      setNestedDropdownOpen(null);
    }
  };

  const toggleNestedDropdown = (submenu: string) => {
    setNestedDropdownOpen((current) => (current === submenu ? null : submenu));
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((current) => !current);
  };

  const navLinks = [
    { label: "Home", href: "#home" },
    {
      label: "Motorcycle",
      submenu: [
        { label: "Sports", href: "#sports" },
        {
          label: "Ports",
          nestedSubmenu: [
            { label: "Item 1", href: "#port-type1" },
            { label: "Item 2", href: "#port-type2" },
          ],
        },
        { label: "Cruiser", href: "#cruiser" },
        { label: "Electric", href: "#electric" },
      ],
    },
    {
      label: "Videos",
      submenu: [
        { label: "Videos", href: "#videos" },
        {
          label: "Ports",
          nestedSubmenu: [
            { label: "Item 1", href: "#video-port1" },
            { label: "Item 2", href: "#video-port2" },
          ],
        },
      ],
    },
    { label: "Shooting", href: "#shooting" },
    { label: "Contact Us", href: "#contact" },
  ];

  return (
    <>
      <div
        className={`w-screen min-h-[16vh] bg-[#0E0B0B] ${
          pathname === "/" || pathname === "/videos" || pathname === "/shooting"
            ? "hidden"
            : ""
        }`}
      ></div>
      <nav
        className={cn(
          "absolute z-50 top-0 w-full bg-transparent text-white",
          className
        )}
        id={id}
      >
        <div
          className={`flex justify-between items-center px-6 md:px-20 ${
            pathname === "/" ||
            pathname === "/videos" ||
            pathname === "/shooting"
              ? "py-4"
              : ""
          }`}
        >
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={150}
              height={75}
              priority
            />
          </div>

          {/* Hamburger Icon for Mobile */}
          <button
            className="md:hidden flex items-center text-white focus:outline-none"
            onClick={toggleMobileMenu}
          >
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={
                  isMobileMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Navigation Links for Desktop */}
          <div className="hidden md:flex space-x-8 text-lg">
            {navLinks.map((link, index) => (
              <div key={index} className="relative">
                {link.submenu ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="flex items-center hover:text-primary transition"
                    >
                      {link.label}
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
                    {openDropdown === link.label && (
                      <div className="absolute left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 text-black">
                        {link.submenu.map((subLink, subIndex) => (
                          <div key={subIndex} className="relative">
                            {subLink.nestedSubmenu ? (
                              <>
                                <button
                                  onClick={() =>
                                    toggleNestedDropdown(subLink.label)
                                  }
                                  className="flex px-4 py-2 text-left justify-between items-center hover:text-primary rounded-lg"
                                >
                                  {subLink.label}
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
                                {nestedDropdownOpen === subLink.label && (
                                  <div className="absolute left-full top-0 mt-0 bg-white border border-gray-300 rounded-lg shadow-lg z-20 ">
                                    {subLink.nestedSubmenu.map(
                                      (nestedLink, nestedIndex) => (
                                        <Link
                                          key={nestedIndex}
                                          href={nestedLink.href}
                                          className="block px-4 py-2 hover:text-primary whitespace-nowrap rounded-lg"
                                        >
                                          {nestedLink.label}
                                        </Link>
                                      )
                                    )}
                                  </div>
                                )}
                              </>
                            ) : (
                              <Link
                                href={subLink.href}
                                className="block px-4 py-2 hover:text-primary rounded-lg"
                              >
                                {subLink.label}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={link.href}
                    className="hover:text-primary transition"
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>
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

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center">
            <button
              className="absolute top-4 right-4 text-white"
              onClick={toggleMobileMenu}
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="w-full px-4 flex flex-col items-center">
              {navLinks.map((link, index) => (
                <div key={index} className="text-white text-xl py-2 border-b">
                  {link.submenu ? (
                    <>
                      <button
                        onClick={() => toggleDropdown(link.label)}
                        className="flex justify-between w-full text-left items-center hover:text-primary"
                      >
                        {link.label}
                        <svg
                          className={`w-5 h-5 transition-transform ${
                            openDropdown === link.label ? "rotate-180" : ""
                          }`}
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
                      {openDropdown === link.label && (
                        <div className="ml-4 mt-2">
                          {link.submenu.map((subLink, subIndex) => (
                            <div key={subIndex} className="relative">
                              {subLink.nestedSubmenu ? (
                                <>
                                  <button
                                    onClick={() =>
                                      toggleNestedDropdown(subLink.label)
                                    }
                                    className="flex justify-between w-full text-sm text-left items-center hover:text-primary"
                                  >
                                    {subLink.label}
                                    <svg
                                      className={`w-4 h-4 transition-transform ${
                                        nestedDropdownOpen === subLink.label
                                          ? "rotate-90"
                                          : ""
                                      }`}
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
                                  {nestedDropdownOpen === subLink.label && (
                                    <div className="ml-4 mt-2">
                                      {subLink.nestedSubmenu.map(
                                        (nestedLink, nestedIndex) => (
                                          <Link
                                            key={nestedIndex}
                                            href={nestedLink.href}
                                            className="block text-sm py-2 hover:text-primary"
                                          >
                                            {nestedLink.label}
                                          </Link>
                                        )
                                      )}
                                    </div>
                                  )}
                                </>
                              ) : (
                                <Link
                                  href={subLink.href}
                                  className="block text-sm py-2 hover:text-primary"
                                >
                                  {subLink.label}
                                </Link>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-white text-xl py-2 block hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default NavBar;
