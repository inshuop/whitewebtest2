"use client";
import React, { useEffect, useState } from "react";
import { FaFilePdf } from "react-icons/fa";
import Sidebar from "@/components/divisionhero/firerat/Sidebar"; 
import PartnerCarousel from "@/components/PartnerCarousel";

interface DocumentData {
  name: string;
  pdfPath: string;
}

const PdfViewer: React.FC = () => {
  const [document, setDocument] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch("/api/document/getdocument");
        if (!response.ok) {
          throw new Error("Failed to fetch document");
        }
        const data = await response.json();
        if (data.length > 0) {
          setDocument(data[0]); // Assuming you're displaying the first document
        } else {
          setError("No document found.");
        }
      } catch (err: unknown) {
        console.error("Error fetching document:", err);
        if (err instanceof Error) {
          setError(err.message || "Failed to load document. Please try again later.");
        } else {
          setError("Failed to load document. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
  }

  if (!document) {
    return <div className="flex justify-center items-center h-screen text-gray-500">No document available.</div>;
  }

  return (
    <div>
      <Sidebar /> {/* Use the GlassSidebar component */}
      <PartnerCarousel />
    <div className="flex flex-col items-center justify-center h-[60vh] bg-gray-100 p-4">
         
      <a
        href={document.pdfPath}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col items-center justify-center w-64 h-64 bg-white shadow-lg rounded-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300"
      >
        <FaFilePdf className="text-red-500 text-8xl mb-4" />
        <span className="text-lg font-medium text-gray-700">{document.name}</span>
      </a>
     
    </div>
    </div>
  );
};

export default PdfViewer;
