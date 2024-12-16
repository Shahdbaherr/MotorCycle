import { Metadata } from "next";
import ShootingBanner from "@/components/ShootingBanner";
import ShootingSection from "@/components/ShootingSection";
export const metadata: Metadata = {
  title: "Shooting",
  description: "Your go to source for all motorcycles.",
};
export default function contact() {
  return (
    <>
      <ShootingBanner />
      <ShootingSection />
    </>
  );
}
