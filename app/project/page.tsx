"use client";

import React, { useEffect, useState } from "react";
import ProjectCard from "@/components/ProjectCard";
import { motion } from "framer-motion";
import HeroBackground from "@/components/HeroBackground";

interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  client: string;
  contractor: string;
  consultant: string;
  scope: string;
  period: string;
  isIconicProject: string;
  isCompleted: string;
  isOngoing: string;
  picture: string;
}

const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>("all");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project/getproject");
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        const data = await response.json();
        setProjects(data);
        setFilteredProjects(data); // Initially, show all projects
      } catch (error: unknown) {
        console.error("Error fetching projects:", error);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleFilter = (filter: string) => {
    setActiveFilter(filter); // Set active filter when clicked
    switch (filter) {
      case "all":
        setFilteredProjects(projects);
        break;
      case "iconic":
        setFilteredProjects(projects.filter((project) => project.isIconicProject === "true"));
        break;
      case "completed":
        setFilteredProjects(projects.filter((project) => project.isCompleted === "true"));
        break;
      case "ongoing":
        setFilteredProjects(projects.filter((project) => project.isOngoing === "true"));
        break;
      default:
        setFilteredProjects(projects);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 dark:text-gray-400">Loading projects...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 dark:bg-blacksection min-h-screen  "
    >
        <section>  <HeroBackground
    imageSrc="/images/hero/herotop.webp"
    title=""
    subtitle=""
  /></section>
      
      <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 text-center mb-10 mt-10">
          {/* <!-- Section Title Start --> */}
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection ">
  <h2 className="text-2xl font-bold text-black dark:text-white md:w-4/5 xl:w-full text-center text-blacks">
  Our Projects
  </h2>
</div> </div>
      {/* Sorting Bar */}
     <div className="max-w-screen-xl mx-auto flex flex-wrap justify-center items-center mb-8 space-x-0 space-y-4 sm:space-x-6 sm:space-y-0 px-4">
  {["all", "iconic", "completed", "ongoing"].map((filter) => (
    <button
      key={filter}
      onClick={() => handleFilter(filter)}
      className={`relative font-medium py-2 px-4 border rounded-lg transition-all transform hover:scale-105 ${
        activeFilter === filter
          ? "text-primary font-semibold border-primary"
          : "text-primary border-transparent"
      }`}
    >
      <span>{filter.charAt(0).toUpperCase() + filter.slice(1)} Projects</span>
      <span
        className={`absolute bottom-0 left-0 w-full h-[2px] bg-primary transition-all transform ${
          activeFilter === filter ? "scale-x-100" : "scale-x-0"
        }`}
      ></span>
    </button>
  ))}
</div>


      {/* Projects Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 w-4/5 py-15">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsPage;
