import Navbar from './Navbar';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 mt-10">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
