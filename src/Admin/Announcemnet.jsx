
import axios from "axios";
import AdminLayout from "./Adminlayout";
import React, { useEffect, useState, useRef } from "react";
import { use } from "react";
function Announcement() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [announcements, setAnnouncements] = useState([]);
    // const [senderid, setsenderId] = useState(''); 
    const inputref=useRef(null);


    useEffect(() => {
        inputref.current.focus();
        // Fetch existing announcements from the backend
        axios.get('http://localhost/projects_and_practices/projects/OBN_project/get_announcement.php')
            .then(response => {
                setAnnouncements(response.data);
            })
            .catch(error => {
                console.error('Error fetching announcements:', error);
            });
    }, []);



  const handleSubmit = (e) => {
    e.preventDefault();
    const announcementData = {
      title,
      content
       
    };

    axios.post('http://localhost/projects_and_practices/projects/OBN_project/create_announcement.php', announcementData)
      .then(response => {
        alert('Announcement created successfully!');
        setTitle('');
        setContent('');
        // setsenderId('');
        })
        .catch(error => {
        console.error('Error creating announcement:', error);
        alert('Failed to create announcement.');
      });
  }

  const handleDelete = (id) => {
  if (window.confirm("Are you sure you want to delete this announcement?")) {
    axios.post('http://localhost/projects_and_practices/projects/OBN_project/delete_announcement.php', { id })
      .then(() => {
        setAnnouncements(prev => prev.filter(item => item.id !== id));
      })
      .catch(err => {
        alert("Failed to delete announcement");
        console.error(err);
      });
  }
};





  return (
    <AdminLayout>
    <div className="flex min-h-screen bg-gray-100"> 
       
        <main className="flex-1 p-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Announcements</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Create New Announcement</h3>
                <form onSubmit={handleSubmit}
                className="space-y-4">
                    

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Title</label>
                        <input
                            ref={inputref}
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Enter announcement title"
                            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Content</label>
                        <textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            rows="4"
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
                {
                    announcements.length === 0 ? (
                        <p className="text-gray-600">No announcements available.</p>
                    ) :
                    
                     announcements.map(announcement =>(
                        <ul className="space-y-4 mt-4" key={announcement.id}>
                        <li key={announcement.id} className="bg-white p-4 rounded-lg shadow">
                            <h4 className="text-lg font-bold">{announcement.title}</h4>
                            <p className="text-gray-600">{announcement.message}</p>
                             <p className="text-gray-600">Sent at:{announcement.created_at}</p>
                            <button onClick={() => handleDelete(announcement.id)}
                            className="mt-2 ml-2 text-red-600 hover:underline cursor-pointer">Delete</button>
                        </li>
                        </ul>
                    ))
                
                    

                }

            </div>
        </main>
    </div>
    </AdminLayout>
  );
}

export default Announcement;