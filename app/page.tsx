// Components
import Categories from "@/components/Categories";
import HeroSection from "@/components/HeroSection";
import Shooting from "@/components/Shooting";
import Videos from "@/components/Videos";

// This page is using the craft.tsx component and design system
export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories home={true} />
      <Videos />
      <Shooting condition={true} />
    </>
  );
}
