"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { cardbtm } from "../../data/bottomCards"; // Your original card data
import ProjectCarousel from "@/components/ProjectCarousel";
import Sidebar from "@/components/divisionhero/comdiv/Sidebar"; 

const CardDetail = () => {
  const { id } = useParams() as { id: string }; // Get the card id from the URL
  interface Card {
    id: number;
    title: string;
    description1?: string;
    description2?: string;
    listheading?: string;
    list?: string[];
    relatedItems?: {
      image: string;
      title: string;
      description1?: string;
    }[];
  }

  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    if (id) {
      const selectedCard = cardbtm.find((card) => card.id === parseInt(id));
      setCard(selectedCard || null);
    }
  }, [id]);

  return (
    <div>
      <Sidebar />
      <div className="py-10 px-5 bg-white mt-20 dark:bg-blacksection text-center max-w-6xl mx-auto rounded-lg shadow-xl">
        {card ? (
          <>
               <div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 text-center mb-10">
          {/* <!-- Section Title Start --> */}
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection ">
  <h2 className="text-2xl font-bold text-black dark:text-white md:w-4/5 xl:w-full text-center text-blacks">
  {card.title || "Card Details"}
  </h2>
</div> </div>
            

            {/* <div className="mb-6 mt-10">
              <img
              
                alt={card.title || "Card Image"}
                className="w-full max-w-3xl mx-auto rounded-lg shadow-lg object-cover"
              />
            </div>

            <p className="text-lg text-black dark:text-white leading-relaxed max-w-4xl mx-auto mb-6 mt-10">
              {card.description1 || ""}
            </p>
            <p className="text-lg text-black dark:text-white leading-relaxed max-w-4xl mx-auto mb-6">
              {card.description2 || ""}
            </p> */}

            {/* Conditional List */}
            {/* {card.list && (
              <div className="text-left max-w-3xl mx-auto mb-6">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                  {card.listheading || ""}
                </h3>
                <ul className="list-disc list-inside pl-5 space-y-2">
                  {card.list.map((item, index) => (
                    <li key={index} className="text-black dark:text-white">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )} */}

            {/* Related Items inside Powder Coating Services */}
            {card.relatedItems && (
              <div className="mt-10">
              
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {card.relatedItems.map(
    (item: { image: string; title: string; description1?: string }, index: number) => (
      <div
        key={index}
        className="card bg-white dark:bg-blacksection rounded-lg shadow-md p-5"
      >
        <Image
  src={item.image || "default-image.jpg"}
  alt={item.title}
  width={300}
  height={200}
  className="w-full h-60 object-cover rounded-lg"
/>
        <h4 className="text-lg sm:text-xl font-semibold text-blue-600 dark:text-white mt-4">
          {item.title}
        </h4>
        <p className="text-xs sm:text-sm text-black dark:text-white mt-2">
          {item.description1 || ""}
        </p>

        {/* <button
          onClick={() => (window.location.href = `/card-detail/${item.id}`)}
          className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          View Details
        </button> */}
      </div>
    )
  )}
</div>

              </div>
            )}

            <button
              className="mt-5 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-300"
              onClick={() => window.history.back()}
            >
              Back to Main Content
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <ProjectCarousel />
    </div>
  );
};

export default CardDetail;
