import { FaHome, FaBullhorn } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Enduserlayout({ children }) {
  const navigate = useNavigate();
    return (
            <div className="flex min-h-screen bg-gray-100">
        {/* Sidebar */}
        <aside className="w-64 bg-blue-800 text-white p-6">
            <h1 className="text-2xl font-bold mb-8">End User Panel</h1>
            <nav>
                <ul className="space-y-4">
                    <li onClick={() => navigate('/enduser/dashboard')}
                        className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
                        <FaHome /> Home
                    </li>
                    <li onClick={() => navigate('/enduser/issuereport')}
                        className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
                        <FaBullhorn /> Report Issue
                    </li>

                    <li onClick={() => navigate('/enduser/myissues')}
                        className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
                        <FaBullhorn /> My Issues
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
export default Enduserlayout;
