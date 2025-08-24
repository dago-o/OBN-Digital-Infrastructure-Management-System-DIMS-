import { FaHome, FaLaptop, FaBullhorn, FaUsers, FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function AdminLayout({ children }) {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav>
          <ul className="space-y-4">
            <li onClick={() => navigate('/admin/dashboard')} className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaHome /> Home
            </li>
            <li onClick={() => navigate('/admin/devices')} className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaLaptop /> Devices
            </li>
            <li onClick={() => navigate('/admin/announcement')} className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaBullhorn /> Announcements
            </li>
            <li onClick={() => navigate('/admin/users')} className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaUsers /> Users
            </li>
            <li onClick={() => navigate('/admin/admindashboard')} className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaFileAlt /> Dashboard
            </li>

          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

export default AdminLayout;
