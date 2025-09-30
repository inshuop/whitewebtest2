"use client";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import Image from "next/image";
import { useRouter } from "next/navigation";

type Projects = {
  id: number;
  title: string;
  description: string;
  picture: string;
  location: string;
  client: string;
  period: string;
};

const ProjectCarousel: React.FC = () => {
  const [projects, setProjects] = useState<Projects[]>([]);
  const router = useRouter();

  // Fetch the posts (projects) from the API when the component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/getprojectsn");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleProjectClick = (id: number) => {
    if (router) {
      router.push(`/project/${id}`);
    } else {
      console.error("Router is not available.");
    }
  };

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };

  return (
    <div className="mx-auto w-full text-center mt-10">
    
          {/* <!-- Section Title Start --> */}
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection ">
  <h2 className="text-2xl font-bold text-black dark:text-white md:w-4/5 xl:w-full text-center text-blacks">
    Our Projects
  </h2>
</div>
      <Slider {...settings}>
        {projects.map((project) => (
          <div key={project.id} className="p-4">
            <div
              className="relative rounded-lg bg-white shadow-lg cursor-pointer dark:bg-black"
              onClick={() => handleProjectClick(project.id)}
            >
              <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16 / 9" }}>
              <Image
    src={project.picture}
    alt={project.title}
    width={800} // Set a fixed width (adjust as needed)
    height={450} // Set a fixed height (adjust as needed)
    priority
    className="rounded-t-lg transition-transform duration-300 hover:scale-105"
    style={{
      objectFit: "cover", // Apply object fit using style
    }}
  />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 text-black opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <p className="text-lg font-semibold">Location: {project.location}</p>
                  <p className="text-md">Client: {project.client}</p>
                  <p className="text-sm">Period: {project.period}</p>
                </div>
              </div>
              <div className="p-4 text-center">
                <h3 className="mb-2 text-xl font-semibold dark:text-gray-200">
                  {project.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProjectCarousel;
