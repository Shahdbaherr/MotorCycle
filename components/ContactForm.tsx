"use client";

import { useTheme } from "next-themes";

const ContactForm = () => {
  const { theme } = useTheme();
  const backgroundColor = theme === "light" ? "#FFFFFF" : "#0E0B0B";
  const textColor = theme === "light" ? "#000000" : "#FFFFFF";

  return (
    <div>
      <div
        className="text-white flex items-center justify-center w-full mt-[12vh] mb-[12vh]"
        style={{
          backgroundColor,
          color: textColor,
        }}
      >
        <div className="flex flex-col lg:flex-row w-full h-auto  overflow-hidden">
          {/* Form Section */}
          <div className="w-full lg:w-2/5 px-6 md:px-12 lg:px-16 py-8 bg-[#252C33] flex flex-col justify-center">
            <h1 className="text-5xl !font-bold md:text-4xl text-white">
              Get in
              <span className="text-[#DD5471]">Touch</span>
            </h1>
            <p className="text-gray-300 mt-2 mb-6">
              Our team is always available to assist you. Contact us whenever
              you want!
            </p>

            <form className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name *"
                  className="w-full p-3 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:border-[#DD5471] placeholder-gray-400"
                />
              </div>

              <div>
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full p-3 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:border-[#DD5471] placeholder-gray-400"
                />
              </div>
              <div>
                <input
                  type="tel"
                  placeholder="Phone number *"
                  className="w-full p-3 bg-transparent border border-gray-500 rounded-md focus:outline-none focus:border-[#DD5471] placeholder-gray-400"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#DD5471] py-3 text-white font-bold rounded-md hover:opacity-90 transition duration-300"
              >
                SEND
              </button>
            </form>
            <div className="flex items-center space-x-6 mt-8 text-gray-300">
              <div>
                <p className="text-sm font-semibold">PHONE</p>
                <p className="text-[#DD5471] text-lg">03 5432 1234</p>
              </div>
              <div>
                <p className="text-sm font-semibold">EMAIL</p>
                <p className="text-[#DD5471] text-lg">info@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full lg:w-3/5 flex">
            <div
              className="w-full"
              style={{
                background: `linear-gradient(89.83deg, #252C33 10.53%, rgba(37, 44, 51, 0) 49.48%), 
                url('/contact.png')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
