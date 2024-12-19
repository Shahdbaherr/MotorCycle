"use client";

import ImageCard from "./ImageCard";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

interface ImageData {
  id: number;
  acf: {
    image_urls: string[];
  };
}

const ShootingSection = () => {
  const [images, setImages] = useState<{ [key: number]: string[] }>({});
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchImages = async () => {
      if (images[page]) return;

      setIsLoading(true);
      try {
        const response = await fetch(
          `https://dashboard.maator.com/wp-json/wp/v2/images?acf_format=standard&_fields=acf.image_urls&page=${page}`
        );
        const data: ImageData[] = await response.json();

        const allImages = data.flatMap((item) => item.acf.image_urls || []);
        setImages((prev) => ({ ...prev, [page]: allImages }));
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [page, images]);

  const changePage = (newPage: number) => {
    setPage(newPage);
  };

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#0E0B0B";
  const textColor = theme === "light" ? "#000000" : "#FFFFFF";

  const imageSource =
    theme === "light" ? "/shootingLight.png" : "/Shooting.png";

  return (
    <div
      className="text-white min-h-screen overflow-hidden px-4 md:px-10"
      style={{ backgroundColor, color: textColor }}
    >
      <div>
        <ImageCard imgSrc={imageSource} />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {isLoading ? (
          Array(6)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="bg-gray-200 animate-pulse h-48 w-full rounded-md"
              ></div>
            ))
        ) : images[page] && images[page].length > 0 ? (
          images[page].map((imageUrl, index) => (
            <div key={index} className="relative w-full h-[400px]">
              <Image
                src={imageUrl}
                alt={`Image ${index + 1}`}
                className="rounded-xl object-cover"
                layout="fill"
              />
            </div>
          ))
        ) : (
          <div className="text-center text-xl">No images available.</div>
        )}
      </div>

      <div className="flex items-center justify-center mt-14 mb-4 space-x-4 ">
        <button
          onClick={() => changePage(1)}
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
              d="M12.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 111.414 1.414L9.414 10l3.293 3.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <button
          onClick={() => changePage(1)}
          disabled={page === 1}
          className={`text-xl relative ${
            page === 1
              ? "font-bold after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary"
              : "hover:text-gray-400"
          }`}
        >
          1
        </button>
        <button
          onClick={() => changePage(2)}
          disabled={page === 2}
          className={`text-xl relative ${
            page === 2
              ? "font-bold after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-primary"
              : "hover:text-gray-400"
          }`}
        >
          2
        </button>
        <button
          onClick={() => changePage(2)}
          disabled={page === 2}
          className={`flex items-center justify-center w-10 h-10 rounded-full ${
            page === 2
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
