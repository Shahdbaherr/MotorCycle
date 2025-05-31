"use client";

import React, { useState, useEffect } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

type ImageType = {
  url: string;
  alt: string;
};

export default function GalleryCarousel({
  title,
  images,
}: {
  title?: string;
  images: ImageType[];
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const shouldUseCarousel = images.length > 3;

  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>(
    shouldUseCarousel
      ? {
          loop: true,
          slides: { perView: 1, spacing: 20 },
          breakpoints: {
            "(min-width: 640px)": {
              slides: { perView: 2, spacing: 20 },
            },
            "(min-width: 1024px)": {
              slides: { perView: 3, spacing: 20 },
            },
          },
        }
      : {} // ✅ empty object is a valid fallback config
  );

  useEffect(() => {
    if (!slider.current) return;
    const sliderInstance = slider.current;
    sliderInstance.on("slideChanged", () =>
      setCurrentSlide(sliderInstance.track.details.rel)
    );
  }, [slider]);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevLightbox = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextLightbox = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="mb-8 relative">
      {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}

      <div
        ref={shouldUseCarousel ? sliderRef : undefined}
        className={
          shouldUseCarousel
            ? "keen-slider"
            : "grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }
      >
        {shouldUseCarousel ? (
          <div
            ref={sliderRef}
            className="keen-slider rounded-2xl overflow-hidden"
          >
            {images.map((img, idx) => (
              <div className="keen-slider__slide" key={idx}>
                <Image
                  src={img.url}
                  alt={img.alt || "Motorcycle image"}
                  width={800}
                  height={600}
                  className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer"
                  loading="lazy"
                  onClick={() => openLightbox(idx)} // ✅ Add this line
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
            {images.map((img, idx) => (
              <Image
                key={idx}
                src={img.url}
                alt={img.alt || "Motorcycle image"}
                width={800}
                height={600}
                className="w-full h-auto object-cover rounded-lg shadow-md cursor-pointer"
                loading="lazy"
                onClick={() => openLightbox(idx)} // ✅ Add this line
              />
            ))}
          </div>
        )}
      </div>

      {shouldUseCarousel && (
        <>
          <button
            onClick={() => slider.current?.prev()}
            className="absolute top-1/2 left-3 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition z-10"
            aria-label="Previous Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={() => slider.current?.next()}
            className="absolute top-1/2 right-3 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition z-10"
            aria-label="Next Slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={closeLightbox} // ✅ close when background clicked
        >
          <div
            className="relative max-w-4xl w-full px-6"
            onClick={(e) => e.stopPropagation()} // ✅ prevent close when clicking image or buttons
          >
            <button
              onClick={closeLightbox}
              className="absolute top-0 right-5 text-white text-3xl font-bold"
            >
              &times;
            </button>
            <button
              onClick={prevLightbox}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <Image
              src={images[lightboxIndex].url}
              alt={images[lightboxIndex].alt || ""}
              width={1200}
              height={800}
              className="w-full h-auto object-cover rounded-lg"
            />
            <button
              onClick={nextLightbox}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white rounded-full p-3 shadow-lg transition z-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
