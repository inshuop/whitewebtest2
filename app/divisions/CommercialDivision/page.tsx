/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import Link from "next/link"; // Import Link from next/link
// import cards from "./data/cardsData";
import { cardbtm } from "./data/bottomCards";
import ProjectCarousel from "@/components/ProjectCarousel";
import Sidebar from "@/components/divisionhero/comdiv/Sidebar"; 
import PartnerCarousel from "@/components/PartnerCarousel"; 
// import ProductScrollDisplay from "@/components/divisionhero/comdiv/ProductScrollDisplay"; 


const Glassdivision: React.FC = () => {
  return (
    <div className="dark:bg-black dark:text-white ">
      {/* Slider Section */}
      <Sidebar /> {/* Use the GlassSidebar component */}
      <PartnerCarousel />
      {/* Introductory Content Section */}
      <section className="py-10 px-5 bg-white dark:bg-blacksection mt-20">
        <p className="text-lg text-black dark:text-white leading-relaxed max-w-4xl mx-auto text-center">
        White Aluminium Establishment started its operation in 1973 as a distributor and wholesaler of aluminium and glass products. The company holds large stocks of aluminium profiles, float glass sheets and hardware and distributes them to the market.

White Aluminium has various agencies and exclusive agreements from the most advanced suppliers locally and internationally. Hence, the company is able to and continues to deliver the best technically advanced products to the aluminium and glazing industry.
        </p>
      </section>

      {/* Product Header */}
      {/* <header className="py-6 bg-white dark:bg-blacksection mt-20">
        <h2 className="text-center text-2xl md:text-3xl font-bold textblue dark:text-white">
          White Aluminium Glass Processing Products
        </h2>
      </header> */}

      {/* Products Cards */}
      {/* <section className="py-10 px-5 bg-white dark:bg-blacksection">
        <div className="max-w-[75%] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
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
      </section> */}

      {/* Suppliers Section */}
      {/* <section className="py-8 px-4 bg-white dark:bg-blacksection mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold textblue dark:text-white mb-4">
            White Aluminium Glass Processing Division
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
      </section> */}

      {/* Bottom Cards Section */}
      <section className="py-10 px-5 bg-white dark:bg-blacksection mt-10 mb-20">
     
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 text-center mb-10">
          {/* <!-- Section Title Start --> */}
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection ">
  <h2 className="text-2xl font-bold text-black dark:text-white md:w-4/5 xl:w-full text-center text-blacks">
  Quick Links
  </h2>
</div> </div>
        <div className="max-w-[80%] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cardbtm.map((car) => (
            <Link key={car.id} href={`/divisions/CommercialDivision/detail/${car.id}`}>
              <div className="bg-white dark:bg-blacksection shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 cursor-pointer">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-50 object-cover"
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
      
      {/* <ProductScrollDisplay/> */}
    

      <ProjectCarousel /></div>
  );
};

export default Glassdivision;
