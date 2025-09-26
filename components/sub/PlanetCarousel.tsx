"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const PlanetCarousel = ({ images }: { images: {
  src: string;
  width: number;
  height: number;
}[] }) => {
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState(true);

  const nextSlide = () => {
    setCurrent(current === images?.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? images?.length - 1 : current - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!Array.isArray(images) || images.length <= 0) {
    return null;
  }

  return (
    <div className="lg:col-span-4 lg:row-end-1">
      <div className="aspect-h-3 aspect-w-4 overflow-hidden rounded-lg bg-gray-100 relative">
        {loading ? (
          <div className="animate-pulse bg-gray-400 min-w-screen h-[380px]"></div>
        ) : (
          <div
            className="flex transition-transform duration-1000 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)` }}
          >
            {images.map((img, index) => (
              <Image
                key={index}
                src={img.src}
                alt={`Slide ${index}`}
                className="w-full h-auto flex-shrink-0"
                onLoad={() => setLoading(false)} 
                width={1200}
                height={800}
              />
            ))}
          </div>
        )}
        <button
          className="absolute top-1/2 left-5 z-10 text-white bg-black p-2 rounded-full inline-flex items-center justify-center w-10 h-10 bg-white hover:scale-75 focus:outline-none shadow-md"
          onClick={prevSlide}
        >
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
          <span className="sr-only">Previous</span>
        </button>
        <button
          className="absolute top-1/2 right-5 z-10 text-white bg-black p-2 rounded-full inline-flex items-center justify-center w-10 h-10 bg-white hover:scale-75 focus:outline-none shadow-md"
          onClick={nextSlide}
        >
          <svg
            className="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
          <span className="sr-only">Next</span>
        </button>
      </div>
    </div>
  );
};

export default PlanetCarousel;
