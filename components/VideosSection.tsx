"use client";
import { useState, useEffect } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import ImageCard from "./ImageCard";

interface Video {
  id: number;
  videoId: string;
}

interface ApiResponse {
  id: number;
  acf: {
    id?: string;
  };
}

const VideosSection = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [page, setPage] = useState(1);
  const videosPerPage = 6;

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(
          "https://maator.com/wp-json/wp/v2/videos?acf_format=standard&_fields=id,acf.id",
          {
            cache: "no-cache",
          }
        );
        const data: ApiResponse[] = await response.json();

        const videosData = data.map((post) => ({
          id: post.id,
          videoId: post.acf?.id || "",
        }));

        setVideos(videosData);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  const startIndex = (page - 1) * videosPerPage;
  const displayedVideos = videos.slice(startIndex, startIndex + videosPerPage);
  const totalPages = Math.ceil(videos.length / videosPerPage);

  const changePage = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div
      className="text-white min-h-screen overflow-hidden px-4 md:px-10"
      style={{ backgroundColor: "#0E0B0B" }}
    >
      {/* Header Section */}
      <div>
        <ImageCard imgSrc="/Videos.png" />
      </div>

      {/* Videos Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 pb-5 mt-10">
        {displayedVideos.length === 0 ? (
          <div className="text-center text-xl">No videos available.</div>
        ) : (
          displayedVideos.map((video) => (
            <div key={video.id} className="relative">
              {/* YouTube Embedded Video */}
              <LiteYouTubeEmbed
                id={video.videoId}
                title={`Video ${video.id}`}
              />
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-center mt-8 mb-4 space-x-4">
        <button
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
          className={`px-3 py-1 border rounded ${
            page === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-primary"
          }`}
        >
          &larr; Prev
        </button>

        {[...Array(totalPages)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
              key={pageNumber}
              onClick={() => changePage(pageNumber)}
              className={`px-3 py-1 border rounded ${
                page === pageNumber
                  ? "bg-white text-black"
                  : "hover:hover:bg-primary"
              }`}
            >
              {pageNumber}
            </button>
          );
        })}

        <button
          onClick={() => changePage(page + 1)}
          disabled={page === totalPages}
          className={`px-3 py-1 border rounded ${
            page === totalPages
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-primary"
          }`}
        >
          Next &rarr;
        </button>
      </div>
    </div>
  );
};

export default VideosSection;
