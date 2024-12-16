"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Image from "next/image";
import ImageCard from "./ImageCard";
import notFound from "@/app/not-found";
import { getImages } from "@/lib/wordpress";

const ShootingSection = () => {
  const [images, setImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const { theme } = useTheme();
  const imagesPerPage = 6;

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const allImages = await getImages();
        setImages(allImages); // Set all image URLs
      } catch (error) {
        console.error("Error fetching images:", error);
        notFound();
      }
    };

    fetchImages();
  }, []);

  const startIndex = (page - 1) * imagesPerPage;
  const displayedImages = images.slice(startIndex, startIndex + imagesPerPage);
  const totalPages = Math.ceil(images.length / imagesPerPage);

  const changePage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#0E0B0B";
  const textColor = theme === "light" ? "#000000" : "#FFFFFF";
  const imageSource =
    theme === "light" ? "/shootingLight.png" : "/Shooting.png";

  return (
    <div
      className="min-h-screen overflow-hidden px-4 md:px-10"
      style={{ backgroundColor, color: textColor }}
    >
      <div>
        <ImageCard imgSrc={imageSource} />
      </div>

      {/* Images Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-5 mt-10">
        {displayedImages.length === 0 ? (
          <div className="text-center text-xl">No images available.</div>
        ) : (
          displayedImages.map((imageUrl, index) => (
            <div key={index} className="relative w-full h-[300px]">
              <Image
                src={imageUrl}
                alt={`Image ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          ))
        )}
      </div>
      <div className="flex items-center justify-center mt-8 mb-4 space-x-4">
        <button
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
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
              d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 1 1 1 1 1.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z"
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
          disabled={page === totalPages}
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
  );
};

export default ShootingSection;
