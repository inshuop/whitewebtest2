




// components/GlassSidebar.tsx
"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

const Sidebar: React.FC = () => {
  const slides = [
    "/images/arch/1.webp",
    "/images/arch/2.webp",
    "/images/arch/3.webp",
    "/images/arch/4.webp",
    "/images/arch/5.webp",
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden group">
      <div className="absolute inset-0">
        {slides.map((slide, index) => (
          <Image
            key={index}
            src={slide}
            alt={`Slide ${index + 1}`}
            layout="fill"
            objectFit="cover"
            className={`transition-all duration-[1000ms] ease-in-out transform ${
              currentSlide === index
                ? "opacity-100 scale-100 blur-0"
                : "opacity-0 scale-110 blur-sm"
            }`}
          />
        ))}
      </div>
      <div className="absolute bottom-0 w-full bg-gradient-to-t from-black via-black to-transparent py-4 text-center opacity-95 hover:opacity-100 pb-10">
        <h1 className="text-white text-3xl font-bold">
       KITCHEN DIVISION
        </h1>
      </div>
    </div>
  );
};

export default Sidebar;

