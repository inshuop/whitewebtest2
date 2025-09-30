import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

function Blog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  interface Project {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 15;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/blog/getblogs");
        if (!response.ok) throw new Error("Failed to fetch projects.");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setMessage("Error fetching projects.");
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !image) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);

    try {
      const response = await fetch("/api/blog/uploadblog", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Upload successful!");
        setProjects((prevProjects) => [...prevProjects, data]);
        setShowForm(false);
        setTitle("");
        setDescription("");
        setImage(null);
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error occurred.");
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      const response = await fetch(`/api/blog/uploadblog?projectId=${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
        setMessage("Project deleted successfully.");
        setIsDeleteModalOpen(false);
      } else {
        setMessage("Failed to delete the project.");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
      setMessage("An error occurred while deleting.");
    }
  };

  const handleOpenDeleteModal = (projectId: string) => {
    setProjectToDelete(projectId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setProjectToDelete(null);
  };

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (<AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
      

      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Blog Management</h2>

        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          onClick={() => setShowForm(true)}
        >
          Add New Blog
        </button>

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title..."
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
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Upload a Blog</h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-6">
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                    Title:
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                    Image:
                  </label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="mt-1 block w-full text-gray-700"
                    required
                  />
                 
                </div>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Upload
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
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Title</th>
                {/* <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Description</th> */}
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Created At</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Updated At</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project.id}>
                  <td className="px-6 py-4 text-sm text-gray-700">{project.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{project.title}</td>
                  {/* <td className="px-6 py-4 text-sm text-gray-700">{project.description}</td> */}
                  <td className="px-6 py-4 text-sm text-gray-700">{formatDate(project.createdAt)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{formatDate(project.updatedAt)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <button
                      onClick={() => handleOpenDeleteModal(project.id)}
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
                Are you sure you want to delete this blog? This action cannot be undone.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={handleCloseDeleteModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => projectToDelete && handleDelete(projectToDelete)}
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

export default Blog;
