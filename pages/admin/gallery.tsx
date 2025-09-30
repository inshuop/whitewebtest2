import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

function GalleryManagement() {
  const [name, setName] = useState("");
  const [pictures, setPictures] = useState<File[]>([]);
  const [divisionId, setDivisionId] = useState<string>("");
  const [message, setMessage] = useState("");
  interface GalleryItem {
    id: string;
    name: string;
    divisionId: string;
    picture: string;
  }

  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  interface Division {
    id: string;
    name: string;
  }

  const [divisions, setDivisions] = useState<Division[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const galleryResponse = await fetch("/api/gallary/getgallary");
        if (!galleryResponse.ok) throw new Error("Failed to fetch gallery items.");
        const galleryData = await galleryResponse.json();
        setGalleryItems(galleryData);

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

    if (!name || pictures.length === 0 || !divisionId) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("divisionId", divisionId);
    pictures.forEach((file) => formData.append("pictures", file));

    try {
      const response = await fetch("/api/gallary/uploadgallary", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Gallery items added successfully!");
        setGalleryItems((prevItems) => [...prevItems, ...data]);
        setShowForm(false);
        setName("");
        setPictures([]);
        setDivisionId("");
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading gallery items:", error);
      setMessage("An error occurred.");
    }
  };

  const handleDelete = async (galleryId: string) => {
    try {
      const response = await fetch(`/api/gallary/uploadgallary?galleryId=${galleryId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setGalleryItems((prevItems) =>
          prevItems.filter((item) => item.id !== galleryId)
        );
        setMessage("Gallery item deleted successfully.");
        setIsDeleteModalOpen(false);
      } else {
        setMessage("Failed to delete the gallery item.");
      }
    } catch (error) {
      console.error("Error deleting gallery item:", error);
      setMessage("An error occurred while deleting.");
    }
  };

  const filteredItems = galleryItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const getDivisionName = (divisionId: string) => {
    const division = divisions.find((div) => div.id === divisionId);
    return division ? division.name : "Unknown";
  };

  return (<AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
  

      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Gallery Management</h2>

        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          onClick={() => setShowForm(true)}
        >
          Add New Gallery Items
        </button>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Form Modal */}
        {showForm && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={() => setShowForm(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm overflow-y-auto max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Upload Gallery Items</h3>
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
                  <label htmlFor="pictures" className="block text-gray-700">Pictures</label>
                  <input
                    type="file"
                    id="pictures"
                    multiple
                    onChange={(e) => setPictures(Array.from(e.target.files || []))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    accept="image/jpeg, image/png, image/gif"
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
                    Upload Gallery Items
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Gallery Table */}
        <div className="overflow-hidden bg-white shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Division</th>
                <th className="px-4 py-2 text-left">Picture</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr key={item.id}>
                  <td className="px-4 py-2">{item.id}</td>
                  <td className="px-4 py-2">{item.name}</td>
                  <td className="px-4 py-2">{getDivisionName(item.divisionId)}</td>
                  <td className="px-4 py-2">
                    <Image
                      src={item.picture}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover rounded-md"
                    />
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => {
                        setIsDeleteModalOpen(true);
                        setItemToDelete(item.id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            Previous
          </button>
          <span className="mx-4">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md hover:bg-blue-50"
          >
            Next
          </button>
        </div>

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Confirm Delete</h3>
              <p>Are you sure you want to delete this gallery item?</p>
              <div className="mt-4 flex justify-end">
                <button
                  className="text-gray-500 hover:text-gray-700 mr-4"
                  onClick={() => setIsDeleteModalOpen(false)}
                >
                  Cancel
                </button>
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                  onClick={() => {
                    if (itemToDelete) handleDelete(itemToDelete);
                  }}
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

export default GalleryManagement;
