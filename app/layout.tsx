import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/NavBar";
import "./globals.css";
import { Main } from "@/components/craft";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";
import ProgressBar from "@/components/progressBar";
export const metadata: Metadata = {
  title: {
    default: "Maator",
    template: "%s - Explore MotorCycles",
  },
  description: "Your go to source for all motorcycles.",
};

export const revalidate = 3600;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className={cn(" font-sans bg-cover bg-center bg-no-repeat")}>
        <ProgressBar />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          <Main>{children}</Main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
