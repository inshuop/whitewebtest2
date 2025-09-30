import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

function TeamManagement() {
  const [name, setName] = useState("");
  const [designation, setDesignation] = useState("");
  const [experience, setExperience] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [divisionId, setDivisionId] = useState<string>(""); // Set to string to handle select values
  const [message, setMessage] = useState("");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [divisions, setDivisions] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [teamMemberToDelete, setTeamMemberToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const teamMembersPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teamResponse = await fetch("/api/team/getteams");
        if (!teamResponse.ok) throw new Error("Failed to fetch team members.");
        const teamData = await teamResponse.json();
        setTeamMembers(teamData);

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

    if (!name || !designation || !experience || !image || !divisionId) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("designation", designation);
    formData.append("experience", experience);
    formData.append("image", image);
    formData.append("divisionId", divisionId); // divisionId remains a string for the form

    try {
      const response = await fetch("/api/team/uploadteam", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Upload successful!");
        setTeamMembers((prevMembers) => [...prevMembers, data]);
        setShowForm(false);
        setName("");
        setDesignation("");
        setExperience("");
        setImage(null);
        setDivisionId(""); // Reset division
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading team member:", error);
      setMessage("An error occurred.");
    }
  };

  const handleDelete = async (teamMemberId: string) => {
    try {
      const response = await fetch(`/api/team/uploadteam?teamId=${teamMemberId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setTeamMembers((prevMembers) => prevMembers.filter((member) => member.id !== teamMemberId));
        setMessage("Team member deleted successfully.");
        setIsDeleteModalOpen(false);
      } else {
        setMessage("Failed to delete the team member.");
      }
    } catch (error) {
      console.error("Error deleting team member:", error);
      setMessage("An error occurred while deleting.");
    }
  };

  const handleOpenDeleteModal = (teamMemberId: string) => {
    setTeamMemberToDelete(teamMemberId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setTeamMemberToDelete(null);
  };

  const filteredTeamMembers = teamMembers.filter((member) =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastMember = currentPage * teamMembersPerPage;
  const indexOfFirstMember = indexOfLastMember - teamMembersPerPage;
  const currentTeamMembers = filteredTeamMembers.slice(indexOfFirstMember, indexOfLastMember);
  const totalPages = Math.ceil(filteredTeamMembers.length / teamMembersPerPage);

  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
     

      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Team Member Management</h2>

        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          onClick={() => setShowForm(true)}
        >
          Add New Team Member
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
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Upload a Team Member</h3>
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
                  <label htmlFor="designation" className="block text-gray-700">Designation</label>
                  <input
                    type="text"
                    id="designation"
                    value={designation}
                    onChange={(e) => setDesignation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="experience" className="block text-gray-700">Experience</label>
                  <input
                    type="text"
                    id="experience"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="image" className="block text-gray-700">Image</label>
                  <input
                    type="file"
                    id="image"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
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

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:ring-2 focus:ring-green-500"
                  >
                    Upload
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Team Member List Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Designation</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Experience</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Division</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTeamMembers.map((member) => (
                <tr key={member.id}>
                  <td className="px-6 py-4 text-sm text-gray-700">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{member.designation}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{member.experience}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
  {divisions.find((division) => division.id === member.divisionId)?.name || 'Unknown Division'}
</td>
                  <td className="px-6 py-4 text-left text-sm font-medium text-gray-700">
                    <button
                      onClick={() => handleOpenDeleteModal(member.id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md"
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
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300"
          >
            Prev
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            className="px-4 py-2 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300"
          >
            Next
          </button>
        </div>

        {/* Delete Modal */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div
              className="bg-white p-6 rounded-lg shadow-md max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Delete Team Member</h3>
              <p className="text-sm text-gray-700 mb-4">Are you sure you want to delete this team member?</p>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDelete(teamMemberToDelete!)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:ring-2 focus:ring-red-500"
                >
                  Yes, Delete
                </button>
                <button
                  onClick={handleCloseDeleteModal}
                  className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 focus:ring-2 focus:ring-gray-500"
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

export default TeamManagement;
