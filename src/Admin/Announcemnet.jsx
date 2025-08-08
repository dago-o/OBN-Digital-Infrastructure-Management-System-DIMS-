
import AdminLayout from "./Adminlayout";
function Announcement() {
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
                    <li className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
                        <FaLaptop /> Devices
                    </li>
                    <li className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
                        <FaBullhorn /> Announcements
                    </li>
                    <li className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
                        <FaUsers /> Users   
                    </li>
                    <li className="flex items-center gap-2 hover:text-yellow-300 cursor-pointer">
                        <FaFileAlt /> Report
                    </li>
                </ul>
            </nav>
        </aside> */}
        {/* Main Content */}
        <main className="flex-1 p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Announcements</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Create New Announcement</h3>
                <form className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            type="text"
                            placeholder="Enter announcement title"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            placeholder="Enter announcement content"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
                    >
                        Create Announcement
                    </button>
                </form>
            </div>
            <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Existing Announcements</h3>
                <ul className="space-y-4">
                    <li className="bg-white p-4 rounded-lg shadow">
                        <h4 className="text-lg font-bold">Announcement Title</h4>
                        <p className="text-gray-600">This is the content of the announcement.</p>
                        <button className="mt-2 text-blue-600 hover:underline">Edit</button>
                        <button className="mt-2 ml-2 text-red-600 hover:underline">Delete</button>
                    </li>
                    <li className="bg-white p-4 rounded-lg shadow">
                        <h4 className="text-lg font-bold">Another Announcement</h4>
                        <p className="text-gray-600">This is another announcement content.</p>
                        <button className="mt-2 text-blue-600 hover:underline">Edit</button>
                        <button className="mt-2 ml-2 text-red-600 hover:underline">Delete</button>
                    </li>
                </ul>
            </div>
        </main>
    </div>
    </AdminLayout>
  );
}

export default Announcement;