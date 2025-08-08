
import { FaHome, FaLaptop, FaBullhorn, FaUsers, FaFileAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import AdminLayout from './Adminlayout';

function Dashboard() {
  const navigate = useNavigate();
  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      {/* <aside className="w-64 bg-blue-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Admin Panel</h1>
        <nav>
          <ul className="space-y-4">
            <li className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaHome /> Home
            </li>
            <li onClick={() => navigate('/admin/devices')}
            className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaLaptop /> Devices
            </li>
            <li onClick={() => navigate('/admin/announcement')}
            className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaBullhorn /> Announcements
            </li>
            <li 
            onClick={() => navigate('/admin/users')}
            className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaUsers /> Users
            </li>

            <li onClick={() => navigate('/admin/report')}
            className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaFileAlt/> Report
            </li>
            
          </ul>
        </nav>
      </aside> */}

      {/* Main Content */}
      <main className="flex-1 p-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin 👋</h2>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Total Devices</h3>
            <p className="text-gray-700">Track and manage all registered devices efficiently.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">User Management</h3>
            <p className="text-gray-700">Add, update, or remove users from the system.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-xl transition">
            <h3 className="text-xl font-semibold text-blue-600 mb-2">Latest Announcements</h3>
            <p className="text-gray-700">Post and manage announcements related to the inventory.</p>
          </div>
        </div>

        {/* Info Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h4>
          <p className="text-gray-700 mb-2">
            This dashboard allows admins to manage the entire digital inventory system. You can:
          </p>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Manage and monitor device inventory.</li>
            <li>Control user access and roles.</li>
            <li>Post announcements and alerts.</li>
            <li>View images and reports related to devices and users.</li>
            <li>Generate activity logs and backup data.</li>
          </ul>
        </section>
      </main>
    </div>
    </AdminLayout>
  );
}

export default Dashboard;
