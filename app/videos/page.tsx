import { Metadata } from "next";
import VideosBanner from "@/components/VideosBanner";
import VideosSection from "@/components/VideosSection";

export const metadata: Metadata = {
  title: "Videos",
};

export default function video() {
  return (
    <>
      <VideosBanner />
      <VideosSection />
    </>
  );
}
