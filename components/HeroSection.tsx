import { Link } from "lucide-react";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="relative w-full text-white flex flex-col md:flex-row items-center  pt-[130px] md:pt-[8vh] h-auto lg:h-[100vh]"
      style={{
        backgroundImage: "url('/Car.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col md:flex-row w-full items-center justify-between px-4 md:px-10">
        {/* Left Section */}
        <div className="flex flex-col space-y-4 w-full md:mt-[12vh] sm:ml-[2vh] px-8">
          <div>
            <a
              href="#"
              className="text-xl md:text-2xl font-bold underline hover:text-primary !text-white transition-colors"
            >
              Online Store
            </a>
            <h1 className="text-2xl pt-4 md:text-3xl lg:text-4xl font-extrabold my-4 text-white">
              All you need in one place
            </h1>

            {/* Button Container */}
            <div className="flex flex-wrap items-center space-x-4">
              <button className="px-6 md:px-8 lg:px-16 py-3 md:py-3 text-white rounded-full transition border border-white text-sm md:text-lg lg:text-3xl">
                Shop
              </button>

              <button className="w-10 md:w-12 lg:w-14 h-10 md:h-12 lg:h-14 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 md:w-5 h-4 md:h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5l14 14M19 5v14H5"
                  />
                </svg>
              </button>
            </div>

            <p className="py-4 md:py-6 text-base md:text-lg lg:text-4xl">
              EXPLORE OUR WORLD!
            </p>

            <div
              className="flex justify-between flex-col text-white py-4 pl-4 sm:py-6 sm:pl-6 rounded-lg shadow-lg w-full md:w-[80vw] lg:w-96 mt-[2vh]" // Added margin-top for spacing
              style={{
                backgroundImage: "url('/BG.png')",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div className="flex items-center justify-between">
                <button className="bg-gradient-custo shadow-lg backdrop-blur-custom text-white px-3 md:px-4 py-1 md:py-2 rounded-full">
                  Motorcycle
                </button>
                <div className="bg-primary text-white px-4 md:px-6 py-1 rounded-xl cursor-pointer hidden md:block">
                  View
                </div>
              </div>
              <h2 className="text-primary text-sm md:text-lg lg:text-xl mb-2">
                Sa3dawy Garage
              </h2>
              <p className="text-white text-xs md:text-sm lg:text-base">
                Motorcycle <span className="text-primary">•</span> Riding gear
                <span className="text-primary">•</span> Parts
                <span className="text-primary">•</span> Accessories
              </p>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div className=" relative  w-full md:w-1/2 h-[calc(100vh-130px)]  ">
          <Image
            src="/motorcycle.png"
            alt="Motorcycle"
            layout="fill"
            className="object-cover max-w-full md:max-w-[30vw] !left-auto !m-0 md:!mt-6"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
