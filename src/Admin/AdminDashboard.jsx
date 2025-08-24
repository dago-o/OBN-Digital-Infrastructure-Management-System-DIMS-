// AdminDashboard.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import AdminLayout from './Adminlayout'; // assume you have this like others

const COLORS = ['#1E3A8A','#2563EB','#60A5FA','#93C5FD','#E5E7EB'];

function AdminDashboard() {
  const [counts, setCounts] = useState(null);
  const [recent, setRecent] = useState([]);

  const [engineerreports, setEngineerReports] = useState([]);


  useEffect(() => {
    axios.get('http://localhost/projects_and_practices/projects/OBN_project/get_dashboard_counts.php')
      .then(res => setCounts(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost/projects_and_practices/projects/OBN_project/get_recent_issues.php')
      .then(res => setRecent(res.data))
      .catch(err => console.error(err));

    axios.get('http://localhost/projects_and_practices/projects/OBN_project/get_report_by_engineer.php')
      .then(res => setEngineerReports(res.data))
      .catch(err => console.error(err));
  }, []);

  if (!counts) {
    return <AdminLayout><div className="p-6">Loading dashboard...</div></AdminLayout>;
  }

  // prepare pie data
  const pieData = Object.entries(counts.issues_by_status || {}).map(([key, value]) => ({ name: key, value }));

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 hover:cursor-pointer">
          <div className="bg-white p-4 rounded shadow hover:shadow-2xl">
            <div className="text-sm text-gray-500">Total Devices</div>
            <div className="text-2xl font-semibold text-blue-700">{counts.total_devices}</div>
          </div>
          <div className="bg-white p-4 rounded shadow hover:shadow-2xl">
            <div className="text-sm text-gray-500">Total Users (admin)</div>
            <div className="text-2xl font-semibold text-blue-700">{counts.users.admin || 0}</div>
          </div>
           <div className="bg-white p-4 rounded shadow hover:shadow-2xl">
            <div className="text-sm text-gray-500">Total Users (engineer)</div>
            <div className="text-2xl font-semibold text-blue-700">{counts.users.network_engineer || 0}</div>
          </div>
           <div className="bg-white p-4 rounded shadow hover:shadow-2xl">
            <div className="text-sm text-gray-500">Total Users (end user)</div>
            <div className="text-2xl font-semibold text-blue-700">{counts.users.end_user || 0}</div>
          </div>
          <div className="bg-white p-4 rounded shadow hover:shadow-2xl">
            <div className="text-sm text-gray-500">Total Issues</div>
            <div className="text-2xl font-semibold text-blue-700">{counts.total_issues}</div>
          </div>
          <div className="bg-white p-4 rounded shadow hover:shadow-2xl">
            <div className="text-sm text-gray-500">Reports Submitted</div>
            <div className="text-2xl font-semibold text-blue-700">{counts.total_reports}</div>
          </div>
           <div className="bg-white p-4 rounded shadow hover:shadow-2xl">
            
            <div className="text-sm text-gray-500">Resolution Rate</div>

            <div
  className={`text-2xl font-semibold ${
    counts.resolution_rate >= 80
      ? 'text-green-600'
      : counts.resolution_rate >= 50
      ? 'text-yellow-600'
      : 'text-red-600'
  }`}
>
  {counts.resolution_rate}%
</div>


          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="col-span-2 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Issues reported  by End Users</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100 ">
                  <th className="p-2 text-left">ID</th>
                  <th className="p-2 text-left">Title</th>
                  <th className="p-2 text-left">Status</th>
                  <th className="p-2 text-left">Created</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(r => (
                  <tr key={r.id} className="border-t hover:bg-gray-300 hover:cursor-pointer">
                    <td className="p-2">{r.id}</td>
                    <td className="p-2">{r.issue_title}</td>
                    <td className="p-2 capitalize">{r.status}</td>
                    <td className="p-2">{new Date(r.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded shadow hover:cursor-pointer">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Issues by Status</h3>
            <div style={{ width: '100%', height: 240 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} label>
                    {pieData.map((entry, idx) => <Cell key={`c-${idx}`} fill={COLORS[idx % COLORS.length]} />)}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="col-span-2 bg-white p-4 rounded shadow">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Reports by Engineers</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-2 text-left border">ID</th> 
                  <th className="p-2 text-left border">Issue ID</th>
                  <th className="p-2 text-left border">Location</th>
                  <th className="p-2 text-left border">Device ID</th>
                  <th className="p-2 text-left border">Device Name</th>
                  <th className="p-2 text-left border">Reporter</th>
                  <th className="p-2 text-left border">Engineer ID</th>
                  <th className="p-2 text-left border">File</th>
                  <th className="p-2 text-left border">Created</th>
                   <th className="p-2 text-left border">Avg. Resolution Time (hrs)</th>
                

                </tr>
              </thead>
              <tbody>
                {engineerreports.map(report => (
                  <tr key={report.id} className="border-t hover:bg-gray-300 hover:cursor-pointer">
                    <td className="p-2 border">{report.id}</td>
                    <td className="p-2 border">{report.issue_id}</td>
                    <td className="p-2 border">{report.location}</td>
                    <td className="p-2 border">{report.device_id}</td>
                    <td className="p-2 border">{report.device_name}</td>
                    <td className="p-2 border">{report.reported_by}</td>
                    <td className="p-2 border">{report.engineer_id}</td>
                    <td className="p-2 border">{report.file ? <a href={`http://localhost/projects_and_practices/projects/OBN_project/${report.file}`} target="_blank" rel="noopener noreferrer">View File</a> : 'N/A'}</td>
                    <td className="p-2 border">{new Date(report.created_at).toLocaleString()}</td>
                    <td className="p-2 border">{report.resolution_time}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>


         {/* Info Section */}
        <section className="bg-white p-6 rounded-lg shadow-md">
          <h4 className="text-2xl font-bold text-gray-800 mb-4">Dashboard Overview</h4>
          <p className="text-gray-700 mb-2">
            This dashboard allows admins to manage the entire digital infrustructure system. You can:
          </p>
  <ul className="list-disc pl-6 text-gray-700 space-y-1">
<li>Manage and monitor device inventory.</li>
<li>Manage users and control their tasks.</li>
<li>Post announcements and alerts.</li>
<li>View and analyze system performance metrics.</li>
<li>Track device issues and resolutions.</li>
<li>Oversee resulution time for each report</li>
<li>Take action based on Resolution rate </li>



            
          </ul>
        </section>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;