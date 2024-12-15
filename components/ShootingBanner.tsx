import Image from "next/image";

const ShootingBanner = () => {
  return (
    <section
      className="relative w-full text-white flex flex-col md:flex-row items-center pt-[130px] md:pt-[8vh] h-auto lg:h-[100vh]"
      style={{
        backgroundImage: "url('/Car.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex flex-col md:flex-row w-full items-end px-4 md:px-10">
        <div className="flex flex-col w-full px-8">
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
          </div>
        </div>

        <div className="relative flex items-center justify-center w-full md:w-1/2 self-center h-auto mr-[12vw]">
          <Image
            src="/motors.png"
            alt="Motorcycle"
            width={1000}
            height={600}
            className="object-contain max-w-full md:max-w-[45vw] mt-0"
          />
        </div>
      </div>
    </section>
  );
};

export default ShootingBanner;
