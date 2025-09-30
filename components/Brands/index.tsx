"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
// Import the core Swiper and the Autoplay module
import "swiper/swiper-bundle.min.css"; // Import Swiper styles

// Register the Autoplay module


import SingleBrand from "./SingleBrand";
import brandData from "./brandData";

const Brands = () => {
  return (
    <>
      {/* ===== Clients Carousel Section Start ===== */}
      <section className="border border-x-0 border-y-stroke bg-alabaster py-11 dark:border-y-strokedark dark:bg-black">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0 items-center">
          <Swiper
            spaceBetween={20}
            slidesPerView={2}
            autoplay={{
              delay: 1500, // Delay between slides
              disableOnInteraction: false, // Continue autoplay even after interaction
            }}
            breakpoints={{
              640: {
                slidesPerView: 3, // 3 slides on small screens
              },
              768: {
                slidesPerView: 4, // 4 slides on medium screens
              },
              1024: {
                slidesPerView: 6, // 6 slides on large screens
              },
            }}
          >
            {brandData.map((brand, key) => (
              <SwiperSlide key={key}>
                <SingleBrand brand={brand} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
      {/* ===== Clients Carousel Section End ===== */}
    </>
  );
};

export default Brands;
