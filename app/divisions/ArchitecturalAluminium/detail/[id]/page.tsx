"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation"; // Use the new Next.js useParams hook
import { cardbtm } from "../../data/bottomCards";
import ProjectCarousel from "@/components/ProjectCarousel";
import Sidebar from "@/components/divisionhero/archal/Sidebar"; 

const CardDetail = () => {
  const { id } = useParams() as { id: string }; // Get the card id from the URL
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [card, setCard] = useState<any>(null);

  useEffect(() => {
    if (id) {
      const selectedCard = cardbtm.find((card) => card.id === parseInt(id));
      setCard(selectedCard || {});
    }
  }, [id]);

  return (
    <div><Sidebar /> 
    <div className="py-10 px-5 bg-white mt-20 dark:bg-blacksection text-center max-w-6xl mx-auto rounded-lg shadow-xl">
        
      {card ? (
        <>
          <h2 className="text-3xl md:text-4xl font-bold text-blue-500 dark:text-white mb-6">
            {card.title || "Card Details"}
          </h2>

            <Image
              src={card.image || "default-image.jpg"}
              alt={card.title || "Card Image"}
              width={800}
              height={600}
              className="w-full max-w-3xl mx-auto rounded-lg shadow-lg object-cover"
            />
        

          <p className="text-lg text-black dark:text-white leading-relaxed max-w-4xl mx-auto mb-6 mt-10">
            {card.description1 || ""}
           
          </p>
          <p className="text-lg text-black dark:text-white leading-relaxed max-w-4xl mx-auto mb-6">
            {card.description2 || ""}
          </p>
  {/* Conditional List */}
  {card.list && (
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
  )}

    {/* Conditional Extra Content */}
    {card.extraContent && (
    <div
      className="text-black dark:text-white mb-6 text-left max-w-3xl mx-auto"
      dangerouslySetInnerHTML={{
        __html: card.extraContent,
      }}
    />
  )}

    {/* Conditional List */}
    {card.list && (
    <div className="text-left max-w-3xl mx-auto mb-6">
      <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
      {card.listheading2 || ""}
      </h3>
      <ul className="list-disc list-inside pl-5 space-y-2">
        {card.lists.map((item, index) => (
          <li key={index} className="text-black dark:text-white">
            {item}
          </li>
        ))}
      </ul>
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
