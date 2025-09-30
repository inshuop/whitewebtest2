import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

function PartnerManagement() {
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [divisionId, setDivisionId] = useState<string>(""); // Set to string to handle select values
  const [partnerGroupId, setPartnerGroupId] = useState<string>(""); // Set to string to handle select values
  const [message, setMessage] = useState("");
  interface Partner {
    id: string;
    name: string;
    url: string;
    divisionId: number;
  }

  const [partners, setPartners] = useState<Partner[]>([]);
  interface Division {
    id: number;
    name: string;
  }

  const [divisions, setDivisions] = useState<Division[]>([]);
  interface PartnerGroup {
    id: string;
    name: string;
  }

  const [partnerGroups, setPartnerGroups] = useState<PartnerGroup[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const partnersPerPage = 15;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const partnerResponse = await fetch("/api/partner/getpartners");
        if (!partnerResponse.ok) throw new Error("Failed to fetch partners.");
        const partnerData = await partnerResponse.json();
        setPartners(partnerData);

        const divisionResponse = await fetch("/api/division/getdivisions");
        if (!divisionResponse.ok) throw new Error("Failed to fetch divisions.");
        const divisionData = await divisionResponse.json();
        setDivisions(divisionData);

        const partnerGroupResponse = await fetch("/api/partner/partnergroup/getpartnergroup");
        if (!partnerGroupResponse.ok) throw new Error("Failed to fetch partner groups.");
        const partnerGroupData = await partnerGroupResponse.json();
        setPartnerGroups(partnerGroupData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage("Error fetching data.");
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !url || !image || !divisionId || !partnerGroupId) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("url", url);
    formData.append("image", image);
    formData.append("divisionId", divisionId);
    formData.append("partnerGroupId", partnerGroupId);

    try {
      const response = await fetch("/api/partner/uploadpartners", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Partner added successfully!");
        setPartners((prevPartners) => [...prevPartners, data]);
        setShowForm(false);
        setName("");
        setUrl("");
        setImage(null);
        setDivisionId(""); 
        setPartnerGroupId(""); 
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading partner:", error);
      setMessage("An error occurred.");
    }
  };

  const handleDelete = async (partnerId: string) => {
    try {
      const response = await fetch(`/api/partner/uploadpartners?partnerId=${partnerId}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        setPartners((prevPartners) => prevPartners.filter((partner) => partner.id !== partnerId));
        setMessage("Partner deleted successfully.");
        setIsDeleteModalOpen(false);
      } else {
        setMessage("Failed to delete the partner.");
      }
    } catch (error) {
      console.error("Error deleting partner:", error);
      setMessage("An error occurred while deleting.");
    }
  };

  const handleOpenDeleteModal = (partnerId: string) => {
    setPartnerToDelete(partnerId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setPartnerToDelete(null);
  };

  const filteredPartners = partners.filter((partner) =>
    partner.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastPartner = currentPage * partnersPerPage;
  const indexOfFirstPartner = indexOfLastPartner - partnersPerPage;
  const currentPartners = filteredPartners.slice(indexOfFirstPartner, indexOfLastPartner);
  const totalPages = Math.ceil(filteredPartners.length / partnersPerPage);

  const getDivisionName = (divisionId: number) => {
    const division = divisions.find((div) => div.id === divisionId);
    return division ? division.name : "Unknown";
  };

  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
  

      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Partner Management</h2>

        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          onClick={() => setShowForm(true)}
        >
          Add New Partner
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
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Upload a Partner</h3>
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
                  <label htmlFor="url" className="block text-gray-700">URL</label>
                  <input
                    type="text"
                    id="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
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

                <div className="mb-4">
                  <label htmlFor="partnerGroupId" className="block text-gray-700">Partner Group</label>
                  <select
                    id="partnerGroupId"
                    value={partnerGroupId}
                    onChange={(e) => setPartnerGroupId(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select Partner Group</option>
                    {partnerGroups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Upload Partner
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isDeleteModalOpen && partnerToDelete && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
            onClick={handleCloseDeleteModal}
          >
            <div
              className="bg-white p-6 rounded-lg shadow-lg max-w-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold text-gray-700">Delete Partner</h3>
              <p className="mt-4">Are you sure you want to delete this partner?</p>
              <div className="mt-6 flex justify-end space-x-4">
                <button
                  className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700"
                  onClick={() => partnerToDelete && handleDelete(partnerToDelete)}
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
                <th className="px-4 py-2 text-left">URL</th>
                <th className="px-4 py-2 text-left">Division</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPartners.map((partner) => (
                <tr key={partner.id} className="border-t">
                  <td className=" border px-4 py-2">{partner.id}</td>
                  <td className="border px-4 py-2">{partner.name}</td>
                  <td className="border px-4 py-2">{partner.url}</td>
                  <td className="border px-4 py-2">
                    {getDivisionName(partner.divisionId)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleOpenDeleteModal(partner.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex justify-between">
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Previous
          </button>
          <div className="flex items-center">
            Page {currentPage} of {totalPages}
          </div>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-400"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
    </AdminLayout>
  );
}

export default PartnerManagement;
