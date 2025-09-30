/* eslint-disable @next/next/no-img-element */
"use client";

import React from "react";
import GlassSidebar from "@/components/divisionhero/kit/Sidebar";
import PartnerCarousel from "@/components/PartnerCarousel";
// import ProductScrollDisplay from "@/components/divisionhero/kit/ProductScrollDisplay";
import ProjectCarousel from "@/components/ProjectCarousel";

const GlassDivision: React.FC = () => {
  return (
    <>
      <div className="dark:bg-black dark:text-white">
        {/* Sidebar and Partner Carousel */}
        <GlassSidebar />
        <PartnerCarousel />

        {/* Kitchen Division Introduction */}
        <section className="py-10 px-5 bg-gray-100 dark:bg-gray-900 mb-8 mt-15">
          <h1 className="text-4xl font-bold text-center mb-6 textblue">
            White Aluminium Kitchen Division
          </h1>
          <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto">
            Manufacturing Aluminium Kitchen Cabinets, Pantry, Aluminium
            Wardrobe, Kitchens Accessories & Appliances.
          </p>
        </section>

        {/* History and Tradition */}
        <section className="py-10 px-5 bg-white dark:bg-blacksection mb-8">
          <h2 className="text-3xl font-bold mb-4 text-center textblue">About Us</h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto text-center">
            For almost 30 years, White Aluminium Enterprises L.L.C. has been
            revolutionizing the architectural scene through innovative product
            concepts conceived and designed for elegance that transcends time.
            Their products are built to last, with attention to detail and quality
            that ensure both functionality and style in your home.
          </p>
        </section>

        {/* NATURAL Coating System */}
        <section className="py-10 px-5 bg-gray-100 dark:bg-gray-900 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-center textblue">NATURAL Coating System</h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto">
            In keeping with this tradition, White Aluminium Enterprises L.L.C.
            introduces Kitchen Doors coated with the wonder material{" "}
            <strong>NATURAL</strong> that reflects a natural look and holds an
            Aluminium heart.
          </p>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto mt-4">
            <strong>NATURAL</strong> is the first Aluminium Coating system using
            only polyester powder, which has changed the way finishing is done.
          </p>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto mt-4">
            The aesthetically outstanding finish is only one of the many
            elements that have made <strong>NATURAL</strong> a winner all the
            way. It is also resistant to intense light, bad weather, shocks, and
            abrasions.
          </p>
        </section>

        {/* Key Features */}
        <section className="py-10 px-5 bg-white dark:bg-blacksection mb-8">
          <h2 className="text-3xl font-bold mb-4 text-center textblue">Key Features</h2>
          <ul className="list-disc list-inside max-w-4xl mx-auto text-lg">
            <li>Waterproof and fire-resistant kitchen doors.</li>
            <li>
              Available in a choice of six fine wood finishes: Oak, Ash Wood,
              Pitch Pine, Cherry, Evergreen, and Light Grey Marble.
            </li>
            <li>
              Incorporates pressed Aluminium sandwich panels for greater
              durability and quality finish.
            </li>
            <li>
              Modern designs that ensure a timeless and elegant aesthetic in
              your kitchen.
            </li>
            <li>
              Strong and durable materials ensure long-lasting performance
              even under harsh conditions.
            </li>
          </ul>
        </section>

        {/* La Cucina Kitchens */}
        <section className="py-10 px-5 bg-gray-100 dark:bg-gray-900 mb-8">
          <h2 className="text-3xl font-bold mb-4 text-center textblue">La Cucina Kitchens</h2>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto">
            As the heart of your home, La Cucina kitchens blend both appeal and
            comfort. Discover our collection of personalized kitchens featuring
            an eclectic mix of modern, minimalistic, and timeless classic
            designs that blend seamlessly into your home layout.
          </p>
          <p className="text-lg leading-relaxed max-w-4xl mx-auto mt-4">
            We offer a wide range of designs to cater to your style, whether
            you are looking for something sleek and contemporary or a more
            traditional aesthetic. Every kitchen is carefully crafted to meet
            your specific needs and taste.
          </p>
        </section>

        {/* Product and Project Displays */}
        {/* <ProductScrollDisplay /> */}
        <ProjectCarousel />

        {/* Contact Information */}
    
      </div>
    </>
  );
};

export default GlassDivision;
