"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";

interface TeamMember {
  id: number;
  name: string;
  designation: string;
  experience: string;
  picture: string;
}

const ModernCarousel: React.FC = () => {
  const [team, setTeam] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const response = await fetch("/api/team/getteams");
        if (!response.ok) throw new Error("Failed to fetch team data");
        const data = await response.json();
        setTeam(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, []);

  if (loading) return <p className="text-center">Loading team members...</p>;
  if (error) return <p className="text-center">Error: {error}</p>;
  if (team.length === 0) return <p className="text-center">No team members available to display.</p>;

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    centerMode: true,
    centerPadding: "0px",
    draggable: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full  mx-auto py-10 px-4 text-center">
        <div className="mb-4 inline-flex items-center justify-center rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection ">
  <h2 className="text-2xl font-bold textblue dark:text-white md:w-4/5 xl:w-full text-center text-blacks">
    Our Team
  </h2>
</div>
      <Slider {...settings}>
        
        {team.map((member) => (
        <motion.div
        key={member.id}
        className="p-4 flex flex-col items-center justify-center text-center"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-center items-center w-full">
          <Image
            src={member.picture}
            alt={member.name}
            width={160}
            height={160}
            className="w-40 h-40 rounded-full object-cover mb-4 border-2 border-indigo-500"
          />
        </div>
        <h3 className="text-lg font-semibold textblue dark:text-gray-100">{member.name}</h3>
        <p className="text-indigo-500 text-sm dark:text-gray-300">{member.designation}</p>
        <p className="text-gray-600 text-sm mt-2 dark:text-gray-200 ">
          {member.experience} of Experience
        </p>
      </motion.div>
      
        ))}
      </Slider>
    </div>
  );
};

export default ModernCarousel;
