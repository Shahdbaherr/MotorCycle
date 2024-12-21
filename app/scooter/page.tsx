import { Metadata } from "next";
import ShootingBanner from "@/components/ShootingBanner";
import ScootersSection from "@/components/ScootersSection";

export const metadata: Metadata = {
  title: "Scooters",
  description: "Your go to source for all motorcycles.",
};
export default function scooter() {
  return (
    <>
      <ShootingBanner />
      <ScootersSection />
    </>
  );
}
