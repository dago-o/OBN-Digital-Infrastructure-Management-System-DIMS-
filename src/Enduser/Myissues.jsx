import React, { useEffect, useState } from 'react';
import Enduserlayout from './Enduserlayout';
import axios from 'axios';

function Myissues() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const user = JSON.parse(userData);
    const userId = user?.user_id;

    if (!userId) {
      setError('Invalid user data.');
      setLoading(false);
      return;
    }

    axios.post('http://localhost/projects_and_practices/projects/OBN_project/my_issues.php', {
      user_id: userId
    })
      .then(response => {
        if (Array.isArray(response.data)) {
          setIssues(response.data);
        } else {
          setError('Unexpected response from server.');
        }
      })
      .catch(error => {
        console.error('Error fetching issues:', error);
        setError('Failed to fetch issues.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleconfirm = (id) => {
    if (window.confirm("Are you sure you want to confirm issue resolved?")) {
      axios.post('http://localhost/projects_and_practices/projects/OBN_project/confirm_close_issue.php', { id })
        .then(() => {
          alert('Issue confirmed as resolved.');
          setIssues(prev => prev.filter(issue => issue.id !== id));
        })
        .catch(err => {
          alert("Failed to confirm");
          console.error(err);
        });
    }
  };

  if (loading) {
    return (
      <Enduserlayout>
        <p>Loading issues...</p>
      </Enduserlayout>
    );
  }

  if (error) {
    return (
      <Enduserlayout>
        <p className="text-red-600">{error}</p>
      </Enduserlayout>
    );
  }

  if (issues.length === 0) {
    return (
      <Enduserlayout>
        <h2 className="text-3xl font-bold text-gray-800 mb-6">My Issues</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">No issues reported yet.</p>
        </div>
      </Enduserlayout>
    );
  }

  return (
    <Enduserlayout>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Issues</h2>
      <div className="bg-white p-6 rounded-lg shadow-md overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className='px-4 py-2 bg-gray-200 border'>
              <th className="px-4 py-2 border">Issue ID</th>
              <th className="px-4 py-2 border">Title</th>
              <th className="px-4 py-2 border">Location</th>
              <th className="px-4 py-2 border">Device ID</th>
              <th className="px-4 py-2 border">Device Name</th>
              <th className="px-4 py-2 border">Reported By</th>
              <th className="px-4 py-2 border">Description</th>
              <th className="px-4 py-2 border">Assigned Engineer ID</th>
              <th className="px-4 py-2 border">Status</th>
              <th className='px-4 py-2 border'>Updated At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.map(issue => (
              <tr key={issue.id} className='hover:bg-gray-300 hover:cursor-pointer'>
                <td className="border px-4 py-2">{issue.id}</td>
                <td className="border px-4 py-2">{issue.issue_title}</td>
                <td className="border px-4 py-2">{issue.location}</td>
                <td className="border px-4 py-2">{issue.device_id}</td>
                <td className="border px-4 py-2">{issue.name}</td>
                <td className="border px-4 py-2">{issue.reported_by}</td>
                <td className="border px-4 py-2">{issue.description}</td>
                <td className="border px-4 py-2">{issue.assigned_engineer_id}</td>
                <td className="border px-4 py-2">{issue.status}</td>
                <td className="border px-4 py-2">{issue.updated_at}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleconfirm(issue.id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-700"
                  >
                    Confirm
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Enduserlayout>
  );
}

export default Myissues;
