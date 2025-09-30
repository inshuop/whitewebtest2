"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import HeroBackground from "@/components/HeroBackground";

interface Partner {
  id: number;
  name: string;
  url: string;
  divisionId: number;
  partnerGroupId: number;
  picture: string;
}

interface Division {
  id: number;
  name: string;
}

const OurPartnersPage = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await fetch("/api/partner/getpartners");
        if (!response.ok) {
          throw new Error(`Failed to fetch partners: ${response.statusText}`);
        }
        const data = await response.json();
        setPartners(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      }
    };

    const fetchDivisions = async () => {
      try {
        const response = await fetch("/api/division/getdivisions");
        if (!response.ok) {
          throw new Error("Failed to fetch divisions");
        }
        const data = await response.json();
        setDivisions(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An unknown error occurred");
      }
    };

    fetchPartners();
    fetchDivisions();
  }, []);

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  // Group partners by divisionId
  const partnersByDivision = partners.reduce<Record<number, Partner[]>>((acc, partner) => {
    if (!acc[partner.divisionId]) {
      acc[partner.divisionId] = [];
    }
    acc[partner.divisionId].push(partner);
    return acc;
  }, {});

  return (
    <motion.div
    variants={{
      hidden: {
        opacity: 0,
        y: -20,
      },

      visible: {
        opacity: 1,
        y: 0,
      },
    }}
    initial="hidden"
    whileInView="visible"
    transition={{ duration: 0.5, delay: 0.5 }}
    viewport={{ once: true }}
    className="animate_top mx-auto bg-gray-100 dark:bg-blacksection min-h-screen"
  >
       
      <section>
        <HeroBackground
          imageSrc="/images/hero/herotop.webp"
          title=""
          subtitle=""
        />
      </section>

      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 text-center mb-10 mt-10">
        {/* Section Title */}
      
      </div>

      {/* Partners List */}
      <div className="container mx-auto px-4 w-4/5">
        {Object.keys(partnersByDivision).map((divisionId) => {
          const division = divisions.find((d) => d.id === parseInt(divisionId));
          const divisionPartners = partnersByDivision[parseInt(divisionId)];

          return (
            <div key={divisionId} className="mb-30">
              {/* Division Name */}
              <div className="mb-8 text-center">
                {/* Heading with Underline on Hover */}
                <div className="mb-4 inline-flex items-center justify-center rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection">
                  <h2 className="text-3xl font-extrabold text-black dark:text-white md:w-4/5 xl:w-full text-center text-blacks relative">
                    Our {division ? division.name : "Unknown Division"} Partners
                    <span className="absolute block w-full h-1 bg-primary dark:bg-primary mt-2 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100" />
                  </h2>
                </div>

                {/* Partners List */}
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 py-10"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  {divisionPartners.map((partner) => (
                    <a
                      key={partner.id}
                      href={partner.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative group flex justify-center items-center p-2 border rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
                    >
                      {/* Partner Image */}
                      <motion.div
                        className="relative p-3 group-hover:scale-110 transform transition-transform duration-300"
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >                        <Image
                      src={partner.picture}
                      alt={partner.name}
                      width={100}
                      height={32}
                      className="object-cover w-full h-full transition-transform duration-300"
                    />
                  </motion.div>

                  {/* Overlay with Name, only visible on image hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 flex justify-center items-center transition-opacity">
                    <p className="text-white text-lg font-medium">{partner.name}</p>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      );
    })}
  </div>
</motion.div>
);
};

export default OurPartnersPage;
