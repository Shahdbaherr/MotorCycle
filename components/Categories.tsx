"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageCard from "./ImageCard";
type categoriesProps = {
  home: boolean;
};

type GroupData = {
  acf: any;
  group_urls: string[];
};

const Categories = (home: categoriesProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://maator.com/wp-json/wp/v2/groups?acf_format=standard&_fields=acf.group_urls"
        );
        const data: GroupData[] = await response.json();
        const fetchedImages = data.flatMap((group) => group.acf.group_urls);
        setImages(fetchedImages);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  return (
    <div
      className="text-white min-h-screen overflow-hidden px-4 md:px-10"
      style={{
        backgroundColor: "#0E0B0B",
      }}
    >
      {/* Header Section */}
      <div>
        <ImageCard imgSrc="/Models (2).png" />
      </div>

      {/* Models Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-2">
        {loading ? (
          <p className="col-span-full text-center">Loading images...</p>
        ) : (
          images.slice(0, home ? 3 : images.length).map((src, index) => (
            <div
              key={index}
              className="relative w-full h-[521px] rounded-lg overflow-hidden"
            >
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                layout="fill"
                quality={100}
                className="rounded-lg object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.8) 100%)",
                  zIndex: 10,
                }}
              ></div>
              <div className="absolute inset-x-0 bottom-4 text-center z-20 text-white">
                <h3 className="text-2xl font-semibold">HONDA</h3>
                <p className="text-lg">CB650F 2017 RED&BLACK</p>
                <a
                  href="#"
                  className="text-md mt-2 underline-offset-2 hover:underline"
                  style={{
                    textDecorationColor: "white",
                    textDecorationThickness: ".8px",
                  }}
                >
                  Learn more
                </a>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex justify-center items-center mt-10 pb-10">
        <Link href="#" passHref>
          <button className="px-6 py-1 text-white border rounded-lg border-white uppercase tracking-wide hover:bg-white hover:text-black transition duration-200 text-xl">
            SHOW MORE
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
