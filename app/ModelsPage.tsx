import Image from "next/image";

const ModelsPage = () => {
  return (
    <div
      className="text-white min-h-screen overflow-hidden"
      style={{
        backgroundColor: "#0E0B0B",
      }}
    >
      {/* Header Section */}
      <div className="mt-[6vh] flex justify-center relative">
        <Image src="/Models.png" alt="models" width={300} height={30} />
        <span className="absolute inset-0 flex justify-center items-center text-3xl font-[600] text-white">
          Categories
        </span>
      </div>
      {/* Models Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-6 pb-5">
        {/* Card */}
        {Array(3)
          .fill("")
          .map((_, index) => (
            <div key={index} className="relative mx-auto w-full h-[521px]  ">
              <Image
                src={`/images/bike${index + 1}.jpg`}
                alt={`Bike ${index + 1}`}
                layout="fill"
                objectFit="cover"
                quality={100}
                className="rounded-lg"
              />
              <div
                className="absolute inset-0 h-full"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.72) 68.48%)",
                }}
              ></div>
              <div className="absolute inset-x-0 bottom-0 text-center p-2">
                <h3 className="text-2xl font-semibold">HONDA</h3>
                <p className="text-lg">CB650F 2017 RED&BLACK</p>
                <a
                  href="#"
                  className="text-white-500 text-md mt-3 hover:underline transition"
                >
                  Learn more
                </a>
              </div>
            </div>
          ))}
      </div>

      {/* Show More Button */}
      <div className="text-center pb-10">
        <a
          href="#"
          className="inline-block px-6 py-2 text-white border rounded-lg border-white uppercase tracking-wide hover:bg-white hover:text-black transition duration-200 text-xl"
        >
          Show More
        </a>
      </div>
    </div>
  );
};

export default ModelsPage;
