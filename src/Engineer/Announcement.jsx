import React, { useEffect, useState } from 'react';
import Engineerlayout from './Engineerlayout';
import axios from 'axios';

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost/projects_and_practices/projects/OBN_project/get_announcement.php')
      .then(response => {
        setAnnouncements(response.data);
      })
      .catch(error => {
        console.error('Error fetching announcements:', error);
      });
  }, []);

  return (
    <Engineerlayout>
      <div className="px-6 py-8">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">📢 Announcements</h2>

        {announcements.length === 0 ? (
          <div className="bg-white p-6 rounded-lg shadow-md text-center text-gray-600">
            No announcement posted yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {announcements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl p-6 transition-transform transform hover:-translate-y-1"
              >
                <div className="flex flex-col gap-4">
                  <div className="text-sm text-gray-500">{new Date(announcement.created_at).toLocaleDateString()}</div>
                  <h3 className="text-xl font-semibold text-gray-800">{announcement.title}</h3>
                  <p className="text-gray-700">{announcement.message}</p>
                  <span className="text-sm text-gray-400">#ID: {announcement.id}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Engineerlayout>
  );
}

export default Announcements;
