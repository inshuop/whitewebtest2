import React from "react";
import { Division } from "@/types/Division"; // Ensure your Division type is correctly defined
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

// Component to display individual division
const SingleFeature = ({ feature }: { feature: Division }) => {
  const { picture, name, description , divisionUrl } = feature; // Destructure feature properties

  return (
    <Link href={`/divisions/${divisionUrl}`} passHref>
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            y: 20,
          },
          visible: {
            opacity: 1,
            y: 0,
          },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="group z-40 cursor-pointer rounded-lg border border-transparent bg-white shadow-md transition-all hover:shadow-lg dark:border-strokedark dark:bg-blacksection dark:hover:bg-hoverdark"
      >
        {/* Image Section with Read More Text */}
        <div className="relative flex items-center justify-center rounded-lg overflow-hidden group">
        <Image
    src={picture || "/default-image.jpg"} // Fallback image if picture is missing
    width={500}
    height={280}
    alt={name}
    priority
    style={{
      objectFit: "cover", // Apply object fit using style
      width: "100%",
      height: "auto",
    }}
  />
          
          {/* Read More Text on Hover */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      Read More
          </div>
        </div>

        {/* Title Section (No Underline Effect) */}
        <div className="relative mt-6">
          <motion.h3
            className="text-xl font-semibold text-blacks dark:text-white xl:text-itemtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {name}
          </motion.h3>
        </div>

        {/* Description Section */}
        <p className="text-xs sm:text-sm  mt-2 text-gray-600 dark:text-gray-400 transition-all duration-300 px-5 pb-5">
          {description}
        </p>
      </motion.div>
    </Link>
  );
};

export default SingleFeature;
