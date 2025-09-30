import { signIn } from "next-auth/react";
import { useState } from "react";
import '../../app/globals.css';
import { useRouter } from 'next/router';

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await signIn("credentials", { email, password, redirect: false });

    if (result?.error) {
      setMessage("Invalid credentials. Please try again.");
      setIsModalOpen(true);
    } else {
      router.push("/admin");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg relative">
        {/* Company Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/images/logo/newlogo.png"
            alt="Company Logo"
            className="w-16 h-16 object-contain"
          />
        </div>

        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-4">
          Welcome to Admin Panel
        </h1>
        <p className="text-sm text-gray-600 text-center mb-6">
          Please login to continue
        </p>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium px-6 py-2 rounded-lg shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Login
          </button>
        </form>

        {/* Smooth Modal Popup */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-xs text-center animate-fade-in">
              <h3 className="text-lg font-medium text-red-600 mb-4">Error</h3>
              <p className="text-gray-700 mb-6">{message}</p>
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                OK
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
