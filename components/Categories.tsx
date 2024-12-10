"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const Categories = () => {
  const [visibleImages, setVisibleImages] = useState(3); // Initial visible images
  const [showAll, setShowAll] = useState(false); // Toggle state for "Show More" and "Show Less"

  const images = [
    "/images/bike1.jpg",
    "/images/bike2.jpg",
    "/images/bike3.jpg",
    "/images/bike3.jpg",
    "/images/bike2.jpg",
    "/images/bike1.jpg",
  ]; // Array of image paths

  const toggleImages = () => {
    if (showAll) {
      setVisibleImages(3); // Show only the first 3 images
    } else {
      setVisibleImages(images.length); // Show all images
    }
    setShowAll(!showAll); // Toggle the button state
  };

  return (
    <div
      className="text-white min-h-screen overflow-hidden"
      style={{
        backgroundColor: "#0E0B0B",
      }}
    >
      {/* Header Section */}
      <div className="mt-[6vh] flex justify-center relative">
        <Image src="/Models.png" alt="models" width={300} height={30} />
        <span className="absolute inset-0 flex justify-center items-center text-3xl font-[600] text-white">
          Categories
        </span>
      </div>
      {/* Models Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6  ">
        {images.slice(0, visibleImages).map((src, index) => (
          <div key={index} className="relative mx-auto w-full h-[521px]">
            {/* Image */}
            <Image
              src={src}
              alt={`Bike ${index + 1}`}
              layout="fill"
              quality={100}
              className="rounded-lg"
              objectFit="cover"
            />
            {/* Gradient Overlay */}
            <div
              className="absolute inset-0 w-full rounded-lg"
              style={{
                height: "100%",
                background:
                  "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.72) 100%)",
                zIndex: 10,
              }}
            ></div>
            {/* Text Overlay */}
            <div className="absolute inset-x-0 bottom-0 text-center p-2 z-20">
              <h3 className="text-2xl font-semibold">HONDA</h3>
              <p className="text-lg">CB650F 2017 RED&BLACK</p>
              <a
                href="#"
                className="text-white-500 text-md mt-3 hover:underline  transition"
              >
                Learn more
              </a>
            </div>
          </div>
        ))}
      </div>
      {/* Toggle Button */}
      <div className="flex justify-center items-center pb-10">
        <Link href="#" passHref>
          <button className="inline-block px-6 py-2 mt-6 text-white border rounded-lg border-white uppercase tracking-wide hover:bg-white hover:text-black transition duration-200 text-xl">
            {showAll ? "Show Less" : "Show More"}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
