"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ImageCard from "./ImageCard";
import { useTheme } from "next-themes";

type categoriesProps = {
  home: boolean;
};

type GroupData = {
  acf: any;
  group_urls: string[];
};

const Categories = ({ home }: categoriesProps) => {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(
          "https://dashboard.maator.com/wp-json/wp/v2/groups?acf_format=standard&_fields=acf.group_urls"
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

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#0E0B0B";
  const textColor = theme === "light" ? "#000000" : "#FFFFFF";
  const buttonBackground = theme === "light" ? "#000000" : "#FFFFFF";
  const buttonTextColor = theme === "light" ? "#FFFFFF" : "#000000";
  const buttonBorderColor = theme === "light" ? "#000000" : "#FFFFFF";
  const imageSource =
    theme === "light" ? "/categoriesLight.png" : "/Models (2).png";

  return (
    <div className="min-h-screen overflow-hidden px-4 md:px-10">
      <div style={{ backgroundColor, color: textColor }}>
        <div>
          <ImageCard imgSrc={imageSource} />
        </div>

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
                  <h3
                    className="text-2xl font-semibold"
                    style={{ color: "white" }}
                  >
                    HONDA
                  </h3>
                  <p className="text-lg">CB650F 2017 RED&BLACK</p>
                  <a
                    href="#"
                    className="text-md mt-2 underline-offset-2 hover:underline"
                    style={{
                      textDecorationColor: "white",
                      textDecorationThickness: ".8px",
                      color: "white",
                    }}
                  >
                    Learn more
                  </a>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Button Section */}
        <div className="flex justify-center items-center mt-10 pb-10">
          <Link href="#" passHref>
            <button
              className="px-6 py-2 uppercase tracking-wide rounded-lg transition duration-200 text-xl"
              style={{
                backgroundColor: buttonBackground,
                color: buttonTextColor,
                border: `1px solid ${buttonBorderColor}`,
              }}
            >
              SHOW MORE
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Categories;
