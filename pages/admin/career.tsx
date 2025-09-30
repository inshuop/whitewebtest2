import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

const CareerManagement = () => {
  const [formData, setFormData] = useState({
    department: "",
    divisionId: "",
    location: "",
    jobTitle: "",
    totalVacancy: "",
    jobType: "",
    gender: "",
    experience: "",
    detail: "",
    applyBy: "",
    status: "",
  });
  const [message, setMessage] = useState("");
  interface Career {
    id: string;
    department: string;
    divisionId: number;
    location: string;
    jobTitle: string;
    totalVacancy: number;
    jobType: string;
    gender: string;
    experience: string;
    detail: string;
    applyBy: string;
    status: string;
    createdAt: string;
  }

  const [careers, setCareers] = useState<Career[]>([]);
  interface Division {
    id: number;
    name: string;
  }

  const [divisions, setDivisions] = useState<Division[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editCareerId, setEditCareerId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [careerToDelete, setCareerToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const careersPerPage = 15;

  // Fetch careers and divisions on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [careerRes, divisionRes] = await Promise.all([
          fetch("/api/career/getcareer"),
          fetch("/api/division/getdivisions"),
        ]);

        if (!careerRes.ok || !divisionRes.ok) {
          const errorMessage = careerRes.statusText || divisionRes.statusText;
          throw new Error(errorMessage || "Failed to fetch data.");
        }

        const [careerData, divisionData] = await Promise.all([
          careerRes.json(),
          divisionRes.json(),
        ]);

        setCareers(careerData);
        setDivisions(divisionData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage(error.message || "Error fetching data.");
      }
    };
    fetchData();
  }, []);

  // Handle form submission for adding or editing a career
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => !value)) {
      setMessage("All fields are required!");
      return;
    }

    const url = isEditMode
      ? `/api/career/editcareer?careerId=${editCareerId}`
      : "/api/career/uploadcareer";

    const method = isEditMode ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          divisionId: Number(formData.divisionId),
          totalVacancy: Number(formData.totalVacancy),
          applyBy: new Date(formData.applyBy),
        }),
      });

      if (response.ok) {
        const updatedCareer = await response.json();
        if (isEditMode) {
          setCareers((prevCareers) =>
            prevCareers.map((career) =>
              career.id === editCareerId ? updatedCareer.career : career
            )
          );
          setMessage("Career updated successfully!");
        } else {
          setCareers((prevCareers) => [...prevCareers, updatedCareer.career]);
          setMessage("Career added successfully!");
        }
        resetForm();
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to save career.");
      }
    } catch (error) {
      console.error("Error saving career:", error);
      setMessage("An error occurred while saving the career.");
    }
  };

  // Handle editing a career
  const handleEdit = (career: Career) => {
    setFormData({
      department: career.department,
      divisionId: String(career.divisionId),
      location: career.location,
      jobTitle: career.jobTitle,
      totalVacancy: String(career.totalVacancy),
      jobType: career.jobType,
      gender: career.gender,
      experience: career.experience,
      detail: career.detail,
      applyBy: career.applyBy.split("T")[0], // Format date for input
      status: career.status,
    });
    setEditCareerId(career.id);
    setIsEditMode(true);
    setShowForm(true);
  };

  const handleDelete = async (careerId: string) => {
    try {
      const response = await fetch(`/api/career/uploadcareer?careerId=${careerId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCareers((prevCareers) => prevCareers.filter((c) => c.id !== careerId));
        setMessage("Career deleted successfully.");
        closeDeleteModal();
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to delete the career.");
      }
    } catch (error) {
      console.error("Error deleting career:", error);
      setMessage("An error occurred while deleting the career.");
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setIsEditMode(false);
    setEditCareerId(null);
    setFormData({
      department: "",
      divisionId: "",
      location: "",
      jobTitle: "",
      totalVacancy: "",
      jobType: "",
      gender: "",
      experience: "",
      detail: "",
      applyBy: "",
      status: "",
    });
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCareerToDelete(null);
  };

  const filteredCareers = careers.filter((career) =>
    career.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCareer = currentPage * careersPerPage;
  const indexOfFirstCareer = indexOfLastCareer - careersPerPage;
  const currentCareers = filteredCareers.slice(indexOfFirstCareer, indexOfLastCareer);
  const totalPages = Math.ceil(filteredCareers.length / careersPerPage);

  const getDivisionName = (divisionId: number) => {
    const division = divisions.find((div) => div.id === divisionId);
    return division ? division.name : "Unknown";
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Only show the date (e.g., 12/3/2024)
  };

  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
      
      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Career Management</h2>
        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

        {/* Add Career Button */}
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 mb-6"
          onClick={() => setShowForm(true)}
        >
          {isEditMode ? "Edit Career" : "Add New Career"}
        </button>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by job title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Career Form */}
        {showForm && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={resetForm}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-lg overflow-y-auto max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">
                {isEditMode ? "Edit Career" : "Add a Career"}
              </h3>
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                  {Object.keys(formData).map((key) => (
                    <div
                      className={`${key === "detail" ? "col-span-2" : ""}`}
                      key={key}
                    >
                      <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                        {key.charAt(0).toUpperCase() + key.slice(1)}
                      </label>
                      {key === "divisionId" ? (
                        <select
                          id={key}
                          value={formData[key]}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                          <option value="">Select Division</option>
                          {divisions.map((division) => (
                            <option key={division.id} value={division.id}>
                              {division.name}
                            </option>
                          ))}
                        </select>
                      ) : key === "gender" || key === "status" ? (
                        <select
                          id={key}
                          value={formData[key]}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                        >
                          {key === "gender" ? (
                            <>
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </>
                          ) : (
                            <>
                              <option value="">Select Status</option>
                              <option value="Active">Active</option>
                              <option value="Inactive">Inactive</option>
                            </>
                          )}
                        </select>
                      ) : (
                        <input
                          type={key === "applyBy" ? "date" : "text"}
                          id={key}
                          value={formData[key]}
                          onChange={(e) =>
                            setFormData((prev) => ({ ...prev, [key]: e.target.value }))
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-md"
                          required
                        />
                      )}
                    </div>
                  ))}
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 mt-4 rounded-lg shadow-md hover:bg-green-700"
                >
                  {isEditMode ? "Update" : "Add"}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Career Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Job Title</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Division</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Created At</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Apply By</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCareers.map((career) => (
                <tr key={career.id}>
                  <td className="px-6 py-4 text-sm text-gray-700">{career.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{career.jobTitle}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {getDivisionName(career.divisionId)}
                  </td><td className="px-6 py-4 text-sm text-gray-700">{formatDate(career.createdAt)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatDate(career.applyBy)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{career.status}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <button
                      onClick={() => handleEdit(career)}
                      className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600 mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setCareerToDelete(career.id);
                        setIsDeleteModalOpen(true);
                      }}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
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
        <div className="flex justify-between mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages || 1}
          </span>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages || totalPages === 0}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={closeDeleteModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Confirm Deletion</h3>
              <p className="text-sm text-gray-600 mb-6">
                Are you sure you want to delete this career? This action cannot be undone.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => careerToDelete && handleDelete(careerToDelete)}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
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
};

export default CareerManagement;
