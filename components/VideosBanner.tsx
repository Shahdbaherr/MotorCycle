import Image from "next/image";

const VideosBanner = () => {
  return (
    <section
      className="relative w-full text-white flex flex-col items-start justify-center min-h-screen"
      style={{
        background: `
          linear-gradient(90deg, #000000 -23.28%, rgba(53, 47, 47, 0) 85.57%), 
          url('/videosBanner.png')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Content container */}
      <div className="relative z-10 px-4 sm:px-6 md:px-12 lg:px-[6vw] mt-[3vh] sm:mt-[5vh] lg:mt-[7vh]">
        <h1
          className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold leading-tight sm:leading-snug"
          style={{
            maxWidth: "fit-content",
            fontWeight: "bold",
          }}
        >
          Bring your style
        </h1>
        <h2
          className="text-base sm:text-lg md:text-3xl lg:text-6xl font-normal leading-normal sm:leading-[1.5] md:mt-4"
          style={{
            maxWidth: "30vw", // Adjusted for better small-screen layout
          }}
        >
          Make your dream come true
        </h2>
      </div>
    </section>
  );
};

export default VideosBanner;
