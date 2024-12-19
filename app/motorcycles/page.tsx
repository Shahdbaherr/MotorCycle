import { Metadata } from "next";
import ShootingBanner from "@/components/ShootingBanner";
import MotorcyclesSection from "@/components/MotorcycleSection";
export const metadata: Metadata = {
  title: "Motorcycles",
  description: "Your go to source for all motorcycles.",
};
export default function motorcycles() {
  return (
    <>
      <ShootingBanner />
      <MotorcyclesSection />
    </>
  );
}
