"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";

type GroupData = {
  acf: any;
};

const CategoriesSection = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const imagesPerPage = 6;
  const { theme } = useTheme();
  const images = [
    { src: "https://ik.imagekit.io/xcyd6uv91/image(1).png", alt: "bike1" },
    { src: "https://ik.imagekit.io/xcyd6uv91/image(2).png", alt: "bike2" },
    { src: "https://ik.imagekit.io/xcyd6uv91/image(3).png", alt: "bike3" },
  ];

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://dashboard.maator.com/wp-json/wp/v2/motorcycles?acf_format=standard"
        );
        const data: GroupData[] = await response.json();
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

        setCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const startIndex = (page - 1) * imagesPerPage;
  const displayedCategories = categories.slice(
    startIndex,
    startIndex + imagesPerPage
  );
  const totalPages = Math.ceil(categories.length / imagesPerPage);

  const changePage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#0E0B0B";
  const textColor = theme === "light" ? "#000000" : "#FFFFFF";

  return (
    <div
      className="min-h-screen overflow-hidden px-4 md:px-10"
      style={{ backgroundColor, color: textColor }}
    >
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse h-48 w-full rounded-md"
              ></div>
            ))}
          <p className="text-center text-xl col-span-full">
            Loading categories...
          </p>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-5 mt-[16vh]">
            {displayedCategories.length === 0 ? (
              <div className="text-center text-xl">
                No categories available.
              </div>
            ) : (
              displayedCategories.map((category, index) => (
                <div
                  key={index}
                  className="relative w-full h-[521px] rounded-lg overflow-hidden"
                >
                  <Image
                    src={images[startIndex + index]?.src || "/default.jpg"}
                    alt={category.label}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60"></div>
                  <div className="absolute inset-x-0 bottom-4 text-center z-20 text-white">
                    <h3 className="text-3xl font-semibold">{category.label}</h3>
                    <a
                      href="#"
                      className="text-md  underline-offset-2 hover:underline "
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="flex items-center justify-center mt-8 mb-4 space-x-4">
            <button
              onClick={() => changePage(page - 1)}
              aria-disabled={page === 1}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                page === 1
                  ? "opacity-50 cursor-not-allowed bg-gray-500"
                  : "bg-primary text-white hover:opacity-80"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {[...Array(totalPages)].map((_, index) => {
              const pageNumber = index + 1;
              return (
                <button
                  key={pageNumber}
                  onClick={() => changePage(pageNumber)}
                  className={`text-xl relative ${
                    page === pageNumber
                      ? "font-bold after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary"
                      : "hover:text-gray-400"
                  }`}
                >
                  {pageNumber}
                </button>
              );
            })}
            <button
              onClick={() => changePage(page + 1)}
              aria-disabled={page === totalPages}
              className={`flex items-center justify-center w-10 h-10 rounded-full ${
                page === totalPages
                  ? "opacity-50 cursor-not-allowed bg-gray-500"
                  : "bg-primary text-white hover:opacity-80"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 001.414 0l4-4a1 1 0 000-1.414l-4-4a1 1 0 10-1.414 1.414L10.586 10l-3.293 3.293a1 1 0 000 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesSection;
