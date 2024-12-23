"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface MotorcycleDetails {
  title: string;
  price: string;
  image: string;
  displacement: string;
  horsepower: string;
  torque: string;
  dryweight: string;
  seatheight: string;
  safety: string;
}

const Details = ({ params }: { params: { id: string } }) => {
  const [motorcycle, setMotorcycle] = useState<MotorcycleDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMotorcycleDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://dashboard.maator.com/wp-json/wp/v2/motors/${params.id}?acf_format=standard`
        );
        const data = await response.json();
        if (data.acf) {
          setMotorcycle({
            title: data.acf.name,
            price: data.acf.price,
            image: data.acf.image,
            displacement: data.acf.displacement,
            horsepower: data.acf.horsepower,
            torque: data.acf.torque,
            dryweight: data.acf.dryweight,
            seatheight: data.acf.seatheight,
            safety: data.acf.safety,
          });
        } else {
          console.error("Motorcycle data not found.");
        }
      } catch (error) {
        console.error("Error fetching motorcycle details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMotorcycleDetails();
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

  if (!motorcycle) {
    return <div>Motorcycle not found!</div>;
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
              {motorcycle.title}
            </h2>
            <p className="text-red-500 text-lg font-semibold mb-4">
              {motorcycle.price}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex justify-center">
              <Image
                src={motorcycle.image}
                alt={motorcycle.title}
                width={400}
                height={300}
                className="rounded"
              />
            </div>
            <div>
              <ul className="space-y-9">
                <li>
                  <span className="font-bold">Displacement:</span>{" "}
                  {motorcycle.displacement}
                </li>
                <li>
                  <span className="font-bold">Horse Power:</span>{" "}
                  {motorcycle.horsepower}
                </li>
                <li>
                  <span className="font-bold">Torque:</span> {motorcycle.torque}
                </li>
                <li>
                  <span className="font-bold">Dry Weight:</span>{" "}
                  {motorcycle.dryweight}
                </li>
                <li>
                  <span className="font-bold">Seat Height:</span>{" "}
                  {motorcycle.seatheight}
                </li>
                <li>
                  <span className="font-bold">Safety:</span> {motorcycle.safety}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center py-14">
        <Link href="/">
          <p className="bg-primary text-white font-bold py-2 px-6 rounded hover:bg-white hover:text-black transition">
            Back to Home
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Details;
