import { Metadata } from "next";
import Hero from "@/components/Hero";
// import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";

import FunFact from "@/components/FunFact";
import PartnerCarousel from "@/components/PartnerCarousel";
// import Integration from "@/components/Integration";
// import CTA from "@/components/CTA";
// import FAQ from "@/components/FAQ";
// import Pricing from "@/components/Pricing";
// import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
// import Testimonial from "@/components/Testimonial";
import Division from "@/components/Divisions";
import ProjectCarousel from "@/components/ProjectCarousel";
// import Testimonial from "@/components/Testimonial";
import Head from '@/app/head';

import TeamSlider from "@/components/Team/TeamSlider";

export const metadata: Metadata = {
  title: "White Aluminium Enterprises",
  description: "White Aluminium Group Of Companies",
  
  // other metadata
  
};

export default function Home() {
  return (
    <main>
         <Head />
      <Hero />
      {/* <Brands /> */}
      <PartnerCarousel />
      <Feature />
      <About />
      <Division />
      <ProjectCarousel />
      
     
      <FunFact />
      {/* <Integration /> */}
      {/* <CTA /> */}
      {/* <FAQ /> */}
      {/* <Testimonial /> */}
    
      {/* <Pricing /> */}
      {/* <Contact /> */}
      <Blog />
      <TeamSlider />
      
    </main>
  );
}
