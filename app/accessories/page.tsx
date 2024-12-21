import { Metadata } from "next";
import ShootingBanner from "@/components/ShootingBanner";
import ScootersSection from "@/components/ScootersSection";
import AccessoriesSection from "@/components/AccessoriesSection";

export const metadata: Metadata = {
  title: "Accessories",
  description: "Your go to source for all motorcycles.",
};
export default function accessories() {
  return (
    <>
      <ShootingBanner />
      <AccessoriesSection />
    </>
  );
}
