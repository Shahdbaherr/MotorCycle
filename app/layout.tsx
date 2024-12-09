import type { Metadata } from "next";
// import { Inter as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import ModelsPage from "./ModelsPage";
import "./globals.css";

import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/nav/mobile-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { Main } from "@/components/craft";
import { mainMenu, contentMenu } from "@/menu.config";
import { Section, Container } from "@/components/craft";
import Balancer from "react-wrap-balancer";
import Car from "@/public/Car.png";
import logo from "@/public/logo.png";

import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

// const fontSans = FontSans({
//   // subsets: ["latin"],
//   variable: "--font-sans",
// });

export const metadata: Metadata = {
  title: "WordPress & Next.js Starter by 9d8",
  description:
    "A starter template for Next.js with WordPress as a headless CMS.",
  metadataBase: new URL("https://wp.9d8.dev"),
};

// Revalidate content every hour
export const revalidate = 3600;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen font-sans antialiased bg-cover bg-center bg-no-repeat"
        )}
        style={{ backgroundImage: "url('/Car.png')" }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <Main>{children}</Main>
          {/* <Footer /> */}
          <HeroSection />
          <ModelsPage />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

const Nav = ({ className, children, id }: NavProps) => {
  return (
    <nav
      className={cn(
        "absolute z-50 top-0  text-white w-full",
        "fade-in",
        className
      )}
      id={id}
    >
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-2">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/logo.png" alt="logo" width={160} height={121} priority />
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="hover:text-primary transition">
            Home
          </a>

          {/* Motorcycle Dropdown */}
          <div className="relative group">
            <a
              href="#motorcycle"
              className="hover:text-primary transition flex items-center"
            >
              Motorcycle
              <span className="ml-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </span>
            </a>
            <div className="absolute left-0 mt-2 hidden group-hover:block  text-white border rounded shadow-lg">
              <a
                href="#sports"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Sports
              </a>
              <a
                href="#cruiser"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Cruiser
              </a>
              <a
                href="#electric"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Electric
              </a>
            </div>
          </div>

          {/* Videos Dropdown */}
          <div className="relative group">
            <a
              href="#videos"
              className="hover:text-primary transition flex items-center"
            >
              Videos
              <span className="ml-1">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </span>
            </a>
            <div className="absolute left-0 mt-2 hidden group-hover:block  text-white border rounded shadow-lg">
              <a
                href="#reviews"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Reviews
              </a>
              <a
                href="#trailers"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Trailers
              </a>
              <a
                href="#tutorials"
                className="block px-4 py-2 hover:bg-gray-100 transition"
              >
                Tutorials
              </a>
            </div>
          </div>

          <a href="#shooting" className="hover:text-primary transition">
            Shooting
          </a>
          <a href="#contact" className="hover:text-primary transition">
            Contact Us
          </a>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center w-full max-w-[289px] relative">
          <input
            type="text"
            placeholder="Search for motorcycle"
            className="w-full h-[48px] pl-4 pr-12 rounded-full bg-transparent text-white border border-white focus:outline-none"
          />
          <button className="absolute right-2 flex items-center justify-center w-[32px] h-[32px] bg-white rounded-full">
            <svg
              className="w-6 h-6 text-red-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="10" cy="10" r="7" strokeWidth="2"></circle>
              <line x1="16" y1="16" x2="20" y2="20" strokeWidth="2"></line>
            </svg>
          </button>
        </div>

        {/*  Menu for Mobile */}
        <div className="md:hidden flex flex-col items-center">
          <div className="group">
            <div className="cursor-pointer">
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </div>
            <div className="absolute top-200 left-0 w-screen text-white p-4 transform scale-0 opacity-0 transition-all duration-300 ease-in-out group-hover:scale-100 group-hover:opacity-100">
              <a href="#home" className="block py-2 hover:text-primary">
                Home
              </a>
              <a href="#motorcycle" className="block py-2 hover:text-primary">
                Motorcycle
              </a>
              <a href="#videos" className="block py-2 hover:text-primary">
                Videos
              </a>
              <a href="#shooting" className="block py-2 hover:text-primary">
                Shooting
              </a>
              <a href="#contact" className="block py-2 hover:text-primary">
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
const HeroSection = () => {
  return (
    <section
      className="relative w-full text-white flex items-center"
      style={{
        height: "100vh", // Full viewport height
        background: "url('/background.jpg') no-repeat center center/cover", // Replace with your background image
      }}
    >
      <div
        className="max-w-[90vw] flex items-center space-x-8 mx-auto"
        style={{
          marginLeft: "5vw", // Relative margin for responsiveness
        }}
      >
        {/* Left Text Section */}
        <div className="flex flex-col space-y-4 mt-[12vh] ml-[2vw]">
          <div
            className="p-8"
            style={{
              width: "50vw",
              height: "auto",
            }}
          >
            <a
              href="#"
              className="text-lg font-bold underline hover:text-primary transition-colors"
            >
              Online Store
            </a>
            <h1 className="text-3xl sm:text-4xl font-extrabold my-4">
              All you need in one place
            </h1>

            {/* Button Container */}
            <div className="flex items-center space-x-4">
              {/* Shop Button */}
              <button className="px-8 sm:px-16 py-2 sm:py-3 text-white rounded-full transition border border-white text-lg sm:text-3xl">
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

            <p className="mt-4 text-lg sm:text-4xl">EXPLORE OUR WORLD!</p>
          </div>
          <div className="relative bg-gradient-custom text-white p-4 sm:p-6 rounded-lg shadow-lg w-[80vw] sm:w-96 backdrop-blur-custom mx-auto sm:mx-0">
            <div className="flex items-center justify-between mb-4 ">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-full">
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
            <div className="absolute top-0 right-0 bg-primary text-white px-4 py-2 rounded-tr-lg cursor-pointer">
              View
            </div>
          </div>
        </div>

        {/* Right Image Section */}
        <div
          className="absolute hidden sm:block"
          style={{
            top: "25vh",
            left: "63vw",
          }}
        >
          <Image
            src="/motorcycle.png"
            alt="Motorcycle"
            width={550}
            height={400}
            className="object-cover max-w-[30vw]"
          />
        </div>
      </div>
    </section>
  );
};

// const ModelsPage = () => {
//   return (
//     <div className="bg-black text-white min-h-screen">
//       {/* Header Section */}
//       <div className="text-center py-10">
//         <h1 className="text-4xl font-bold uppercase tracking-wide">
//           Categories
//         </h1>
//         <h2
//           className="text-[165px] font-[400] leading-[27.2px] text-center font-[Satisfy] mt-6"
//           style={{
//             background: "#E1373D40",
//             textUnderlinePosition: "from-font",
//             textDecorationSkipInk: "none",
//           }}
//         >
//           Models
//         </h2>
//       </div>

//       {/* Models Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 px-4 sm:px-10 lg:px-20 pb-10">
//         {/* Card */}
//         {Array(4)
//           .fill("")
//           .map((_, index) => (
//             <div
//               key={index}
//               className="relative bg-gray-800 rounded-lg overflow-hidden"
//             >
//               <Image
//                 src={`/images/bike${index + 1}.jpg`}
//                 alt={`Bike ${index + 1}`}
//                 layout="responsive"
//                 width={400}
//                 height={300}
//                 className="rounded-lg"
//               />
//               <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-end p-4">
//                 <h3 className="text-lg font-semibold">HONDA</h3>
//                 <p className="text-sm">CB650F 2017 RED&BLACK</p>
//                 <a href="#" className="text-primary mt-2 hover:underline">
//                   Learn more
//                 </a>
//               </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   );
// };

// const Footer = () => {
//   return (
//     <footer>
//       <Section>
//         <Container className="grid md:grid-cols-[1.5fr_0.5fr_0.5fr] gap-12">
//           <div className="flex flex-col gap-6 not-prose">
//             <Link href="/">
//               <h3 className="sr-only">brijr/components</h3>
//               <Image
//                 src={logo}
//                 alt="Logo"
//                 width={120}
//                 height={27.27}
//                 className="dark:invert hover:opacity-75 transition-all"
//               ></Image>
//             </Link>
//             <p>
//               <Balancer>{metadata.description}</Balancer>
//             </p>
//           </div>
//           <div className="flex flex-col gap-2 text-sm">
//             <h5 className="font-medium text-base">Website</h5>
//             {Object.entries(mainMenu).map(([key, href]) => (
//               <Link
//                 className="hover:underline underline-offset-4"
//                 key={href}
//                 href={href}
//               >
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </Link>
//             ))}
//           </div>
//           <div className="flex flex-col gap-2 text-sm">
//             <h5 className="font-medium text-base">Blog</h5>
//             {Object.entries(contentMenu).map(([key, href]) => (
//               <Link
//                 className="hover:underline underline-offset-4"
//                 key={href}
//                 href={href}
//               >
//                 {key.charAt(0).toUpperCase() + key.slice(1)}
//               </Link>
//             ))}
//           </div>
//         </Container>
//         <Container className="border-t not-prose flex flex-col md:flex-row md:gap-2 gap-6 justify-between md:items-center">
//           <ThemeToggle />
//           <p className="text-muted-foreground">
//             © <a href="https://9d8.dev">9d8</a>. All rights reserved.
//             2024-present.
//           </p>
//         </Container>
//       </Section>
//     </footer>
//   );
// };
