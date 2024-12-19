"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";

type NavProps = {
  className?: string;
  id?: string;
};

type SubLink = {
  label: string;
  href?: string;
  nestedSubmenu?: SubLink[];
};

type Category = {
  label: string;
  items: { name: string; type: string }[];
};

const NavBar = ({ className, id }: NavProps) => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [nestedDropdownOpen, setNestedDropdownOpen] = useState<string | null>(
    null
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [motorcycleCategories, setMotorcycleCategories] = useState<Category[]>(
    []
  );
  const pathname = usePathname();
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dashboard.maator.com/wp-json/wp/v2/motorcycles?acf_format=standard"
        );
        const data = await response.json();
        const categoryMap: Record<string, any[]> = {};
        data.forEach((item: any) => {
          if (item.acf?.category?.name && item.acf?.type) {
            if (!categoryMap[item.acf.category.name]) {
              categoryMap[item.acf.category.name] = [];
            }
            categoryMap[item.acf.category.name].push({
              name: item.acf.category.name,
              type: item.acf.type,
            });
          }
        });
        const categories = Object.keys(categoryMap).map((categoryName) => ({
          label: categoryName,
          items: categoryMap[categoryName],
        }));

        setMotorcycleCategories(categories);
      } catch (error) {
        console.error("Error fetching motorcycle categories:", error);
      }
    };

    fetchCategories();
  }, []);

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

  const navLinks: SubLink[] = [
    { label: "Home", href: "/" },
    {
      label: "Motorcycle",
      nestedSubmenu: motorcycleCategories.map((category) => ({
        label: category.label,
        nestedSubmenu: category.items.map((item) => ({
          label: item.type,
          href: `/${category.label}/${item.type}`,
        })),
      })),
    },
    {
      label: "Videos",
      href: "/videos",
    },
    { label: "Shooting", href: "/shooting" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <div
        className={`w-screen min-h-[16vh] bg-[#0E0B0B] ${
          pathname === "/" ||
          pathname === "/videos" ||
          pathname === "/shooting" ||
          pathname === "/motorcycles"
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
        {/* Desktop Menu */}
        <div className="hidden  md:flex justify-between items-center px-6 md:px-20">
          <div className="flex items-center">
            <Link href="/">
              <Image
                src="/logo.png"
                alt="logo"
                width={150}
                height={75}
                priority
              />
            </Link>
          </div>
          <div className="flex space-x-8 text-lg">
            {navLinks.map((link, index) => (
              <div key={index} className="relative hover:text-primary">
                {link.nestedSubmenu ? (
                  <>
                    <button
                      onClick={() => toggleDropdown(link.label)}
                      className="flex items-center hover:text-primary"
                    >
                      {link.label}
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                    {openDropdown === link.label && (
                      <div className="absolute bg-white text-black rounded shadow-md mt-2">
                        {link.nestedSubmenu.map((sub, subIndex) => (
                          <div key={subIndex} className="relative">
                            <button
                              onClick={() => toggleNestedDropdown(sub.label)}
                              className="px-4 py-2 hover:text-primary flex justify-between items-center w-[10vw]"
                            >
                              {sub.label}
                              {sub.nestedSubmenu && (
                                <svg
                                  className="w-4 h-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              )}
                            </button>
                            {nestedDropdownOpen === sub.label &&
                              sub.nestedSubmenu && (
                                <div className="absolute left-full top-0 mt-0 bg-white text-black rounded shadow-md w-full">
                                  {sub.nestedSubmenu.map(
                                    (nested, nestedIndex) => (
                                      <Link
                                        key={nestedIndex}
                                        href={nested.href || "#"}
                                        className="block px-4 py-2 hover:text-primary"
                                      >
                                        {nested.label}
                                      </Link>
                                    )
                                  )}
                                </div>
                              )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={link.href || "#"}>{link.label}</Link>
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

        <button
          className="md:hidden flex items-center text-white px-6"
          onClick={toggleMobileMenu}
        >
          <Image
            src="/logo.png"
            alt="logo"
            width={40}
            height={20}
            className="block md:hidden"
          />
          <svg
            className="w-6 h-6 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black z-40 flex flex-col items-center justify-center">
            <button
              className="md:hidden flex items-center text-white"
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
                  <button
                    onClick={() => toggleDropdown(link.label)}
                    className="flex justify-between w-full text-left items-center hover:text-primary"
                  >
                    {link.label}
                    {link.nestedSubmenu && (
                      <svg
                        className={`w-5 h-5 transition-transform ${
                          openDropdown === link.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    )}
                  </button>

                  {openDropdown === link.label && link.nestedSubmenu && (
                    <div className="ml-4 mt-2">
                      {link.nestedSubmenu.map((sub, subIndex) => (
                        <div key={subIndex} className="relative">
                          {sub.nestedSubmenu ? (
                            <>
                              <button
                                onClick={() => toggleNestedDropdown(sub.label)}
                                className="flex justify-between w-full text-sm text-left items-center hover:text-primary"
                              >
                                {sub.label}
                                <svg
                                  className={`w-4 h-4 transition-transform ${
                                    nestedDropdownOpen === sub.label
                                      ? "rotate-90"
                                      : ""
                                  }`}
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M9 5l7 7-7 7"
                                  />
                                </svg>
                              </button>
                              {nestedDropdownOpen === sub.label &&
                                sub.nestedSubmenu && (
                                  <div className="ml-4 mt-2">
                                    {sub.nestedSubmenu.map(
                                      (nested, nestedIndex) => (
                                        <Link
                                          key={nestedIndex}
                                          href={nested.href || "#"}
                                          className="block text-sm py-2 hover:text-primary"
                                        >
                                          {nested.label}
                                        </Link>
                                      )
                                    )}
                                  </div>
                                )}
                            </>
                          ) : (
                            <Link
                              href={sub.href || "#"}
                              className="text-white text-xl py-2 block hover:text-primary"
                            >
                              {sub.label}
                            </Link>
                          )}
                        </div>
                      ))}
                    </div>
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
