import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

const EmailManagement = () => {
  const [email, setEmail] = useState("");
  const [divisionId, setDivisionId] = useState<number | null>(null);
  const [emailTo, setEmailTo] = useState(false);
  const [message, setMessage] = useState("");
  
  interface Email {
    id: string;
    email: string;
    divisionId: number;
  }

  const [emails, setEmails] = useState<Email[]>([]);
  interface Division {
    id: number;
    name: string;
  }

  const [divisions, setDivisions] = useState<Division[]>([]);

  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const emailsPerPage = 15;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [emailToDelete, setEmailToDelete] = useState<string | null>(null);

  // Fetch emails and divisions
  const fetchEmails = async () => {
    try {
      const response = await fetch("/api/email/getemail");
      if (!response.ok) throw new Error("Failed to fetch emails.");
      const data = await response.json();
      setEmails(data);
    } catch (error) {
      console.error("Error fetching emails:", error);
      setMessage("Error fetching emails.");
    }
  };

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

  useEffect(() => {
    fetchEmails();
    fetchDivisions();
  }, []);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !divisionId) {
      setMessage("Email and division are required.");
      return;
    }

    try {
      const response = await fetch("/api/email/uploademail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, divisionId, emailTo }),
      });

      if (response.ok) {
        setMessage("Email added successfully.");
        resetForm();
        await fetchEmails(); // Refresh emails
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to add email.");
      }
    } catch (error) {
      console.error("Error adding email:", error);
      setMessage("An error occurred while adding the email.");
    }
  };

  // Handle deletion
  const handleDelete = async (emailId: string) => {
    try {
      const response = await fetch(`/api/email/uploademail?ccEmailId=${emailId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMessage("Email deleted successfully.");
        setEmails((prev) => prev.filter((email) => email.id !== emailId));
        closeDeleteModal();
      } else {
        const errorData = await response.json();
        setMessage(errorData.error || "Failed to delete email.");
      }
    } catch (error) {
      console.error("Error deleting email:", error);
      setMessage("An error occurred while deleting the email.");
    }
  };

  const resetForm = () => {
    setShowForm(false);
    setEmail("");
    setDivisionId(null);
    setEmailTo(false);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEmailToDelete(null);
  };
  const handleCheckboxChange = () => {
    setEmailTo((prev) => !prev);  // Toggle between true and false
  };

  // Pagination and filtering logic
  const filteredEmails = emails.filter((email) =>
    email.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEmail = currentPage * emailsPerPage;
  const indexOfFirstEmail = indexOfLastEmail - emailsPerPage;
  const currentEmails = filteredEmails.slice(indexOfFirstEmail, indexOfLastEmail);
  const totalPages = Math.ceil(filteredEmails.length / emailsPerPage);

  const getDivisionName = (divisionId: number) => {
    const division = divisions.find((div) => div.id === divisionId);
    return division ? division.name : "Unknown";
  };

  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
    
      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Email Management</h2>
        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

        {/* Add Email Button */}
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 mb-6"
          onClick={() => setShowForm(true)}
        >
          Add New Email
        </button>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Add Email Form */}
        {showForm && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={resetForm}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Add a New Email</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="divisionId" className="block text-sm font-medium text-gray-700">
                    Division
                  </label>
                  <select
                    id="divisionId"
                    value={divisionId ?? ""}
                    onChange={(e) => setDivisionId(Number(e.target.value))}
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

                {/* Checkbox for emailTo */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">Email Options</label>
                  <div className="space-x-4 mt-2">
                    <input
                      type="checkbox"
                      id="emailto"
                      checked={emailTo}
                      onChange={handleCheckboxChange}
                      className="form-checkbox"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700"
                >
                  Add Email
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Email Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full table-auto">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">ID</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Division</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmails.map((email) => (
                <tr key={email.id}>
                  <td className="px-6 py-4 text-sm text-gray-700">{email.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{email.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {getDivisionName(email.divisionId)}
                  </td>
                  
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <button
                      onClick={() => {
                        setEmailToDelete(email.id);
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
            disabled={currentPage === totalPages}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 disabled:opacity-50"
          >
            Next
          </button>
        </div>

        {/* Delete Email Modal */}
        {isDeleteModalOpen && emailToDelete && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={closeDeleteModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Are you sure you want to delete this email?
              </h3>
              <div className="flex justify-between">
                <button
                  onClick={() => handleDelete(emailToDelete)}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                >
                  Yes
                </button>
                <button
                  onClick={closeDeleteModal}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                  No
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

export default EmailManagement;
