import React, { useState, useEffect } from "react";
import Image from "next/image";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

function ProductManagement() {
  const [title, setTitle] = useState("");
  const [pictures, setPictures] = useState<File[]>([]);
  const [divisionId, setDivisionId] = useState<string>("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  interface Product {
    id: string;
    title: string;
    divisionId: number;
    picture: string;
  }

  const [products, setProducts] = useState<Product[]>([]);
  interface Division {
    id: number;
    name: string;
    phone: string;
    email: string;
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
        const productResponse = await fetch("/api/product/getproduct");
        if (!productResponse.ok) throw new Error("Failed to fetch products.");
        const productData = await productResponse.json();
        setProducts(productData);

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

    if (!title || pictures.length === 0 || !divisionId) {
      setMessage("All fields are required!");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("divisionId", divisionId);
    formData.append("phone", phone);
    formData.append("description", description);
    formData.append("email", email);
    pictures.forEach((file) => formData.append("pictures", file));

    try {
      const response = await fetch("/api/product/uploadproduct", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Product added successfully!");
        setProducts((prevItems) => [...prevItems, ...data]);
        setShowForm(false);
        setTitle("");
        setPictures([]);
        setDivisionId("");
        setDescription("");
        setPhone("");
        setEmail("");
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading product:", error);
      setMessage("An error occurred.");
    }
  };

  const handleDelete = async (productId: string) => {
    try {
      const response = await fetch(`/api/product/uploadproduct?productId=${productId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setProducts((prevItems) =>
          prevItems.filter((item) => item.id !== productId)
        );
        setMessage("Product deleted successfully.");
        setIsDeleteModalOpen(false);
      } else {
        setMessage("Failed to delete the product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      setMessage("An error occurred while deleting.");
    }
  };

  const handleDivisionChange = (divisionId: string) => {
    setDivisionId(divisionId);
    const selectedDivision = divisions.find((div) => div.id === parseInt(divisionId, 10));
    if (selectedDivision) {
      setPhone(selectedDivision.phone);
      setEmail(selectedDivision.email);
    } else {
      setPhone("");
      setEmail("");
    }
  };

  const filteredItems = products.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const getDivisionName = (divisionId: number) => {
    const division = divisions.find((div) => div.id === divisionId);
    return division ? division.name : "Unknown";
  };

  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
   

      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Product Management</h2>

        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          onClick={() => setShowForm(true)}
        >
          Add New Product
        </button>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by title"
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
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Add Product</h3>
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-4">
                  <label htmlFor="title" className="block text-gray-700">Title</label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md"
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
                    onChange={(e) => handleDivisionChange(e.target.value)}
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
                  <label htmlFor="phone" className="block text-gray-700">Phone</label>
                  <input
                    type="text"
                    id="phone"
                    value={phone}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700">Email</label>
                  <input
                    type="text"
                    id="email"
                    value={email}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100"
                  />
                </div>

                <div className="mb-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Product Table */}
        <div className="overflow-hidden bg-white shadow-md rounded-lg">
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Division</th>
                <th className="px-4 py-2 text-left">Picture</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
           <tbody>
  {currentItems.map((item) => (
    <tr key={`${item.id}-${item.title}`}>
      <td className="px-4 py-2">{item.id}</td>
      <td className="px-4 py-2">{item.title}</td>
      <td className="px-4 py-2">{getDivisionName(item.divisionId)}</td>
      <td className="px-4 py-2">
        <Image
          src={item.picture}
          alt={item.title}
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
              <p>Are you sure you want to delete this product?</p>
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

export default ProductManagement;
