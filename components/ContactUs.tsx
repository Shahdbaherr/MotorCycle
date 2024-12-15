"use client";
import Image from "next/image";
import ImageCard from "./ImageCard";
import { useTheme } from "next-themes";
const Contact = () => {
  const { theme } = useTheme();
  const backgroundColor = theme === "light" ? "#FFFFFF" : "#0E0B0B";
  const textColor = theme === "light" ? "#000000" : "#FFFFFF";
  const imageSource =
    theme === "light" ? "/contactLight.png" : "/Contact Us.png";
  return (
    <div
      className="text-white min-h-screen overflow-hidden"
      style={{ backgroundColor, color: textColor }}
    >
      <div>
        <ImageCard imgSrc={imageSource} />
      </div>
      <div className="flex flex-col md:flex-row md:flex-nowrap items-center md:items-start">
        <div className="relative w-full md:w-3/5 h-[60vh] hidden md:block">
          <div
            className="w-full h-[65vh] bg-cover bg-center"
            style={{
              backgroundImage: "url('/motorcyclee.png')",
              width: "1200px",
            }}
          ></div>
        </div>

        <div className="relative w-full md:w-2/5 h-[60vh] md:h-[65vh] bg-white flex flex-col items-center rounded-none md:rounded-tl-3xl md:rounded-bl-3xl justify-center md:p-12">
          <div className="max-w-md w-full flex flex-col ">
            <p className="text-black text-2xl mb-6 text-center md:text-left">
              Our team is always available to assist you.
              <br />
              Contact us whenever you want!
            </p>
            <form className="space-y-6">
              <div className="relative">
                <div className="flex items-center gap-3 mt-[6vh]">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M6 5.25C6 5.05109 6.07902 4.86032 6.21967 4.71967C6.36032 4.57902 6.55109 4.5 6.75 4.5H21.75C21.9489 4.5 22.1397 4.57902 22.2803 4.71967C22.421 4.86032 22.5 5.05109 22.5 5.25V18.75C22.5 18.9489 22.421 19.1397 22.2803 19.2803C22.1397 19.421 21.9489 19.5 21.75 19.5H6.75V18H21V6.9L14.6655 11.1255C14.5424 11.2074 14.3979 11.2511 14.25 11.2511C14.1021 11.2511 13.9576 11.2074 13.8345 11.1255L7.5 6.9015V9.75C7.5 9.94891 7.42098 10.1397 7.28033 10.2803C7.13968 10.421 6.94891 10.5 6.75 10.5H1.5V9H6V5.25ZM10.5 12V13.5H3V12H10.5ZM12 16.5H4.5V15H12V16.5Z"
                      fill="#B00E0A"
                    />
                  </svg>
                  <label
                    htmlFor="email"
                    className="text-md"
                    style={{ color: "#B00E0A" }}
                  >
                    Email
                  </label>
                </div>
                <div className="mt-1 relative rounded-md">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    required
                    className="pl-2 py-2 px-3 w-full border border-primary rounded-md focus:border-primary"
                    style={{
                      backgroundColor: "white",
                      color: "black",
                      borderColor: "#B00E0A",
                    }}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full mt-[1vh] bg-primary text-white py-2 rounded-md"
                  style={{ backgroundColor: "#B00E0A" }}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
