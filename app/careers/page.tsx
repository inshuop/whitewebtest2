"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BriefcaseIcon, AcademicCapIcon, BuildingOfficeIcon, LightBulbIcon  } from '@heroicons/react/24/solid';
import { FaExclamationTriangle } from 'react-icons/fa';
import HeroBackground from "@/components/HeroBackground";
interface Career {
  id: number;
  department: string;
  divisionId: number;
  location: string;
  jobTitle: string;
  totalVacancy: number;
  jobType: string;
  gender: string; // Male, Female
  experience: string;
  detail: string;
  applyBy: string; // ISO date string
  status: string; // active, inactive
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

interface Division {
  id: number;
  name: string;
}

const CareerPage = () => {
  const [careers, setCareers] = useState<Career[]>([]);
  const [divisions, setDivisions] = useState<Division[]>([]);
  const [filteredCareers, setFilteredCareers] = useState<Career[]>([]);
  const [activeDivision, setActiveDivision] = useState<number | "all">("all");
  const [selectedCareer, setSelectedCareer] = useState<Career | null>(null);

  useEffect(() => {
    const fetchCareersAndDivisions = async () => {
      try {
        const [careersResponse, divisionsResponse] = await Promise.all([
          fetch("/api/career/getcareer"),
          fetch("/api/division/getdivisions"),
        ]);

        if (!careersResponse.ok || !divisionsResponse.ok) {
          throw new Error("Failed to fetch data");
        }

        const careersData: Career[] = await careersResponse.json();
        const divisionsData: Division[] = await divisionsResponse.json();

        // Filter only active careers
        const activeCareers = careersData.filter((career) => career.status === "Active");

        // Sort divisions alphabetically
        divisionsData.sort((a, b) => a.name.localeCompare(b.name));

        setCareers(activeCareers);
        setDivisions(divisionsData);
        setFilteredCareers(activeCareers); // Initially display all active careers
      } catch {
        console.error("Error fetching data");
       
      }
    };

    fetchCareersAndDivisions();
  }, []);

  const handleFilter = (divisionId: number | "all") => {
    setActiveDivision(divisionId);
    if (divisionId === "all") {
      setFilteredCareers(careers);
    } else {
      setFilteredCareers(
        careers.filter((career) => career.divisionId === divisionId)
      );
    }
  };

  const closeModal = () => setSelectedCareer(null);


  const CareerList = ({ filteredCareers }) => {
    const [visibleCareers, setVisibleCareers] = useState(6); // Start with 6 careers
  
    // Load more careers when the button is clicked
    const handleLoadMore = () => {
      setVisibleCareers(visibleCareers + 6); // Show 6 more careers each time
    };
  return ( 
 
    
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 dark:bg-blacksection min-h-screen"
    >
        
      {/* Page Title */}
     
    <section>  <HeroBackground
  imageSrc="/images/hero/herotop.webp"
  title=""
  subtitle=""
/></section>
      <section className="text-center py-10 bg-gray-50 dark:bg-blacksection">
        <h1 className="text-4xl font-bold textblue dark:text-white">Careers</h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Explore exciting opportunities with us.
        </p>
      </section>
      {/* Attractive Cards Section */}
      <section className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 px-4 py-10 w-full lg:w-[75%]">

  {/* Card 1 */}
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all hover:scale-105">
    <motion.h3
      className="text-2xl font-bold textblue dark:text-white flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <BriefcaseIcon className="w-10 h-10textblue dark:text-white animate-pulse" />
      Working at White Aluminium
    </motion.h3>
    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
      As a leading company in the UAE’s manufacturing sector, White Aluminium strives to be an attractive employer, offering opportunities for our team members to develop their skills and reach their potential in a work environment that fosters success.
    </p>
  </div>

  {/* Card 2 */}
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all hover:scale-105">
    <motion.h3
      className="text-2xl font-bold textblue dark:text-white flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <AcademicCapIcon className="w-10 h-10 textblue dark:text-white animate-bounce" />
      Opportunities for Graduates
    </motion.h3>
    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
      White Aluminium has been recruiting graduates for decades, with many of them building long and successful careers with our company. Several members of our current Executive Committee originally joined White Aluminium as fresh graduates, progressing through the ranks to leadership positions.
    </p>
  </div>

  {/* Card 3 */}
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all hover:scale-105">
    <motion.h3
      className="text-2xl font-bold textblue dark:text-white flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <BuildingOfficeIcon className="w-10 h-10textblue dark:text-white animate-pulse" />
      Work with Industry Leaders
    </motion.h3>
    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
      Join a team that collaborates with some of the most influential names in the industry. Build your career while making a real impact.
    </p>
  </div>

  {/* Card 4 */}
  <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg transform transition-all hover:scale-105">
    <motion.h3
      className="text-2xl font-bold textblue dark:text-white flex items-center gap-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <LightBulbIcon className="w-10 h-10textblue dark:text-white animate-spin" />
      Develop Your Skills with Us
    </motion.h3>
    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
      Enhance your professional skills through our continuous learning and development programs. Take your career to the next level with us.
    </p>
  </div>

</section>

      {/* Sorting Bar */}
      <div className="max-w-screen-xl mx-auto my-6 px-4">
        {/* Desktop View */}
        <div className="hidden md:flex flex-wrap justify-center gap-4">
          <button
            onClick={() => handleFilter("all")}
            className={`py-2 px-6 rounded-full transition-all ${
              activeDivision === "all"
                ? "bg-primary text-white"
                : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
            }`}
          >
            All Divisions
          </button>
          {divisions.slice(0, 3).map((division) => (
            <button
              key={division.id}
              onClick={() => handleFilter(division.id)}
              className={`py-2 px-6 rounded-full transition-all ${
                activeDivision === division.id
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              }`}
            >
              {division.name}
            </button>
          ))}
        </div>
        <div className="hidden md:flex flex-wrap justify-center gap-4 mt-4">
          {divisions.slice(3).map((division) => (
            <button
              key={division.id}
              onClick={() => handleFilter(division.id)}
              className={`py-2 px-6 rounded-full transition-all ${
                activeDivision === division.id
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
              }`}
            >
              {division.name}
            </button>
          ))}
        </div>

        {/* Mobile View */}
        <div className="md:hidden">
          <select
            onChange={(e) => handleFilter(e.target.value === "all" ? "all" : parseInt(e.target.value))}
            value={activeDivision}
            className="w-full p-2 border rounded-md bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
          >
            <option value="all">All Divisions</option>
            {divisions.map((division) => (
              <option key={division.id} value={division.id}>
                {division.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-10 w-full lg:w-[85%]">
      {filteredCareers.slice(0, visibleCareers).map((career) => (
        <div
          key={career.id}
          className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow hover:shadow-lg transition-all"
        >
          <h3 className="text-xl font-bold text-blue-600 dark:text-white">{career.jobTitle}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Department: {career.department}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Job Type: {career.jobType}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Apply By: {new Date(career.applyBy).toLocaleDateString()}
          </p>
          <button
            onClick={() => setSelectedCareer(career)}
            className="inline-block mt-4 px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary-dark transition-all"
          >
            View Details
          </button>
        </div>
      ))}

      {/* Load More Button */}
      {filteredCareers.length > visibleCareers && (
        <div className="mt-8 text-center items-center">
          <button
            onClick={handleLoadMore}
            className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all "
          >
            Load More
          </button>
        </div>
      )}
    </div>

       {/* Fraud Alert */}
       <div className="mt-8 w-full sm:w-[85%] mx-auto p-6 bg-yellow-100 dark:bg-yellow-200 rounded-lg border border-yellow-400 flex items-center space-x-4">
  {/* Icon */}
  <FaExclamationTriangle className="h-20 w-20 text-yellow-800 dark:text-yellow-900" />
  
  {/* Fraud Alert Text */}
  <div>
    <p className="text-sm text-yellow-800 dark:text-yellow-900 font-semibold">
      Fraud Alert:
    </p>
    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
      White Aluminium will never ask for payment to process documents, refer you to a third party to process applications or visas, or ask you to pay costs. Never send money to anyone suggesting they can provide employment with White Aluminium. If you suspect you have received a fraudulent offer, please inform us by sending an email to <a href="mailto:info@whitealuminium.ae" className="text-primary hover:underline">info@whitealuminium.ae</a>.
    </p>
    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
      (Note: You will not receive a response if you send your resume or any other non-compliance query to this email address).
    </p>
  </div>
</div>


      {/* Modal */}
      {selectedCareer && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 relative">
      {/* Close Icon */}
      <button
        onClick={closeModal}
        className="absolute top-4 right-4 text-2xl text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-white"
      >
        ×
      </button>

      <h3 className="text-2xl font-bold text-blue-600 dark:text-white">
        {selectedCareer.jobTitle}
      </h3>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold">Department:</span> {selectedCareer.department}
      </p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
  <span className="font-semibold">Division:</span> {
    selectedCareer.divisionId && divisions.find(division => division.id === selectedCareer.divisionId)?.name
  }
</p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold">Location:</span> {selectedCareer.location}
      </p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold">Gender:</span> {selectedCareer.gender}
      </p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold">Experience:</span> {selectedCareer.experience}
      </p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold">Details:</span> {selectedCareer.detail}
      </p>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        <span className="font-semibold">Apply By:</span> {new Date(selectedCareer.applyBy).toLocaleDateString()}
      </p>

      {/* Apply Now Button */}
      <div className="mt-6">
        <a
          href={`mailto:hr-white@whitealuminium.ae?subject=Application for ${selectedCareer.jobTitle}&body=Dear HR,%0A%0AI would like to apply for the ${selectedCareer.jobTitle} position in the ${selectedCareer.department} department located at ${selectedCareer.location}.%0A%0AKindly find my CV attached.%0A%0AThank you.`}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-all text-center"
        >
          Apply Now
        </a>
      </div>

      {/* How to Apply Information */}
      <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
        <p className="font-semibold">Or</p>
        <p className="mt-1">
          send your CV to <a href="mailto:hr-white@whitealuminium.ae" className="text-primary hover:underline">hr-white@whitealuminium.ae</a> along with any relevant documents.
        </p>
      </div>
    </div>
  </div>
)}



    </motion.div>
  );
  };

  return (
    <CareerList filteredCareers={filteredCareers} />
  );
};

export default CareerPage;
