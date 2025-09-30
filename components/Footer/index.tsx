"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { divisionData } from "./divisionData";
import { FaFacebook, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaFax,  FaMapMarkerAlt } from "react-icons/fa";
import { useState } from "react";

const Footer = () => {
  const pathname = usePathname();

  // Extract division from the URL (e.g., /division/division1)
  const divisionMatch = pathname ? pathname.match(/\/divisions\/(\w+)/) : null;
  const division = divisionMatch ? divisionMatch[1] : "default";

  const { name, emails, phones, fax, timings, socialLinks } =
    divisionData[division] || divisionData.default;

  const [isOpen, setIsOpen] = useState({
    contact: false,
    hours: false,
    address: false,
  });

  const toggleCollapse = (section: string) => {
    setIsOpen((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return (

    
    <footer className="border-t border-stroke bg-white dark:border-strokedark dark:bg-blacksection py-10">
      <div className="mx-auto w-[90vw] px-4 md:px-8 lg:px-20">
        {/* Division Name Heading */}
        <div className="text-center pt-5  hidden sm:block  ">
          <h2 className="text-2xl font-semibold textblue dark:text-white py-5 ">
            {name}
          </h2>
          <hr className="mt-2 border-t border-gray-200 dark:border-gray-600" />
        </div>

        {/* Desktop View */}
        <div className="hidden lg:grid grid-cols-4 gap-12 text-center lg:text-left py-15">
          <div>
            <a href="#">
              <Image
                width={200}
                height={100}
                src="/images/logo/bluelogo.webp"
                alt="Logo"
                className="mx-auto lg:mx-0"
              />
            </a>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
              Contact Us
            </h4>
            <ul className="space-y-2">
              {emails.map((email, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaEnvelope className="textblue" />
                  <a href={`mailto:${email}`} className="hover:text-primary">
                    {email}
                  </a>
                </li>
              ))}
              {phones.map((phone, index) => (
                <li key={index} className="flex items-center gap-2">
                  <FaPhone className="textblue" />
                  <a href={`tel:${phone}`} className="hover:text-primary">
                    {phone}
                  </a>
                </li>
              ))}
              <li className="flex items-center gap-2">
                <FaFax className="textblue" />
                <span>{fax}</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
              Our Address
            </h4>
            <div className="flex items-start gap-2">
              <FaMapMarkerAlt className="textblue mt-1" />
              <p>
                Industrial City of Abu Dhabi (ICAD) #1<br />
                P.O.Box: 30665<br />
                Abu Dhabi, United Arab Emirates
              </p>
            </div>
          </div>
          <div>
            <h4 className="mb-4 text-lg font-medium text-gray-800 dark:text-white">
              Operating Hours
            </h4>
            <p>{timings.weekday}: {timings.weekdayTime}</p>
            <p>{timings.friday}: {timings.fridayTime}</p>
            <p>{timings.sunday}: {timings.sundayTime}</p>
          </div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col items-center gap-6 text-center mt-4">
        <div>
            <a href="#">
              <Image
                width={200}
                height={100}
                src="/images/logo/bluelogo.webp"
                alt="Logo"
                className="mx-auto lg:mx-0"
              />
            </a>
            <hr className="mt-2 border-t border-gray-200 dark:border-gray-600" />
          </div>  
          
          {["contact", "hours", "address"].map((section) => (
            
            <div key={section}>
              
              <button
                className="w-full py-2 font-medium bg-gray-100 dark:bg-gray-800 text-black dark:text-white rounded-md"
                onClick={() => toggleCollapse(section)}
              >
                {section === "contact"
                  ? "Contact Us"
                  : section === "hours"
                  ? "Operating Hours"
                  : "Our Address"}
              </button>
              {isOpen[section] && (
                <div className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {section === "contact" && (
                    <>
                      {emails.map((email, index) => (
                        <div key={index}>
                          <FaEnvelope className="inline text-blue-500 mr-2" />
                          <a href={`mailto:${email}`} className="hover:text-primary">
                            {email}
                          </a>
                        </div>
                      ))}
                      {phones.map((phone, index) => (
                        <div key={index}>
                          <FaPhone className="inline text-blue-500 mr-2" />
                          <a href={`tel:${phone}`} className="hover:text-primary">
                            {phone}
                          </a>
                        </div>
                      ))}
                      <div>
                        <FaFax className="inline text-blue-500 mr-2" />
                        {fax}
                      </div>
                    </>
                  )}
                  {section === "hours" && (
                    <>
                      <p>{timings.weekday}: {timings.weekdayTime}</p>
                      <p>{timings.friday}: {timings.fridayTime}</p>
                      <p>{timings.sunday}: {timings.sundayTime}</p>
                    </>
                  )}
                  {section === "address" && (
                    <>
                      Industrial City of Abu Dhabi, ICAD #1<br />
                      P.O.Box: 30665<br />
                      Abu Dhabi, United Arab Emirates
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        <div className="flex flex-wrap items-center justify-between border-t border-stroke py-7 dark:border-strokedark text-center">
        <ul className="hidden sm:flex items-center gap-8">
  <li><a href="#">English</a></li>
  <li><a href="#">Privacy Policy</a></li>
  <li><a href="/careers">Careers</a></li>
</ul>


  <p>&copy; {new Date().getFullYear()} White Aluminium Enterprises LLC. All Rights Reserved.</p>
  <div className="w-full  md:mt-0 md:w-auto flex justify-center md:justify-end">
    <ul className="flex items-center gap-5">
      {socialLinks.facebook && (
        <li>
          <a
            href={socialLinks.facebook}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-500 transition-colors text-2xl mx-3"
          >
            <FaFacebook />
          </a>
        </li>
      )}
      {socialLinks.instagram && (
        <li>
          <a
            href={socialLinks.instagram}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-500 transition-colors text-2xl mx-3"
          >
            <FaInstagram />
          </a>
        </li>
      )}
      {socialLinks.linkedin && (
        <li>
          <a
            href={socialLinks.linkedin}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-400 dark:hover:text-blue-500 transition-colors text-2xl mx-3"
          >
            <FaLinkedin />
          </a>
        </li>
      )}
    </ul>
    
  </div>

</div>


      </div>
    </footer>
  );
};

export default Footer;
