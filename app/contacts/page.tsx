"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFax, FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import HeroBackground from "@/components/HeroBackground";

// Updated Division interface to support multiple emails, phones, and fax numbers
interface Division {
  id: string;
  name: string;
  address: React.ReactNode;
  phones: string[]; // Array of phone numbers
  emails: string[]; // Array of emails
  fax: string; // Fax number
  mapLocation: string; // URL for map location
  socialLinks: { facebook: string; instagram: string; linkedin: string };
}

const contactDivisions: Division[] = [
  {
    id: "glass",
    name: "Glass Division",
    address: (
      <>   <br />
        Industrial City of Abu Dhabi (ICAD) #1 <br />
        P.O.Box: 30665 <br />
        Abu Dhabi, United Arab Emirates
      </>
    ),
    emails: ["info@whitealuminium.ae", "itsupport@whitealuminium.ae"],
    phones: ["+971 2 5500 830", "+971 2 5555 423"],
    fax: "+971 2 5500 828", // Fax number
    mapLocation: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3635.378746404823!2d54.474943!3d24.333296!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e4062d1ce5d41%3A0xdfc274bd690ba904!2sWhite%20Aluminium%20Glass%20Division!5e0!3m2!1sen!2sae!4v1737438900245!5m2!1sen!2sae",
    socialLinks: {
      facebook: "https://www.facebook.com/whitealuminiumglassdivision",
      instagram: "https://www.instagram.com/whiteglassdivision/",
      linkedin: "https://www.linkedin.com/company/white-aluminium-enterprises/",
    },
  },
  {
    id: "Commercial",
    name: "Commercial Division",
    address: (
      <>   <br />
        Industrial City of Abu Dhabi (ICAD) #1 <br />
        P.O.Box: 30665 <br />
        Abu Dhabi, United Arab Emirates
      </>
    ),
    emails: ["info.ho@whitealuminium.ae", "itsupport@whitealuminium.ae"],
    phones: ["+971 2 5555 423", "+971 2 5500 830"],
    fax: "+971 2 5559 847", // Fax number
    mapLocation: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29083.443363756774!2d54.47657!3d24.331495000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e41a7f8c57145%3A0x4e270f43994555a6!2sWhite%20Aluminium%20Enterprises%20Fabrication%20Division!5e0!3m2!1sen!2sus!4v1737438997668!5m2!1sen!2sus",
    socialLinks: {
      facebook: "https://www.facebook.com/people/White-Aluminium-Enterprises-LLC-Commercial-Division/100068555354640/",
      instagram: "https://www.instagram.com/whitecommercialdivision/",
      linkedin: "https://www.linkedin.com/company/white-aluminium-enterprises/",
    },
  },
  {
    id: "Aluminium",
    name: "Architectural Aluminium",
    address: (
      <>   <br />
        Industrial City of Abu Dhabi (ICAD) #1 <br />
        P.O.Box: 30665 <br />
        Abu Dhabi, United Arab Emirates
      </>
    ),
    emails: ["fab@whitealuminium.ae", "itsupport@whitealuminium.ae"],
    phones: ["+971 2 5541 889", "+971 2 5500 830"],
    fax: "+971 2 5545 262", // Fax number
    mapLocation: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29083.443363756774!2d54.47657!3d24.331495000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e41a7f8c57145%3A0x4e270f43994555a6!2sWhite%20Aluminium%20Enterprises%20Fabrication%20Division!5e0!3m2!1sen!2sus!4v1737438997668!5m2!1sen!2sus",
    socialLinks: {
      facebook: "https://www.facebook.com/people/White-Aluminium-Enterprises-LLC-Fire-Rated-Glazed-Division/100076141713122/",
      instagram: "https://www.instagram.com/whitefirerateddivision/",
      linkedin: "https://www.linkedin.com/company/white-aluminium-enterprises/",
    },
  },
  {
    id: "auto entrramce",
    name: " Automatic Entrance",
    address: (
      <>  <br />
        Industrial City of Abu Dhabi (ICAD) #1 <br />
        P.O.Box: 30665 <br />
        Abu Dhabi, United Arab Emirates
      </>
    ),
    emails: ["info@whitealuminium.ae", "itsupport@whitealuminium.ae"],
    phones: ["+971 2 5551 690", "+971 2 5500 830"],
    fax: "+971 2 5551 691", // Fax number
    mapLocation: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29083.443363756774!2d54.47657!3d24.331495000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e41a7f8c57145%3A0x4e270f43994555a6!2sWhite%20Aluminium%20Enterprises%20Fabrication%20Division!5e0!3m2!1sen!2sus!4v1737438997668!5m2!1sen!2sus",
    socialLinks: {
      facebook: "https://www.facebook.com/people/White-Aluminium-Enterprises-LLC-Commercial-Division/100068555354640/",
      instagram: "https://www.instagram.com/whitecommercialdivision/",
      linkedin: "https://www.linkedin.com/company/white-aluminium-enterprises/",
    },
  },
  {
    id: " kit division",
    name: " Kitchen Division",
    address: (
      <>
      <br />
      Land Mark Burjeel Hospital - Najdah Street, <br /> Opposit Gems World Acadamy, <br /> Abu Dhabi, United Arab Emirates
      </>
    ),
    emails: ["kitchen@whitealuminium.ae", "itsupport@whitealuminium.ae"],
    phones: ["+971 2 6426 700", "+971 2 5500 830"],
    fax: "+971 2 6423 572", // Fax number
    mapLocation: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3527.790530535545!2d54.37854539444149!3d24.47982037188893!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e663873b8e163%3A0xbdec54c8cf87afee!2sWhite%20Aluminium%20Kitchen!5e0!3m2!1sen!2sae!4v1737439162396!5m2!1sen!2sae",
    socialLinks: {
      facebook: "https://www.facebook.com/Aluminiumkitchenpantrywardrobes",
      instagram: "https://www.instagram.com/whitealuminiumkitchens",
      linkedin: "https://www.linkedin.com/company/white-aluminium-enterprises/",
    },
  },
  {
    id: " fire rated",
    name: " Fire Rated Glazed Doors & Facades",
    address: (
      <>   <br />
        Industrial City of Abu Dhabi (ICAD) #1 <br />
        P.O.Box: 30665 <br />
        Abu Dhabi, United Arab Emirates
      </>
    ),
    emails: ["asif@whitealuminium.ae", "fab@whitealuminium.ae"],
      phones: ["+971 2 5541 889", "+971 50 8298 071"],
      fax: "+971 2 5545 262",// Fax number
    mapLocation: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29083.443363756774!2d54.47657!3d24.331495000000004!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5e41a7f8c57145%3A0x4e270f43994555a6!2sWhite%20Aluminium%20Enterprises%20Fabrication%20Division!5e0!3m2!1sen!2sus!4v1737438997668!5m2!1sen!2sus",
    socialLinks: {
      facebook: "https://www.facebook.com/people/White-Aluminium-Enterprises-LLC-Fire-Rated-Glazed-Division/100076141713122/",
      instagram: "https://www.instagram.com/whitefirerateddivision/",
      linkedin: "https://www.linkedin.com/company/white-aluminium-enterprises/",
    },
  },
  // Add more divisions here
];

const ContactUsPage = () => {
  const [selectedDivision, setSelectedDivision] = useState<Division | null>(null);

  const handleCardClick = (division: Division) => {
    setSelectedDivision(division);
  };

  const handleBackClick = () => {
    setSelectedDivision(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 dark:bg-blacksection"
    >
      <HeroBackground
        imageSrc="/images/hero/herotop.webp"
        title=""
        subtitle=""
      />
      {!selectedDivision ? (
        <>
          <section className="text-center mb-12 px-4 mt-10">
            <h2 className="text-3xl font-bold textblue dark:text-white">Contact Us</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Get in touch with our divisions for more information</p>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
            {contactDivisions.map((division) => (
              <motion.div
                key={division.id}
                onClick={() => handleCardClick(division)}
                className=" shadow-lg rounded-lg p-6 cursor-pointer hover:scale-105 transform transition-all  bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 dark:via-gray-700 "
                whileHover={{ scale: 1.05 }} // Adds a smooth hover effect
              >
                <div className="text-center">
                  <h3 className="text-xl font-semibold textblue dark:text-white">{division.name}</h3>
                  <div className="flex justify-center items-center space-x-4 mt-4">
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="text-primary" />
                      <span>Location</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaPhoneAlt className="text-primary" />
                      <span>Contact</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaEnvelope className="text-primary" />
                      <span>Email</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </>
      ) : (
        <div  className="p-5 pb-30">
            <section className="text-center mb-12 px-4 mt-10">
            <h2 className="text-3xl font-bold textblue dark:text-white">Contact Us</h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">Get in touch with our divisions for more information</p>
          </section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-8 px-4">
            {contactDivisions.map((division) => (
              <motion.div
                key={division.id}
                onClick={() => handleCardClick(division)}
                className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:scale-105 transform transition-all dark:bg-black"
              >
                <div className="text-center">
                  <h3 className="text-sm font-semibold textblue dark:text-white">{division.name}</h3>
         
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col lg:flex-row gap-8 px-4 mt-20 w-[80vw] mx-auto">
            {/* Division Information Box */}
            <motion.div
              key={selectedDivision.id}
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/2 shadow-lg rounded-lg p-6 bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 dark:via-gray-700"
            >
              <h3 className="text-2xl font-semibold textblue dark:text-white">{selectedDivision.name}</h3>
              <p className="mt-4 text-gray-600 dark:text-gray-400">
                <strong>Address:</strong> {selectedDivision.address}
              </p>

              {/* Display multiple phone numbers */}
              <div className="mt-2 text-gray-600 dark:text-gray-400">
                <strong>Phone:</strong>
                <div className="flex flex-col">
                  {selectedDivision.phones.map((phone, index) => (
                    <span key={index} className="flex items-center space-x-2">
                      <FaPhoneAlt className="text-primary" />
                      <span>{phone}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Display multiple emails */}
              <div className="mt-2 text-gray-600 dark:text-gray-400">
                <strong>Email:</strong>
                <div className="flex flex-col">
                  {selectedDivision.emails.map((email, index) => (
                    <span key={index} className="flex items-center space-x-2">
                      <FaEnvelope className="text-primary" />
                      <a href={`mailto:${email}`} className="text-primary">
                        {email}
                      </a>
                    </span>
                  ))}
                </div>
              </div>

              {/* Display fax */}
              <div className="mt-2 text-gray-600 dark:text-gray-400">
                <strong>Fax:</strong>
                <div className="flex items-center space-x-2">
                  <FaFax className="text-primary" />
                  <span>{selectedDivision.fax}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="mt-6 flex space-x-4">
                <a href={selectedDivision.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-primary">
                  <FaFacebook size={24} />
                </a>
                <a href={selectedDivision.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-primary">
                  <FaInstagram size={24} />
                </a>
                <a href={selectedDivision.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary">
                  <FaLinkedin size={24} />
                </a>
              </div>

              {/* Back Button */}
              <div className="w-full mt-6 flex justify-center">
                <button
                  onClick={handleBackClick}
                  className="bg-primary text-white py-2 px-4 rounded-md mt-6 w-32 transition duration-200 ease-in-out hover:bg-primary-dark"
                >
                  Back
                </button>
              </div>
            </motion.div>

            {/* Map Section */}
            <motion.div
              className="w-full lg:w-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              
              <iframe
                src={selectedDivision.mapLocation}
                width="100%"
                height="500"
                frameBorder="0"
                style={{ border: "1px solid blue" }}
                allowFullScreen
                aria-hidden="false"
                tabIndex={0}
              ></iframe>
            </motion.div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ContactUsPage;
