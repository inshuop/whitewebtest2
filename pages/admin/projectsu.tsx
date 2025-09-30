import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

function UploadForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [divisionId, setDivisionId] = useState<string>("");
  const [location, setLocation] = useState("");
  const [client, setClient] = useState("");
  const [contractor, setContractor] = useState("");
  const [consultant, setConsultant] = useState("");
  const [scope, setScope] = useState("");
  const [period, setPeriod] = useState("");
  const [isIconicProject, setIsIconicProject] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isOngoing, setIsOngoing] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  interface Project {
    id: string;
    title: string;
    description: string;
    divisionId: string;
    location: string;
    client: string;
    contractor: string;
    consultant: string;
    scope: string;
    period: string;
    isIconicProject: boolean;
    isCompleted: boolean;
    isOngoing: boolean;
    image: string;
    createdAt: string;
  }

  const [projects, setProjects] = useState<Project[]>([]);
  interface Division {
    id: string;
    name: string;
  }

  const [divisions, setDivisions] = useState<Division[]>([]);
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 15;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/project/getproject");
        const data = await response.json();
        setProjects(data);
        const divisionResponse = await fetch("/api/division/getdivisions");
        if (!divisionResponse.ok) throw new Error("Failed to fetch divisions.");
        const divisionData = await divisionResponse.json();
        setDivisions(divisionData);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !divisionId) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    formData.append("client", client);
    formData.append("contractor", contractor);
    formData.append("consultant", consultant);
    formData.append("scope", scope);
    formData.append("period", period);
    formData.append("isIconicProject", isIconicProject.toString());
    formData.append("isCompleted", isCompleted.toString());
    formData.append("isOngoing", isOngoing.toString());
    formData.append("image", image!);
    formData.append("divisionId", divisionId);

    try {
      const response = await fetch("/api/project/uploadproject", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Upload successful!");
        setProjects((prevProjects) => [...prevProjects, data]);
        setShowForm(false);
        // Reset the form fields
        setTitle("");
        setDescription("");
        setDivisionId("");
        setLocation("");
        setClient("");
        setContractor("");
        setConsultant("");
        setScope("");
        setPeriod("");
        setIsIconicProject(false);
        setIsCompleted(false);
        setIsOngoing(false);
        setImage(null);
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("An error occurred while uploading.");
    }
  };

  const handleDelete = async (projectId: string) => {
    try {
      const response = await fetch(`/api/project/uploadproject?projectId=${projectId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProjects((prevProjects) => prevProjects.filter((p) => p.id !== projectId));
        setMessage("Project deleted successfully.");
        setIsDeleteModalOpen(false); // Close the modal after deletion
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
    return date.toLocaleDateString(); // Only show the date (e.g., 12/3/2024)
  };
  

  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
      
      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Project Management</h2>
        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          onClick={() => setShowForm(true)}
        >
          Add New Project
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

        {/* Form Modal */}
        {showForm && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={() => setShowForm(false)}
          >
            <div
              className="bg-white p-8 rounded-lg shadow-lg max-w-4xl overflow-y-auto max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-6">Upload a Project</h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="grid grid-cols-2 gap-6">
                  {/* Title */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                      placeholder="Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
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

                  {/* Location */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                      placeholder="Location"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>

                  {/* Client */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Client</label>
                    <input
                      type="text"
                      className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                      placeholder="Client"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                    />
                  </div>

                  {/* Contractor */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Contractor</label>
                    <input
                      type="text"
                      className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                      placeholder="Contractor"
                      value={contractor}
                      onChange={(e) => setContractor(e.target.value)}
                    />
                  </div>

                  {/* Consultant */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Consultant</label>
                    <input
                      type="text"
                      className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                      placeholder="Consultant"
                      value={consultant}
                      onChange={(e) => setConsultant(e.target.value)}
                    />
                  </div>

                  {/* Scope */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Scope</label>
                    <input
                      type="text"
                      className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                      placeholder="Scope"
                      value={scope}
                      onChange={(e) => setScope(e.target.value)}
                    />
                  </div>

                  {/* Period */}
                  <div>
            <label className="block text-sm font-medium text-gray-700">Period</label>
            <input
              type="date"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md"
              value={period}
              onChange={(e) => setPeriod(e.target.value)}
            />
          </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="flex items-center space-x-4">
                      <div>
                        <input
                          type="checkbox"
                          id="iconic"
                          checked={isIconicProject}
                          onChange={(e) => setIsIconicProject(e.target.checked)}
                        />
                        <label htmlFor="iconic" className="ml-2 text-sm text-gray-700">Iconic</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="completed"
                          checked={isCompleted}
                          onChange={(e) => setIsCompleted(e.target.checked)}
                        />
                        <label htmlFor="completed" className="ml-2 text-sm text-gray-700">Completed</label>
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          id="ongoing"
                          checked={isOngoing}
                          onChange={(e) => setIsOngoing(e.target.checked)}
                        />
                        <label htmlFor="ongoing" className="ml-2 text-sm text-gray-700">Ongoing</label>
                      </div>
                    </div>
                  </div>

                  {/* Image */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Image</label>
                    <input
                      type="file"
                      className="w-full mt-2 p-2 border border-gray-300 rounded-md"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                         
                  </div>
                     {/* Description */}
        <div >
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
                </div>
                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                    onClick={() => setShowForm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects Table */}
        <div className="overflow-hidden bg-white shadow rounded-lg">
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Title</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Client</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Location</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Period</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Created At</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentProjects.map((project) => (
                <tr key={project.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">{project.title}</td>
                  <td className="px-6 py-4">{project.client}</td>
                  <td className="px-6 py-4">{project.location}</td>
                  <td className="px-6 py-4">{project.period}</td>
                 
                  <td className="px-6 py-4">{formatDate(project.createdAt)}</td>
                  <td className="px-6 py-4 space-x-4">
                    <button
                      className="text-blue-500 hover:text-blue-700"
                      onClick={() => handleOpenDeleteModal(project.id)}
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
        <div className="flex justify-between mt-4">
          <button
            onClick={() => setCurrentPage((page) => Math.max(page - 1, 1))}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage((page) => Math.min(page + 1, totalPages))}
            className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md"
          >
            Next
          </button>
        </div>

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Confirm Deletion</h3>
              <p className="mb-4">Are you sure you want to delete this project?</p>
              <div className="flex justify-between">
                <button
                  className="bg-red-600 text-white px-4 py-2 rounded-md"
                  onClick={() => handleDelete(projectToDelete!)}
                >
                  Yes, Delete
                </button>
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                  onClick={handleCloseDeleteModal}
                >
                  Cancel
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

export default UploadForm;
