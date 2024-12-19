"use client";
import { useEffect, useState } from "react";
import ImageCard from "./ImageCard";
import Image from "next/image";
import { useTheme } from "next-themes";

interface Motorcycle {
  id: number;
  src: string;
  title: string;
  price: string;
}

const MotorcyclesSection = () => {
  const { theme } = useTheme();
  const [motorcycles, setMotorcycles] = useState<Motorcycle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotorcycles = async () => {
      try {
        const response = await fetch(
          "https://dashboard.maator.com/wp-json/wp/v2/motors?acf_format=standard&_fields=acf"
        );
        const data = await response.json();

        const formattedData = data.map((item: any, index: number) => ({
          id: index + 1,
          src: item.acf.image,
          title: item.acf.name,
          price: item.acf.price,
        }));

        setMotorcycles(formattedData);
      } catch (error) {
        console.error("Failed to fetch motorcycles:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycles();
  }, []);

  const backgroundColor = theme === "light" ? "#FFFFFF" : "#0E0B0B";
  const textColor = theme === "light" ? "#000000" : "#FFFFFF";
  const imageSource =
    theme === "light" ? "/motorsection.png" : "/motorsection.png";

  return (
    <section style={{ backgroundColor, color: textColor }} className="py-10">
      <div>
        <ImageCard imgSrc={imageSource} />
      </div>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {loading
            ? Array(8)
                .fill(0)
                .map((_, index) => (
                  <div
                    key={index}
                    className="border rounded-lg shadow-md overflow-hidden bg-[#F1F2F4] animate-pulse"
                  >
                    <div className="relative w-[calc(100%-2rem)] mx-auto h-[30vh] px-4 bg-gray-300"></div>
                    <div className="p-4 flex flex-col justify-between h-[120px]">
                      <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
                      <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
                      <div className="bg-gray-300 h-8 w-full"></div>
                    </div>
                  </div>
                ))
            : motorcycles.map((bike) => (
                <div
                  key={bike.id}
                  className="border rounded-lg shadow-md overflow-hidden bg-[#F1F2F4]"
                >
                  <div className="relative w-[calc(100%-2rem)] mx-auto h-[30vh] px-4">
                    <Image
                      src={bike.src}
                      alt={bike.title}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>

                  <div className="p-4">
                    <h3 className="text-md font-semibold text-black">
                      {bike.title}
                    </h3>
                    <p className="text-red-500 text-sm font-bold">
                      {bike.price}
                    </p>
                    <button className="mt-4 bg-primary text-white px-3 py-1 rounded">
                      Show Details
                    </button>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </section>
  );
};

export default MotorcyclesSection;
