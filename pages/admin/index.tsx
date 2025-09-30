// pages/admin/index.tsx
import { useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import AdminLayout from '../adminPanel/AdminLayout';
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

const AdminDashboard = () => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      signOut(); // Ensure automatic logout when session expires
    }
  }, [session]);

  if (!session) {
    return <div>Session expired. Logging out...</div>;
  }

  return (
    <AdminLayout>
      <div className="flex min-h-screen bg-gray-100">
        <div className="flex-1 ml-64 p-8">
          <h1>Welcome, {session.name}</h1>
          <h1 className="text-3xl font-semibold text-gray-800">Welcome to Admin Dashboard</h1>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-gray-700">Manage Your Content</h2>
            <p className="text-gray-600 mt-4">Use the sidebar to navigate between Projects and Blogs management.</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

// Fetch session server-side
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getSession(context),
    },
  };
};

export default AdminDashboard;
