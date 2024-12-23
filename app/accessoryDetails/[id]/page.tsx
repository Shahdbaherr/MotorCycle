"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface AccessoryDetails {
  title: string;
  price: string;
  image: string;
}

const AccessoryDetails = ({ params }: { params: { id: string } }) => {
  const [accessory, setAccessory] = useState<AccessoryDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAccessoryDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dashboard.maator.com/wp-json/wp/v2/accessories/${params.id}?acf_format=standard`
        );
        const data = await response.json();
        if (data.acf) {
          setAccessory({
            title: data.acf.name,
            price: data.acf.price,
            image: data.acf.image,
          });
        } else {
          console.error("Accessory data not found.");
        }
      } catch (error) {
        console.error("Error fetching accessory details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAccessoryDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="border rounded-lg overflow-hidden bg-[#F1F2F4] animate-pulse">
        <div className="relative w-[calc(100%-2rem)] mx-auto h-[30vh] px-4 bg-gray-300"></div>
        <div className="p-4 flex flex-col justify-between h-[120px]">
          <div className="bg-gray-300 h-4 w-3/4 mb-2"></div>
          <div className="bg-gray-300 h-4 w-1/2 mb-4"></div>
          <div className="bg-gray-300 h-8 w-full"></div>
        </div>
      </div>
    );
  }

  if (!accessory) {
    return <div>Accessory not found!</div>;
  }

  return (
    <div
      className="relative min-h-screen flex flex-col justify-between"
      style={{
        backgroundImage: "url('/itembg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex-grow flex flex-col items-center max-w-5xl mx-auto px-4 bg-transparent z-20">
        <div className="p-6 text-white w-full">
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-center">
              {accessory.title}
            </h2>
            <p className="text-red-500 text-lg font-semibold mb-4">
              {accessory.price}
            </p>
          </div>

          <div className="flex justify-center mt-[9vh]">
            <Image
              src={accessory.image}
              alt={accessory.title}
              width={400}
              height={300}
              className="rounded"
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center py-12">
        <Link href="/">
          <p className="bg-primary text-white font-bold py-2 px-6 rounded hover:bg-white hover:text-black transition">
            Back to Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default AccessoryDetails;
