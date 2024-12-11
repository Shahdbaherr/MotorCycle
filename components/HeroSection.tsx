import Image from "next/image";

const HeroSection = () => {
  return (
    <section
      className="relative w-full text-white flex items-center"
      style={{
        height: "100vh",
        width: "100vw",
        backgroundImage: "url('/Car.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div style={{ marginLeft: "80px" }}>
        {/* Left Text Section */}
        <div className="flex flex-col space-y-4 mt-[12vh]">
          <div
            style={{
              width: "50vw",
              height: "auto",
            }}
          >
            <a
              href="#"
              className="text-2xl font-bold underline hover:text-primary text-white transition-colors"
            >
              Online Store
            </a>
            <h1 className="text-3xl pt-6 sm:text-4xl font-extrabold my-4 text-white">
              All you need in one place
            </h1>

            {/* Button Container */}
            <div className="flex items-center space-x-4">
              {/* Shop Button */}
              <button className="px-8 sm:px-16 py-6 sm:py-3 text-white rounded-full transition border border-white text-lg sm:text-3xl">
                Shop
              </button>

              {/* Arrow Button */}
              <button className="w-12 sm:w-14 h-12 sm:h-14 bg-primary rounded-full flex items-center justify-center hover:bg-primary/80 transition">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-white"
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

            <p className="py-6 text-lg sm:text-4xl">EXPLORE OUR WORLD!</p>

            <div
              className="relative  text-white p-4 sm:p-6 rounded-lg shadow-lg w-[80vw] sm:w-96  mx-auto sm:mx-0"
              style={{
                backgroundImage: "url('/BG.png')",
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <button className="bg-gradient-custo shadow-lg backdrop-blur-custom mx-auto sm:mx-0 text-white px-4 py-2 rounded-full">
                  Motorcycle
                </button>
              </div>
              <h2 className="text-primary text-lg sm:text-xl mb-2">
                Sa3dawy Garage
              </h2>
              <p className="text-white text-sm sm:text-base">
                Motorcycle <span className="text-primary">•</span> Riding gear{" "}
                <span className="text-primary">•</span> Parts{" "}
                <span className="text-primary">•</span> Accessories
              </p>
              <div className="absolute top-4 right-1 bg-primary text-white px-6 py-1 rounded-xl cursor-pointer">
                View
              </div>
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div
          className="hidden sm:block"
          style={{
            position: "absolute",
            top: "25vh",
            right: "10px",
          }}
        >
          <Image
            src="/motorcycle.png"
            alt="Motorcycle"
            width={590}
            height={500}
            className="object-cover max-w-[30vw]"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
