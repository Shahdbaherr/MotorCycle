"use client";
import Link from "next/link";
import { useTheme } from "next-themes";
import { Suspense } from "react";

export default function NotFound() {
  const { theme } = useTheme();
  const backgroundColor = theme === "light" ? "#FFFFFF" : "#0E0B0B";
  const textColor = theme === "light" ? "#000000" : "#FFFFFF";
  const buttonBackground = theme === "light" ? "#000000" : "#FFFFFF";
  const buttonTextColor = theme === "light" ? "#FFFFFF" : "#000000";
  const buttonBorderColor = theme === "light" ? "#000000" : "#FFFFFF";

  return (
    <>
      <div
        className="m-auto space-y-5 text-center flex flex-col justify-center items-center w-[100vw] h-[60vh]"
        style={{ backgroundColor, color: textColor }}
      >
        <h1 className="text-3xl !font-bold">Not Found</h1>
        <p>Looks like this page doesn&apos;t exist.</p>
        <Link href="/" passHref>
          <button
            className="px-6 py-2 uppercase tracking-wide rounded-lg transition duration-200 text-xl mt-[4vh]"
            style={{
              backgroundColor: buttonBackground,
              color: buttonTextColor,
              border: `1px solid ${buttonBorderColor}`,
            }}
          >
            Back to home
          </button>
        </Link>
      </div>
    </>
  );
}
