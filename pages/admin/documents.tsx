import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

function DocumentManagement() {
  const [name, setName] = useState("");
  const [pdf, setPdf] = useState<File | null>(null);
  const [divisionId, setDivisionId] = useState<string>("");
  const [message, setMessage] = useState("");
  interface Document {
    id: string;
    name: string;
    divisionId: number;
  }

  const [documents, setDocuments] = useState<Document[]>([]);
  interface Division {
    id: number;
    name: string;
  }

  const [divisions, setDivisions] = useState<Division[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const documentsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const documentResponse = await fetch("/api/document/getdocument");
        if (!documentResponse.ok) throw new Error("Failed to fetch documents.");
        const documentData = await documentResponse.json();
        setDocuments(documentData);

        const divisionResponse = await fetch("/api/division/getdivisions");
        if (!divisionResponse.ok) throw new Error("Failed to fetch divisions.");
        const divisionData = await divisionResponse.json();
        setDivisions(divisionData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !pdf || !divisionId) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("pdf", pdf);
    formData.append("divisionId", divisionId);

    try {
      const response = await fetch("/api/document/uploaddocument", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Document added successfully!");
        setDocuments((prevDocuments) => [...prevDocuments, data]);
        setShowForm(false);
        setName("");
        setPdf(null);
        setDivisionId("");
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading document:", error);
      setMessage("An error occurred.");
    }
  };

  const handleDelete = async (documentId: string) => {
    try {
      const response = await fetch(`/api/document/uploaddocument?documentId=${documentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDocuments((prevDocuments) =>
          prevDocuments.filter((document) => document.id !== documentId)
        );
        setMessage("Document deleted successfully.");
        setIsDeleteModalOpen(false);
      } else {
        setMessage("Failed to delete the document.");
      }
    } catch (error) {
      console.error("Error deleting document:", error);
      setMessage("An error occurred while deleting.");
    }
  };

  const handleOpenDeleteModal = (documentId: string) => {
    setDocumentToDelete(documentId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDocumentToDelete(null);
  };

  const filteredDocuments = documents.filter((document) =>
    document.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastDocument = currentPage * documentsPerPage;
  const indexOfFirstDocument = indexOfLastDocument - documentsPerPage;
  const currentDocuments = filteredDocuments.slice(indexOfFirstDocument, indexOfLastDocument);
  const totalPages = Math.ceil(filteredDocuments.length / documentsPerPage);

  const getDivisionName = (divisionId: number) => {
    const division = divisions.find((div) => div.id === divisionId);
    return division ? division.name : "Unknown";
  };

  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
    

      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Document Management</h2>

        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          onClick={() => setShowForm(true)}
        >
          Add New Document
        </button>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {showForm && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={() => setShowForm(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm overflow-y-auto max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Upload a Document</h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="pdf" className="block text-gray-700">PDF</label>
                  <input
                    type="file"
                    id="pdf"
                    onChange={(e) => setPdf(e.target.files ? e.target.files[0] : null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    accept=".pdf"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="divisionId" className="block text-gray-700">Division</label>
                  <select
                    id="divisionId"
                    value={divisionId}
                    onChange={(e) => setDivisionId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Division</option>
                    {divisions.map((division) => (
                      <option key={division.id} value={division.id}>
                        {division.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Upload Document
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isDeleteModalOpen && documentToDelete && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={handleCloseDeleteModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-700">Delete Document</h3>
              <p className="mt-4">Are you sure you want to delete this document?</p>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                  onClick={() => documentToDelete && handleDelete(documentToDelete)}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700"
                  onClick={handleCloseDeleteModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="overflow-hidden bg-white shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Division</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDocuments.map((document) => (
                <tr key={document.id}>
                  <td className="border px-4 py-2">{document.id}</td>
                  <td className="border px-4 py-2">{document.name}</td>
                  <td className="border px-4 py-2">
                    {getDivisionName(document.divisionId)}
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleOpenDeleteModal(document.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-4 py-2 rounded-md ${
                i + 1 === currentPage
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}

export default DocumentManagement;
