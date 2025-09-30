"use client";
import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaBuilding, FaHardHat, FaUserTie, FaCogs, FaCalendarAlt } from 'react-icons/fa'; // Import React icons

// Define the types for the project
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

const ProjectDetailsPage = ({ params }: { params: Promise<{ id: number }> }) => {
  const [project, setProject] = useState<Project | null>(null); // State to store the project data
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    params.then((resolvedParams) => {
      setId(resolvedParams.id); // Unwrap the id
    });
  }, [params]);

  useEffect(() => {
    if (!id) return;

    async function fetchProject() {
      try {
        const response = await fetch(`/api/project/getprojects/${id}`); // API call for the project data
        if (!response.ok) throw new Error("Error fetching project data");
        const data = await response.json();
        setProject(data);
      } catch (err) {
        setError((err as Error).message); // Set error if fetch fails
      } finally {
        setLoading(false); // Mark loading as complete
      }
    }

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="relative w-full h-screen bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
        <div className="w-3/4 md:w-1/2 bg-gray-300 rounded-full overflow-hidden">
          <div className="h-2 bg-primary animate-progress-bar"></div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-white bg-opacity-60 backdrop-blur-md"></div>
      </div>
    );
  }

  if (error) return <p>Error: {error}</p>;

  return (
    <section className="pb-20 pt-0 lg:pb-25 lg:pt-0 xl:pb-30 xl:pt-0">
      {/* Project Image as Background */}
      <div
        className="relative w-full h-[90vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${project?.picture})` }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-black opacity-40"></div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center text-center text-white">
          <h2 className="text-4xl font-semibold">{project?.title}</h2>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 md:px-8 2xl:px-0 xl:pt-15">
        <div className="flex flex-col-reverse gap-7.5 lg:flex-row xl:gap-12.5">
          <div className="">
            {/* Optional Sidebar */}
          </div>

          <div className="lg:w-3/4 mx-auto" >
            <div className="animate_top rounded-md border border-stroke bg-white p-7.5 shadow-lg dark:border-strokedark dark:bg-blacksection md:p-10">
            <h2 className="text-4xl items-center justify-center text-center font-semibold">{project?.title}</h2>
              <h2 className="text-2xl font-semibold text-black dark:text-white mb-5 mt-10">Project Details:-</h2>

              {/* Project Description */}
              

              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 text-center">
                {/* Icon Box for project details */}
                <div className="flex flex-col items-center space-y-3 p-5 border rounded-lg shadow-md bg-gray-100 dark:border-strokedark dark:bg-blacksection">
                  <FaMapMarkerAlt className="text-primary text-4xl" />
                  <h3 className="font-semibold text-lg text-black dark:text-white">Location</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-300">{project?.location}</span>
                </div>

                <div className="flex flex-col items-center space-y-3 p-5 border rounded-lg shadow-md bg-gray-100 dark:border-strokedark dark:bg-blacksection">
                  <FaBuilding className="text-primary text-4xl" />
                  <h3 className="font-semibold text-lg text-black dark:text-white">Client</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-300">{project?.client}</span>
                </div>

                <div className="flex flex-col items-center space-y-3 p-5 border rounded-lg shadow-md bg-gray-100 dark:border-strokedark dark:bg-blacksection">
                  <FaHardHat className="text-primary text-4xl" />
                  <h3 className="font-semibold text-lg text-black dark:text-white">Contractor</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-300">{project?.contractor}</span>
                </div>

                <div className="flex flex-col items-center space-y-3 p-5 border rounded-lg shadow-md bg-gray-100 dark:border-strokedark dark:bg-blacksection">
                  <FaUserTie className="text-primary text-4xl" />
                  <h3 className="font-semibold text-lg text-black dark:text-white">Consultant</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-300">{project?.consultant}</span>
                </div>

                <div className="flex flex-col items-center space-y-3 p-5 border rounded-lg shadow-md bg-gray-100 dark:border-strokedark dark:bg-blacksection">
                  <FaCogs className="text-primary text-4xl" />
                  <h3 className="font-semibold text-lg text-black dark:text-white">Scope</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-300">{project?.scope}</span>
                </div>

                <div className="flex flex-col items-center space-y-3 p-5 border rounded-lg shadow-md bg-gray-100 dark:border-strokedark dark:bg-blacksection">
                  <FaCalendarAlt className="text-primary text-4xl" />
                  <h3 className="font-semibold text-lg text-black dark:text-white">Period</h3>
                  <span className="text-sm text-gray-500 dark:text-gray-300">{project?.period}</span>
                </div>
                
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-5 text-center">{project?.description}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectDetailsPage;
