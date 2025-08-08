import AdminLayout from "./Adminlayout";
function Report() {
  return (
    <AdminLayout>
    <div className="min-h-screen bg-white text-blue-700 shadow-2xl flex flex-col"> 
        {/* Header */}
        <header className="bg-blue-600 text-white p-6">

            <h1 className="text-3xl font-bold">Report Page</h1>
        </header>
        {/* Main Content */}
        <main className="flex-1 p-8">
            <h2 className="text-2xl font-semibold mb-4">Generate Reports</h2>
            <p className="text-gray-700 mb-6">
                Use this section to generate and view reports related to the inventory management system.
            </p>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Report Options</h3>
                <ul className="list-disc pl-6 space-y-2">
                    <li>Device Inventory Report</li>        
                    <li>User Activity Report</li>
                    <li>System Performance Report</li>
                    <li>Custom Report Generation</li>
                </ul>
            </div>
        </main>
    </div>
    </AdminLayout>
  );
}

export default Report;