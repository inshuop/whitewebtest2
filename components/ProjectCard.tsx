"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  picture: string;
  location: string;
  client: string;
  period: string;
}

const ProjectCard = ({ project }: { project: Project }) => {
  const { title, picture, location, client, period } = project;

  return (
    <Link href={`/project/${project.id}`} passHref>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: -10 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="group relative cursor-pointer rounded-xl bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 dark:from-gray-800 dark:to-gray-900 dark:via-gray-700"
      >
        {/* Image with Hover Overlay */}
        <div className="relative overflow-hidden rounded-t-xl">
          <Image
            src={picture}
            width={500}
            height={300}
            alt={title}
            className="object-cover w-full h-64 transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center space-y-2 text-sm sm:text-base">
              <p>
                <span className="font-semibold">Location:</span> {location}
              </p>
              <p>
                <span className="font-semibold">Client:</span> {client}
              </p>
              <p>
                <span className="font-semibold">Period:</span> {period}
              </p>
            </div>
          </div>
        </div>

        {/* Title and Read More */}
        <div className="p-5 text-center">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 group-hover:text-primary transition dark:text-white">
            {title}
          </h3>
          <div className="relative">
            <button className="relative text-primary font-medium transition">
              Read More
              {/* Border effect on hover */}
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform origin-center duration-300"></div>
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default ProjectCard;
