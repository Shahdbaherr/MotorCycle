"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Define types for API response
interface ImageData {
  id: number;
  acf: {
    image_urls: string[]; // Array of image URLs from ACF field
  };
}

type ShootingProps = {
  condition: boolean;
};

const Shooting = ({ condition }: ShootingProps) => {
  const [images, setImages] = useState<string[]>([]); // Store image URLs

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://maator.com/wp-json/wp/v2/images?acf_format=standard&_fields=acf.image_urls"
        );
        const data: ImageData[] = await response.json();

        // Extract all image URLs
        const allImages = data.flatMap((item) => item.acf.image_urls || []);

        // Select images based on the condition
        const selectedImages = condition ? allImages.slice(0, 3) : allImages;

        setImages(selectedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [condition]); // Re-fetch if the condition changes

  return (
    <div
      className="text-white min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0E0B0B" }}
    >
      {/* Header Section */}
      <div className="mt-[3vh] flex justify-center relative">
        <Image src="/Gallery.png" alt="gallery" width={300} height={30} />
        <span className="absolute inset-0 flex justify-center items-center text-3xl font-[600] text-white">
          Shooting
        </span>
      </div>

      {/* Images Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 px-6">
        {images.length === 0 ? (
          <div className="text-center text-xl">No images available.</div>
        ) : (
          images.map((imageUrl, index) => (
            <div key={index} className="relative">
              <Image
                src={imageUrl}
                alt={`Image ${index + 1}`}
                width={480}
                height={250}
                className=" rounded-xl"
              />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center items-center pb-10">
        <Link href="#" passHref>
          <button className="inline-block px-6 py-1 text-white border rounded-lg border-white uppercase tracking-wide hover:bg-white hover:text-black transition duration-200 text-xl">
            SHOW MORE
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Shooting;
