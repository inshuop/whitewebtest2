"use client";
import React, { useEffect, useState } from "react";

const HeroBackground = ({ imageSrc, title, subtitle }: { imageSrc: string, title: string, subtitle?: string }) => {
  const [loaded, setLoaded] = useState(false); // State to handle the loading state of the background image

  useEffect(() => {
    const img = new window.Image(); // Use window.Image to create a new Image object
    img.src = imageSrc;
    img.onload = () => {
      setLoaded(true); // Set loaded to true when the image has loaded
    };
  }, [imageSrc]);

  return (
    <section
      className={`relative w-full h-[50vh] bg-cover bg-center  transition-opacity duration-1000 ease-in-out ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      style={{ backgroundImage: `url(${imageSrc})` }}
    >
      {/* Overlay to darken the image (optional) */}
      <div className="absolute inset-0 bg-black opacity-40"></div>

      {/* Text Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        {subtitle && <p className="mt-4 text-xl">{subtitle}</p>}
      </div>
    </section>
  );
};

export default HeroBackground;
