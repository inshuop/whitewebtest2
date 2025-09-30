/* eslint-disable @next/next/no-img-element */
"use client";



// This will generate metadata dynamically for the GlassDivision page.




import React from "react";
import Head from "next/head";
import Link from "next/link";
import cards from "./data/cardsData";
import { cardbtm } from "./data/bottomCards";
import ProjectCarousel from "@/components/ProjectCarousel";
import GlassSidebar from "@/components/divisionhero/glassdiv/GlassSidebar";
import PartnerCarousel from "@/components/PartnerCarousel";
// import ProductScrollDisplay from "@/components/divisionhero/glassdiv/ProductScrollDisplay";

const Glassdivision: React.FC = () => {
  return (
    <>
      <Head>
        <title>Glass Division</title>
        <meta
          name="description"
          content="Glass Division - Providing complete solutions for design, engineering, and manufacturing of fire-rated, bulletproof, and burglar-resistant protection systems."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="dark:bg-black dark:text-white">
        {/* Sidebar and Carousel */}
        <GlassSidebar />
        <PartnerCarousel />

        {/* Introductory Content Section */}
        <section className="py-10 px-5 bg-white dark:bg-blacksection mt-20 ">
          <p className="text-lg text-black dark:text-white leading-relaxed max-w-4xl mx-auto text-center">
            The Glass Processing Division stands as one of the most advanced
            and experienced glass processing units in the region. Our 20,000
            m² facility is equipped with cutting-edge production lines sourced
            from world-leading suppliers, ensuring top-tier performance and
            reliability. Supported by a highly skilled workforce at all levels,
            we adhere to a rigorous Quality Management System (QMS), which has
            earned us a strong reputation for excellence both locally and
            internationally. This commitment to quality has positioned us as a
            trusted supplier of high-performance glazing for iconic projects
            across the region and beyond.
          </p>
        </section>

        {/* Product Header */}
        <header className="py-6 bg-white dark:bg-blacksection mt-20 text-center">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold textblue dark:text-white mb-4">
            White Aluminium Glass Processing Products
          </h2>
        </header>

        {/* Products Cards */}
        <section className="py-10 px-5 bg-white dark:bg-blacksection">
        <div className="w-[90%] sm:max-w-[75%] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white dark:bg-blacksection shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-24 sm:h-32 object-cover"
                />
                <div className="p-2 text-center">
                  <h3 className="text-black dark:text-white font-semibold text-sm sm:text-base">
                    {card.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Suppliers Section */}
        <section className="py-8 px-4 bg-white dark:bg-blacksection mt-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold textblue dark:text-white mb-4">
              White Aluminium Glass Processing
            </h2>
            <p className="text-sm sm:text-base text-black dark:text-white mb-6 px-2 sm:px-4">
              Using high-automated and technologically advanced machinery with
              raw materials sourced from the best suppliers.
            </p>
            <div className="grid grid-cols-3 gap-4">
              {[
                { name: "LISEC", icon: "📈" },
                { name: "Tam Glass", icon: "🔧" },
                { name: "Bavelloni", icon: "🏭" },
                { name: "Glaston", icon: "🌟" },
                { name: "Bystronic", icon: "⚙️" },
                { name: "Kuraray", icon: "🔬" },
                { name: "Trosifol", icon: "🔗" },
                { name: "Saflex", icon: "🛠️" },
              ].map((supplier, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-blacksection rounded-lg shadow-md hover:scale-105 transition-transform duration-300"
                >
                  <div className="text-3xl sm:text-4xl">{supplier.icon}</div>
                  <h3 className="text-sm sm:text-base font-semibold text-black dark:text-white text-center">
                    {supplier.name}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom Cards Section */}
        <section className="py-10 px-5 bg-white dark:bg-blacksection mt-20 mb-20">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 text-center mb-10">
          {/* <!-- Section Title Start --> */}
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection ">
  <h2 className="text-2xl font-bold text-black dark:text-white md:w-4/5 xl:w-full text-center text-blacks">
  Quick Links
  </h2>
</div> </div>
          <div className="max-w-[75%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cardbtm.map((car) => (
              <Link
                key={car.id}
                href={`/divisions/GlassDivision/detail/${car.id}`}
              >
                <div className="bg-white dark:bg-blacksection shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
                  <img
                    src={car.image}
                    alt={car.title}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4 text-center">
                    <h3 className="text-blue-500 dark:text-white font-semibold text-lg">
                      {car.title}
                    </h3>
                    <button className="mt-2 text-black hover:underline dark:text-gray-400">
                      Read More
                    </button>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* <ProductScrollDisplay /> */}
        <div className="mb-10" ></div>
        <ProjectCarousel />
      </div>
    </>
  );
};

export default Glassdivision;
