"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { cardbtm } from "../../data/bottomCards"; // Your original card data
import Sidebar from "@/components/divisionhero/firerat/Sidebar";

const CardDetail = () => {
  const { id } = useParams() as { id: string }; // Get the card id from the URL
  interface Card {
    id: number;
    title: string;
    description1?: string;
    description2?: string;
    image: string;
    image1?: string;
    image2?: string;
    h1: string;
    h2: string; 
    listheading : string;

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
      <div className="py-10 px-5 bg-white mt-20 dark:bg-blacksection max-w-6xl mx-auto rounded-lg shadow-xl">
        {card ? (
          <>

<div className="mx-auto max-w-c-1315 px-4 md:px-8 xl:px-0 text-center mb-10">
          {/* <!-- Section Title Start --> */}
          <div className="mb-4 inline-flex items-center justify-center rounded-full bg-zumthor px-4.5 py-1.5 dark:border dark:border-strokedark dark:bg-blacksection ">
  <h2 className="text-2xl font-bold text-black dark:text-white md:w-4/5 xl:w-full text-center text-blacks">
  {card.title || "Card Details"}
  </h2>
</div> </div>
            {/* Title */}
           
           
            {/* Description */}
            <p className="text-lg text-black dark:text-white leading-relaxed max-w-4xl mx-auto mb-10 text-center">
              {card.description1 || ""}
            </p>
            <h3 className="text-xl font-semibold text-black dark:text-white mb-4  mx-auto  max-w-4xl text-center ">
      {card.listheading || ""}
      </h3>
            {/* First Heading */}
            <h3 className="text-2xl font-semibold text-blue-500 dark:text-white mb-6 text-left mt-20">
            {card.h1 || ""}
            </h3>

            {/* First Full-Width Image */}
            <div className="mb-10 mt-10">
              <Image
                src={card.image1 || "default-image.jpg"}
                alt={`${card.title || "Card Image"} - Full Image 1`}
                width={1920}
                height={1080}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Second Heading */}
            <h3 className="text-2xl font-semibold text-blue-500 dark:text-white mb-6 text-left mt-20">
            {card.h2 || ""}
            </h3>

            {/* Second Full-Width Image */}
            <div className="mb-10 mt-10">
              <Image
                src={card.image2 || "default-image.jpg"} // Replace with a second image if available
                alt={`${card.title || "Card Image"} - Full Image 2`}
                width={1920}
                height={1080}
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>

            {/* Second Description */}
           

       
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default CardDetail;
