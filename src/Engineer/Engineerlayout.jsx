import { FaHome, FaTools, FaFileUpload, FaBell, FaFacebookMessenger } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Engineerlayout({ children }) {
  const navigate = useNavigate();
    return (
         <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Network Engineer</h1>
        <nav>
          <ul className="space-y-4">
            <li onClick={() => navigate('/engineer/dashboard')}
            className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaHome /> Home
            </li>
            <li onClick={() => navigate('/engineer/devices')}
            className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaTools /> Available Devices
            </li>
            
             <li onClick={() => navigate('/engineer/announcement')}
            className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaFacebookMessenger /> Announcements
            </li>
            <li onClick={() => navigate('/engineer/notification')}
            className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
              <FaBell /> Notifications
            </li>
          </ul>
        </nav>
      </aside>
        {/* Main Content */}
        <main className="flex-1 p-6">
            {children}
        </main>
      </div>
        

    );

}

export default Engineerlayout;