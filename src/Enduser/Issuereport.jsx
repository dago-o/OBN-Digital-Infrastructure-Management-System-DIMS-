import React, { useState, useEffect, useRef } from 'react';
import Enduserlayout from './Enduserlayout';
import axios from 'axios';
import { use } from 'react';

function Issuereport() {
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [deviceId, setDeviceId] = useState('');
  const [deviceName, setDeviceName] = useState('');
  const [deviceOptions, setDeviceOptions] = useState([]);
  const useref=useRef(null);

  // Fetch all devices from backend for dropdown
  useEffect(() => {
    useref.current.focus();
    axios.get('http://localhost/projects_and_practices/projects/OBN_project/getdevice.php')
      .then((res) => {
        setDeviceOptions(res.data);
      })
      .catch((err) => {
        console.error("Error fetching devices:", err);
      });
  }, []);

  // When user selects device name, auto-fill ID
  const handleDeviceChange = (e) => {
    const selectedName = e.target.value;
    setDeviceName(selectedName);

    const selectedDevice = deviceOptions.find(device => device.name === selectedName);
    if (selectedDevice) {
      setDeviceId(selectedDevice.id);
    } else {
      setDeviceId('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    const reportedBy = user?.user_id;

    const data = {
      title,
      location,
      description,
      deviceId,
      reportedBy,
      deviceName
    };

    axios.post('http://localhost/projects_and_practices/projects/OBN_project/issue_report.php', data)
      .then(response => {
        alert(response.data.message);
        setTitle('');
        setLocation('');
        setDescription('');
        setDeviceId('');
        setDeviceName('');
      })
      .catch(error => {
        console.error('Error reporting issue:', error);
        alert('Failed to submit issue.');
      });
  };

  return (
    <Enduserlayout>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Issue Report</h2>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Issue Title</label>
            <input
           ref={useref}
            
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              type="text"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
              required
            />
          </div>

          {/* Device Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Device Name</label>
            <select
              value={deviceName}
              onChange={handleDeviceChange}
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
              required
            >
              <option value="">Select a device</option>
              {deviceOptions.map(device => (
                <option key={device.id} value={device.name}>
                  {device.name}
                </option>
              ))}
            </select>
          </div>

          {/* Hidden or optional display */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Device ID (auto-filled)</label>
            <input
              value={deviceId}
              readOnly
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg
            cursor-pointer"
          >
            Submit Issue
          </button>
        </form>
      </div>
    </Enduserlayout>
  );
}

export default Issuereport;
