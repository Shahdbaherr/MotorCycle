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
  group_urls: any[];
};

const Categories = ({ home }: categoriesProps) => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme } = useTheme();
  const images = [
    { src: "https://ik.imagekit.io/xcyd6uv91/image(1).png", alt: "bike1" },
    { src: "https://ik.imagekit.io/xcyd6uv91/image(2).png", alt: "bike2" },
    { src: "https://ik.imagekit.io/xcyd6uv91/image(3).png", alt: "bike3" },
    {
      src: "https://ik.imagekit.io/xcyd6uv91/bike4.jpg",
      alt: "bike",
    },
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
            categories
              .slice(0, home ? 3 : categories.length)
              .map((category, index) => (
                <div
                  key={index}
                  className="relative w-full h-[521px] rounded-lg overflow-hidden"
                >
                  <Image
                    src={images[index].src}
                    alt={images[index].alt}
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
                      className="text-3xl font-semibold"
                      style={{ color: "white" }}
                    >
                      {category.label}
                    </h3>
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
          <Link href="/categories" passHref>
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
