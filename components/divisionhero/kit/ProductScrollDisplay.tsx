import React, { useState, useEffect } from "react";
import { FaWhatsapp, FaEnvelope } from "react-icons/fa";

import Image from 'next/image';

interface Product {
  id: number;
  divisionId: number;
  pictures: string;
  title: string;
  phone: string;
  email: string;
  description: string;
}

const FeaturedProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch products from the API
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/product/getproduct");
        const data = await response.json();

        // Filter products where divisionId is 19
        const filteredProducts = data.filter(product => product.divisionId === 19);
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="w-full h-[120vh] border-strokedark bg-blacksection flex justify-center items-start py-8">
        <div className="w-full overflow-y-auto max-h-[calc(90vh)] px-6 space-y-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="transform transition-transform duration-500 hover:scale-105 hover:translate-y-2"
            >
              <div className="bg-black p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <Image
                  src={product.pictures}
                  alt={product.title}
                  width={320}
                  height={320}
                  className="w-full h-80 object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <a
                      href={`https://wa.me/${product.phone}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-600 text-2xl hover:text-green-700 transition-colors"
                    >
                      <FaWhatsapp />
                    </a>
                    <a
                      href={`mailto:${product.email}?subject=Inquiry about this Product :-  ${encodeURIComponent(product.title)}&body=I would like to inquire about this product: ${encodeURIComponent(product.title)}.`}
                      className="text-white text-2xl hover:text-blue-700 transition-colors"
                    >
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
                <p className="text-gray-400 mt-2">{product.description}</p>
                <div className="mt-4 flex justify-start">
                  <a
                    href={`mailto:${product.email}?subject=Inquiry about ${encodeURIComponent(product.title)}&body=I would like to inquire about this product: ${encodeURIComponent(product.title)}.`}
                    className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                  >
                    Get Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default FeaturedProductCard;
