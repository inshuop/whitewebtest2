"use client"; // Ensures the code runs on the client side, as Next.js is doing SSR (Server Side Rendering)
import React, { useEffect, useState } from "react";
import SingleFeature from "./SingleFeature"; // Assuming this component is already set up for rendering individual division

interface Division {
  id: number;
  name: string;
  description: string;
  picture: string;
  divisionUrl: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

const Division = () => {
  const [divisions, setDivisions] = useState<Division[]>([]); // Set the state for divisions

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch("/api/division/getdivisions"); // Updated API endpoint
        const data = await response.json();
        setDivisions(data); // Set the fetched data to state
      } catch (error) {
        console.error("Error fetching divisions:", error);
      }
    };

    fetchDivisions(); // Call the function to fetch divisions when the component mounts
  }, []); // Empty dependency array to run the fetch only once

  return (
    <>
      {/* <!-- ===== Features Start ===== --> */}
      <section id="features" className="py-20 lg:py-25 xl:py-30">
        <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 text-center">
          {/* <!-- Section Title Start --> */}
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection ">
  <h2 className="text-2xl font-bold text-black dark:text-white md:w-4/5 xl:w-full text-center text-blacks">
    Our Divisions
  </h2>
</div>

          {/* <!-- Section Title End --> */}

          <div className="mt-10 grid grid-cols-1 gap-7.5 md:grid-cols-2 lg:mt-15 lg:grid-cols-3 xl:mt-20 xl:gap-12.5 sm:gap-5">
  {/* <!-- Features item Start --> */}
  {divisions.length > 0 ? (
    divisions.map((feature, key) => (
      <SingleFeature feature={feature} key={key} />
    ))
  ) : (
    <p>Loading divisions...</p> // Display a loading message if data is still being fetched
  )}
  {/* <!-- Features item End --> */}
</div>

        </div>
      </section>
      {/* <!-- ===== Features End ===== --> */}
    </>
  );
};

export default Division;
