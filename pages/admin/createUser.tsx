import React, { useState, useEffect } from "react";
import "../../app/globals.css";
import AdminLayout from '../adminPanel/AdminLayout';

function formatDate(dateString: string) {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('employee');
  const [message, setMessage] = useState("");
  const [showForm, setShowForm] = useState(false);
  interface User {
    id: number;
    name: string;
    email: string;
    createdAt: string;
    role: string;
  }

  const [currentCreateUsers, setCurrentCreateUsers] = useState<User[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);
  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [userRole, setUserRole] = useState<string | null>(null); // To store the current user's role

  useEffect(() => {
    // Fetch the current user's role (assuming you're fetching from an API or session)
    const fetchUserRole = async () => {
      try {
        const response = await fetch('/api/getUserRole'); // API that returns the current user's role
        const data = await response.json();
        if (data.role) {
          setUserRole(data.role);
        } else {
          setMessage('Failed to load user role.');
        }
      } catch {
        setMessage('Error fetching user role.');
      }
    };
    fetchUserRole();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/createUser'); // Assuming this endpoint returns a list of users
      const data = await response.json();
      setCurrentCreateUsers(data.users); // Assuming the response has a "users" array
    } catch {
      setMessage('Error fetching users.');
    }
  };

  useEffect(() => {
    if (userRole && userRole !== 'admin') {
      // Redirect non-admin users or display an error message
      setMessage('For accessing this page, please contact itsupport@whitealuminium.ae');
    }
  }, [userRole]);
  
  useEffect(() => {
    // Fetch the users when the component mounts
    fetchUsers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Reset errors
    setErrors({ name: '', email: '', password: '', confirmPassword: '' });

    // Validation for empty fields
    if (!name || !email || !password || !confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: !name ? 'Name is required.' : '',
        email: !email ? 'Email is required.' : '',
        password: !password ? 'Password is required.' : '',
        confirmPassword: !confirmPassword ? 'Confirm Password is required.' : '',
      }));
      return;
    }

    // Validation for password mismatch
    if (password !== confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match.',
      }));
      return;
    }

    try {
      const response = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('User created successfully!');
        setShowForm(false); // Close the form after successful submission
        // Update the users list with the newly created user
        setCurrentCreateUsers((prevUsers) => [
          ...prevUsers,
          { id: data.id, name: data.name, email: data.email, createdAt: data.createdAt, role: data.role },
        ]);
      } else {
        const error = await response.json();
        setMessage(error.error || 'An error occurred.');
      }
    } catch {
      setMessage('An error occurred.');
    }
  };

  const handleDeleteClick = (id: number) => {
    setUserToDelete(id);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = async () => {
    if (userToDelete === null) return;

    try {
      const response = await fetch(`/api/createUser?id=${userToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('User deleted successfully!');
        setShowDeleteConfirm(false);
        setShowDeleteSuccess(true);
        // Remove deleted user from the list
        setCurrentCreateUsers(currentCreateUsers.filter(user => user.id !== userToDelete));
      } else {
        const error = await response.json();
        setMessage(error.error || 'Failed to delete user.');
        setShowDeleteConfirm(false);
      }
    } catch {
      setMessage('An error occurred.');
      setShowDeleteConfirm(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  if (userRole && userRole !== 'admin') {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Access Denied</h2>
          <p className="text-lg text-gray-600 mb-6">For accessing this page, please contact itsupport@whitealuminium.ae</p>
        </div>
      </div>
    );
  }

  return (
    <AdminLayout>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 ml-64 p-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">User Management</h2>

          {message && <p className="text-sm text-red-500 mb-4">{message}</p>}

          <button
            className="bg-blue-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
            onClick={() => setShowForm(true)}
          >
            Create User
          </button>

          {showForm && (
            <div
              className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
              onClick={() => setShowForm(false)}
            >
              <div
                className="bg-white p-6 rounded-lg shadow-lg w-96 overflow-y-auto max-h-[80vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-2xl font-semibold text-gray-700 mb-4">Add User</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Name:
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.name && <p className="text-sm text-red-500 mt-2">{errors.name}</p>}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email:
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.email && <p className="text-sm text-red-500 mt-2">{errors.email}</p>}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password:
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.password && <p className="text-sm text-red-500 mt-2">{errors.password}</p>}
                  </div>
                  <div className="mb-6">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password:
                    </label>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.confirmPassword && <p className="text-sm text-red-500 mt-2">{errors.confirmPassword}</p>}
                  </div>

                  <div className="mb-6">
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role:
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="admin">Admin</option>
                      <option value="employee">Employee</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="bg-green-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Create
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Created Users</h3>
            {currentCreateUsers.length === 0 ? (
              <p>No users found.</p>
            ) : (
                <table className="min-w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">ID</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Created At</th>
                    
                    <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentCreateUsers.map((user) => (
                    <tr key={user.id} className="border-t">
                      <td className="px-6 py-4 text-sm text-gray-700">{user.id}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{user.role}</td>
                      <td className="px-6 py-4 text-sm text-gray-700">{formatDate(user.createdAt)}</td>
                      
                      <td className="px-6 py-4 text-sm text-gray-700">
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                          onClick={() => handleDeleteClick(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
            )}
          </div>

          {/* Delete Confirmation */}
          {showDeleteConfirm && (
            <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">Confirm Deletion</h3>
                <p className="mb-4">Are you sure you want to delete this user?</p>
                <div className="flex justify-between">
                  <button
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    onClick={handleDeleteConfirm}
                  >
                    Yes
                  </button>
                  <button
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                    onClick={handleDeleteCancel}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Delete Success */}
          {showDeleteSuccess && (
            <div className="fixed inset-0 bg-green-600 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
                <h3 className="text-xl font-semibold text-gray-700 mb-4">User deleted successfully!</h3>
                <button
                  onClick={() => setShowDeleteSuccess(false)}
                  className="bg-green-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-green-700"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}

export default CreateUser;
