
import React, { useState, useEffect } from "react";
import "../../app/globals.css";

import AdminLayout from '../adminPanel/AdminLayout';

function Article() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  interface Article {
    id: string;
    title: string;
    description: string;
    createdAt: string;
    updatedAt: string;
  }

  const [articles, setArticles] = useState<Article[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 15;

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await fetch("/api/article/getarticle");
        if (!response.ok) throw new Error("Failed to fetch articles.");
        const data = await response.json();
        setArticles(data);
      } catch (error) {
        console.error("Error fetching articles:", error);
        setMessage("Error fetching articles.");
      }
    };
    fetchArticles();
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
      const response = await fetch("/api/article/uploadarticle", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setMessage("Upload successful!");
        setArticles((prevArticles) => [...prevArticles, data]);
        setShowForm(false);
        setTitle("");
        setDescription("");
        setImage(null);
      } else {
        setMessage("Upload failed.");
      }
    } catch (error) {
      console.error("Error uploading article:", error);
      setMessage("An error occurred.");
    }
  };

  const handleDelete = async (articleId: string) => {
    try {
      const response = await fetch(`/api/article/uploadarticle?articleId=${articleId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setArticles((prevArticles) => prevArticles.filter((a) => a.id !== articleId));
        setMessage("Article deleted successfully.");
        setIsDeleteModalOpen(false);
      } else {
        setMessage("Failed to delete the article.");
      }
    } catch (error) {
      console.error("Error deleting article:", error);
      setMessage("An error occurred while deleting.");
    }
  };

  const handleOpenDeleteModal = (articleId: string) => {
    setArticleToDelete(articleId);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setArticleToDelete(null);
  };

  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);
  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  return (
    
<AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
     

      <div className="flex-1 ml-64 p-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Article Management</h2>

        {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          onClick={() => setShowForm(true)}
        >
          Add New Article
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
              <h3 className="text-2xl font-semibold text-gray-700 mb-4">Upload an Article</h3>
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
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Description</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Created At</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Updated At</th>
                <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentArticles.map((article) => (
                <tr key={article.id}>
                  <td className="px-6 py-4 text-sm text-gray-700">{article.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{article.title}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{article.description}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(article.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {formatDate(article.updatedAt)}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    <button
                      onClick={() => handleOpenDeleteModal(article.id)}
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
                Are you sure you want to delete this article? This action cannot be undone.
              </p>
              <div className="flex justify-between">
                <button
                  onClick={handleCloseDeleteModal}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 focus:outline-none"
                >
                  Cancel
                </button>
                <button
                  onClick={() => articleToDelete && handleDelete(articleToDelete)}
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




export default Article;
