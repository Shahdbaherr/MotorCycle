"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
// Define types for video data
interface Video {
  id: number;
  videoId: string; // videoId can be null if not found
}

interface ApiResponse {
  id: number;
  acf: {
    id?: string; // The video ID,
  };
}

const Videos = () => {
  const [videos, setVideos] = useState<Video[]>([]); // State for videos with proper typing
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://maator.com/wp-json/wp/v2/videos?acf_format=standard&_fields=id,acf.id"
        );
        const data: ApiResponse[] = await response.json();

        // Limit to 3 videos if more than 3 are fetched
        const videosData = data.slice(0, 3).map((post) => ({
          id: post.id,
          videoId: post.acf?.id || "", // Set default empty string if no videoId is available
        }));

        setVideos(videosData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []); // Empty dependency array to run once on component mount

  const loadMore = async () => {
    try {
      const response = await fetch(
        `https://maator.com/wp-json/wp/v2/videos?acf_format=standard&_fields=id,acf.id&per_page=3&page=${
          page + 1
        }`
      );
      const data: ApiResponse[] = await response.json();

      // 3 videos per page
      setVideos((prevVideos: Video[]) => [
        ...prevVideos,
        ...data.slice(0, 3).map((post) => ({
          id: post.id,
          videoId: post.acf?.id || "", // Ensure videoId is always set
        })),
      ]);
      setPage(page + 1);
    } catch (error) {
      console.error("Error loading more videos:", error);
    }
  };

  return (
    <div
      className="text-white min-h-screen overflow-hidden"
      style={{ backgroundColor: "#0E0B0B" }}
    >
      {/* Header Section */}
      <div className="mt-[2vh] flex justify-center relative">
        <Image src="/Explore.png" alt="explore" width={300} height={30} />
        <span className="absolute inset-0 flex justify-center items-center text-3xl font-[600] text-white">
          Videos
        </span>
      </div>

      {/* Videos Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 pb-5 mt-10">
        {videos.length === 0 ? (
          <div className="text-center text-xl">No videos available.</div>
        ) : (
          videos.map((video) => (
            <div key={video.id} className="relative">
              {/* YouTube Embedded Video */}

              <LiteYouTubeEmbed
                id={video.videoId}
                title="What’s new in Material Design for the web (Chrome Dev Summit 2019)"
              />
            </div>
          ))
        )}
      </div>

      {/* Show More Button */}
      <div className="flex justify-center items-center pb-10">
        <Link href="#" passHref>
          <button className="inline-block px-6 py-1 mt-6 text-white border rounded-lg border-white uppercase tracking-wide hover:bg-white hover:text-black transition duration-200 text-xl">
            SHOW MORE
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Videos;
