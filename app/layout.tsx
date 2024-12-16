import { Metadata } from "next";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import Nav from "@/components/NavBar";
import "./globals.css";
import { Main } from "@/components/craft";
import { cn } from "@/lib/utils";
import Footer from "@/components/Footer";

// const fontSans = FontSans({
//   // subsets: ["latin"],
//   variable: "--font-sans",
// });
export const metadata: Metadata = {
  title: {
    default: "Maator",
    template: "%s - Explore MotorCycles",
  },
  description: "Your go to source for all motorcycles.",
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
      <body className={cn(" font-sans bg-cover bg-center bg-no-repeat")}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Nav />
          {/* <Footer /> */}
          {/* <HeroSection /> */}
          <Main>{children}</Main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
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
