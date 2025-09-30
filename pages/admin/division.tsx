import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

function Division() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [divisionUrl, setdivisionUrl] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  interface Division {
    id: string;
    name: string;
    description: string;
    divisionUrl: string;
    email: string;
    createdAt: string;
  }

  const [divisions, setDivisions] = useState<Division[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [divisionToDelete, setDivisionToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const divisionsPerPage = 15;

  useEffect(() => {
    const fetchDivisions = async () => {
      try {
        const response = await fetch("/api/division/getdivisions");
        if (!response.ok) throw new Error("Failed to fetch divisions.");
        const data = await response.json();
        setDivisions(data);
      } catch (error) {
        console.error("Error fetching divisions:", error);
        setMessage("Error fetching divisions.");
      }
    };
    fetchDivisions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !description || !divisionUrl || !email || !picture) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("divisionUrl", divisionUrl);
    formData.append("email", email);
    formData.append("picture", picture);

    try {
      const response = await fetch("/api/division/uploaddivisions", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Division added successfully!");
        setDivisions((prevDivisions) => [...prevDivisions, data]);
        setShowForm(false);
        setName("");
        setDescription("");
        setdivisionUrl("");
        setEmail("");
        setPicture(null);
      } else {
        setMessage("Failed to add division.");
      }
    } catch (error) {
      console.error("Error adding division:", error);
      setMessage("An error occurred.");
    }
  };

  const handleDelete = async (divisionId: string) => {
    try {
      const response = await fetch(`/api/division/uploaddivisions?divisionId=${divisionId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setDivisions((prevDivisions) => prevDivisions.filter((d) => d.id !== divisionId));
        setMessage("Division deleted successfully.");
        setIsDeleteModalOpen(false);
      } else {
        setMessage("Failed to delete the division.");
      }
    } catch (error) {
      console.error("Error deleting division:", error);
      setMessage("An error occurred while deleting.");
    }
  };

  const handleOpenDeleteModal = (divisionId: string) => {
    setDivisionToDelete(divisionId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDivisionToDelete(null);
  };

  const filteredDivisions = divisions.filter((division) =>
    division.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastDivision = currentPage * divisionsPerPage;
  const indexOfFirstDivision = indexOfLastDivision - divisionsPerPage;
  const currentDivisions = filteredDivisions.slice(indexOfFirstDivision, indexOfLastDivision);
  const totalPages = Math.ceil(filteredDivisions.length / divisionsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
     

      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Division Management</h2>

        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          onClick={() => setShowForm(true)}
        >
          Add New Division
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
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Add Division</h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-6">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description:
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="divisionUrl" className="block text-sm font-medium text-gray-700">
                    divisionUrl:
                  </label>
                  <input
                    type="tel"
                    id="divisionUrl"
                    name="divisionUrl"
                    value={divisionUrl}
                    onChange={(e) => setdivisionUrl(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="picture" className="block text-sm font-medium text-gray-700">
                    Picture:
                  </label>
                  <input
                    type="file"
                    id="picture"
                    name="picture"
                    accept="image/*"
                    onChange={(e) => setPicture(e.target.files?.[0] || null)}
                    className="mt-1 block w-full text-gray-700"
                    required
                  />
                
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                {/* <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Description</th> */}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">divisionUrl</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Created At</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentDivisions.map((division) => (
                <tr key={division.id}>
                  <td className="px-6 py-4 text-sm text-gray-700">{division.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{division.name}</td>
                  {/* <td className="px-6 py-4 text-sm text-gray-700">{division.description}</td> */}
                  <td className="px-6 py-4 text-sm text-gray-700">{division.divisionUrl}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{division.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatDate(division.createdAt)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <button
                      onClick={() => handleOpenDeleteModal(division.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {isDeleteModalOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={handleCloseDeleteModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Confirm Deletion</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this division? This action cannot be undone.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={handleCloseDeleteModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => divisionToDelete && handleDelete(divisionToDelete)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
    </AdminLayout>
  );
}

export default Division;
