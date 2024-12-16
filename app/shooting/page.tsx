import { Metadata } from "next";
import ShootingBanner from "@/components/ShootingBanner";
export const metadata: Metadata = {
  title: "Shooting",
  description: "Your go to source for all motorcycles.",
};
export default function contact() {
  return (
    <>
      <ShootingBanner />
    </>
  );
}
