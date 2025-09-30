"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PhoneInput from "react-phone-input-2";
import Select from "react-select";
import { FaUser, FaPhone, FaEnvelope, FaBuilding, FaGlobe, FaComment, FaTag } from "react-icons/fa";
import "react-phone-input-2/lib/style.css";
import countries from "@/countries.json";

const InquiryForm = ({ setInquiryOpen }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [divisions, setDivisions] = useState<{ id: string; name: string }[]>([]);
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    division: "",
    subject: "",
    country: null,
    message: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const countryOptions = countries.map((country) => ({
    value: country.cca2,
    label: `${country.flag} ${country.name}`,
  }));

  useEffect(() => {
    setHasMounted(true);
    const fetchDivisions = async () => {
      try {
        const response = await fetch("/api/division/getdivisions");
        if (!response.ok) throw new Error("Failed to fetch divisions.");
        const data = await response.json();
        setDivisions(data);
      } catch (error) {
        console.error("Error fetching divisions:", error);
        setErrorMessage("Failed to load divisions. Please try again.");
      }
    };
    fetchDivisions();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectCountry = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email || !formData.message || !formData.country || !formData.division) {
      setErrorMessage("Please fill out all required fields.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setFormData({
          fullName: "",
          phone: "",
          email: "",
          division: "",
          subject: "",
          country: null,
          message: "",
        });
        alert("Your inquiry has been submitted successfully.");
        setInquiryOpen(false);
      } else {
        setErrorMessage("Error submitting the form. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setErrorMessage("Error submitting the form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasMounted) {
    return null;
  }

  return (
    <section
    className="fixed inset-0 flex items-center justify-center bg-transparent backdrop-blur-sm z-50"
    style={{ height: "100vh", width: "100vw" }}
    
    >
      <div className="relative max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="text-2xl font-bold textblue mb-6 text-center">Inquiry Form</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Full Name */}
              <div className="relative">
                <FaUser className="absolute top-1/2 transform -translate-y-1/2 left-3 textblue" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full pl-10 py-2 border-b-2 text-gray-800 border-gray-300 focus:outline-none focus:border-blue-500 bg-white"
                />
              </div>

              {/* Phone Input */}
              <div className="relative">
                <FaPhone className="absolute top-1/2 transform -translate-y-1/2 left-3 textblue" />
                <div className="flex justify-end w-[89%] ml-auto text-gray-800">
                  <PhoneInput
                    country="us"
                    value={formData.phone}
                    onChange={(value) => setFormData({ ...formData, phone: value })}
                    inputStyle={{
                      width: "100%",
                      paddingLeft: "48px",
                      border: "none",
                      borderBottom: "2px solid #D1D5DB",
                      borderRadius: "0",
                      boxShadow: "none",
                      outline: "none",
                      backgroundColor: "white",
                    }}
                    buttonStyle={{
                      backgroundColor: "transparent",
                      border: "none",
                      borderRadius: "0",
                    }}
                    containerStyle={{
                      width: "100%",
                      border: "none",
                    }}
                  />
                </div>
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute top-1/2 transform -translate-y-1/2 left-3 textblue" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 py-2 border-b-2 text-gray-800 border-gray-300 focus:outline-none focus:border-blue-500 bg-white"
                />
              </div>

              {/* Subject */}
              <div className="relative">
                <FaTag className="absolute top-1/2 transform -translate-y-1/2 left-3 textblue" />
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full pl-10 py-2 border-b-2 text-gray-800 border-gray-300 focus:outline-none focus:border-blue-500 bg-white"
                />
              </div>

              {/* Division */}
              <div className="relative">
                <FaBuilding className="absolute top-1/2 transform -translate-y-1/2 left-3 textblue" />
                <select
                  name="division"
                  value={formData.division}
                  onChange={handleChange}
                  className="w-full pl-10 py-2 border-b-2 text-gray-500 border-gray-300 focus:outline-none focus:border-blue-500 bg-white"
                >
                  <option value="" disabled className="text-gray-400">
                    Select Division
                  </option>
                  {divisions.map((division) => (
                    <option key={division.id} value={division.id} className="text-gray-800">
                      {division.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Country */}
              <div className="relative">
                <FaGlobe className="absolute top-1/2 transform -translate-y-1/2 left-3 textblue" />
                <div className="w-full pl-10">
                  <Select
                   className=" text-gray-500 border-gray-300 focus:outline-none focus:border-blue-500 bg-white"
                    options={countryOptions}
                    value={formData.country}
                    onChange={handleSelectCountry}
                    placeholder="Select Country"
                    styles={{
                      control: (base) => ({
                        ...base,
                        border: "none",
                        borderBottom: "2px solid #D1D5DB",
                        borderRadius: "0",
                        padding: "2px 0",
                        boxShadow: "none",
                        backgroundColor: "white",
                        color: "black", 
                      }),
                    }}
                    classNamePrefix="react-select"
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="relative mt-6">
              <FaComment className="absolute top-3 left-3 textblue" />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full pl-10 py-2 border-b-2 text-gray-800 border-gray-300 focus:outline-none focus:border-blue-500 bg-white"
              />
            </div>

            {errorMessage && <p className="text-red-500 text-sm mt-2">{errorMessage}</p>}

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                type="button"
                onClick={() => setInquiryOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 ${
                  isSubmitting ? "opacity-50" : ""
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default InquiryForm;
