import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

const PartnerGroup = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  interface Project {
    id: string;
    name: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 15;

  // Fetch projects on component mount
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/partner/partnergroup/getpartnergroup");
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch partner groups.");
        }
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching partner groups:", error);
        setMessage(error.message || "Error fetching partner groups.");
      }
    };
    fetchProjects();
  }, []);

  // Handle form submission for adding a new partner group
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) {
      setMessage("Name is required!");
      return;
    }

    try {
      const response = await fetch("/api/partner/partnergroup/uppartnergroup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (response.ok) {
        const newGroup = await response.json();
        setProjects((prevProjects) => [...prevProjects, newGroup.partnerGroup]);
        setMessage("Partner group added successfully!");
        resetForm();
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to add partner group.");
      }
    } catch (error) {
      console.error("Error adding partner group:", error);
      setMessage("An error occurred while adding the partner group.");
    }
  };

  // Handle deletion of a partner group
  const handleDelete = async (projectId: string) => {
    try {
      const response = await fetch(`/api/partner/partnergroup/uppartnergroup?projectId=${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
        setMessage("Partner group deleted successfully.");
        closeDeleteModal();
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to delete the partner group.");
      }
    } catch (error) {
      console.error("Error deleting partner group:", error);
      setMessage("An error occurred while deleting the partner group.");
    }
  };

  // Utility functions
  const resetForm = () => {
    setShowForm(false);
    setName("");
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  // Pagination and filtering
  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
      
      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Partner Group Management</h2>
        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

        {/* Add Partner Group Button */}
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 mb-6"
          onClick={() => setShowForm(true)}
        >
          Add New Partner Group
        </button>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Add Partner Group Form */}
        {showForm && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={resetForm}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Add a Partner Group</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700"
                >
                  Add
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Partner Group Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 text-sm text-gray-700">{project.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{project.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <button
                      onClick={() => {
                        setProjectToDelete(project.id);
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
                Are you sure you want to delete this partner group? This action cannot be undone.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={() => projectToDelete && handleDelete(projectToDelete)}
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

export default PartnerGroup;
