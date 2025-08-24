import React, { useEffect, useState } from 'react';
import Engineerlayout from './Engineerlayout';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Notification() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const engineerId = user?.user_id;

    if (!engineerId) {
      console.error("Engineer not logged in.");
      return;
    }

    axios.post('http://localhost/projects_and_practices/projects/OBN_project/notification.php')
      .then(response => {
        setNotifications(response.data);
      })
      .catch(error => {
        console.error('Error fetching notifications:', error);
      });
  }, []);

  const toggleExpand = (id) => {
    setExpandedId(prev => (prev === id ? null : id));
  };

  const handletakeaction = (id) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const engineerId = user?.user_id;

    if (!engineerId) {
      alert("Engineer not logged in");
      return;
    }

    if (window.confirm("Are you sure you want to take action on this issue?")) {
      axios.post('http://localhost/projects_and_practices/projects/OBN_project/take_action.php', {
        id,
        assigned_engineer_id: engineerId
      })
        .then(() => {
          setNotifications(prev => prev.filter(item => item.id !== id));
          alert('Action taken on issue.');
        })
        .catch(err => {
          alert("Failed to take action on issue");
          console.error(err);
        });
    }
  };

  const handleconfirmresolved = (id) => {

    
    if (window.confirm("Are you sure you want to confirm this issue as resolved?")) {
      axios.post('http://localhost/projects_and_practices/projects/OBN_project/confirm_resolved.php', { id })
        .then(() => {
          setNotifications(prev => prev.filter(item => item.id !== id));
          alert('Issue confirmed as resolved.');
        })
        .catch(err => {
          alert("Failed to confirm issue as resolved");
          console.error(err);
        });
    }
  };

  return (
    <Engineerlayout>
      <div className="min-h-screen bg-white text-blue-700 shadow-2xl flex flex-col">
        <header className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">Notifications</h1>
        </header>

        <main className="flex-1 p-8">
          <h2 className="text-2xl font-semibold mb-4">Notification Center</h2>
          <p className="text-gray-700 mb-6">Click on a notification to view more details.</p>

          {notifications.length > 0 ? (
            <ul className="space-y-4">
              {notifications.map(notification => (
                <li
                  key={notification.id}
                  className="bg-white p-4 rounded-lg shadow cursor-pointer hover:bg-gray-100 transition"
                  onClick={() => toggleExpand(notification.id)}
                >
                  <div>
                    <h3 className="text-lg font-bold">{notification.issue_title}</h3>
                    <p className="text-gray-700">{notification.description}</p>
                    <p className="text-gray-700">Status: {notification.status}</p>
                    <p className="text-xs text-gray-400">{new Date(notification.created_at).toLocaleString()}</p>
                  </div>

                  {expandedId === notification.id && (
                    <div className="mt-4 bg-blue-50 p-4 rounded border border-blue-200">
                      <table className="min-w-full text-sm">
                        <thead>
                          <tr className="bg-gray-200 text-gray-700">
                            <th className="px-4 py-2 border">ID</th>
                            <th className="px-4 py-2 border">Location</th>
                            <th className="px-4 py-2 border">Device ID</th>
                            <th className="px-4 py-2 border">Device Name</th>
                            <th className="px-4 py-2 border">Reported By</th>
                            <th className="px-4 py-2 border">Engineer ID</th>
                            <th className="px-4 py-2 border">Updated At</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td className="border px-4 py-2">{notification.id}</td>
                            <td className="border px-4 py-2">{notification.location}</td>
                            <td className="border px-4 py-2">{notification.device_id}</td>
                            <td className="border px-4 py-2">{notification.name}</td>
                            <td className="border px-4 py-2">{notification.reported_by}</td>
                            <td className="border px-4 py-2">{notification.assigned_engineer_id || 'Unassigned'}</td>
                            <td className="border px-4 py-2">{notification.updated_at}</td>
                          </tr>
                        </tbody>
                      </table>

                      <div className="mt-4 flex gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handletakeaction(notification.id);
                          }}
                          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
                        >
                          Take Action
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleconfirmresolved(notification.id);
                          }}
                          className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                        >
                          Make Resolved
                        </button>

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate('/engineer/uploadreport', {
                              state: notification
                            });
                          }}
                          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 cursor-pointer"
                        >
                          Report
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No notifications available.</p>
          )}
        </main>
      </div>
    </Engineerlayout>
  );
}

export default Notification;
