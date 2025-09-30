// Install required dependencies: `npm install framer-motion axios`
"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

type Partner = {
  id: number;
  name: string;
  url: string;
  divisionId: number;
  partnerGroupId: number;
  picture: string;
  createdAt: string;
  updatedAt: string;
};

const PartnerCarousel: React.FC = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axios.get("/api/partner/getpartners");
        setPartners(response.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000); // Auto-slide every 3 seconds
    return () => clearInterval(interval);
  }, [partners.length]);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  const visiblePartners = () => {
    const itemsToShow = window.innerWidth >= 768 ? 7 : 4; // 5 for desktop, 2 for mobile
    return partners.slice(currentIndex, currentIndex + itemsToShow).concat(
      partners.slice(0, Math.max(0, currentIndex + itemsToShow - partners.length))
    );
  };

  return (
    <div className="relative w-full py-6 bg-gray-100   dark:bg-blacksection">
      <motion.div
        className="flex justify-start space-x-2 items-center w-full overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {visiblePartners().map((partner , index) => (
          <motion.a
            key={partner.id}
            href={partner.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 w-25 md:w-[14.2%] h-12  flex items-center justify-center bg-white shadow-lg rounded-lg p-2"
            whileHover={{ scale: 1.05 }}
            initial={{ x: index === 0 ? -100 : 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: index === -100 ? 0 : 0, opacity: 100 }}
            
            transition={{ duration: 0.5 }}
          >

            
            <img
              src={partner.picture}
              alt={partner.name}
              className="max-w-full max-h-full object-contain w-auto h-auto "
              
            />
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
};

export default PartnerCarousel;
