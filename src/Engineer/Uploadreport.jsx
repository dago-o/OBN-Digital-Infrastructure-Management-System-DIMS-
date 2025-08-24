import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Engineerlayout from './Engineerlayout';
import { FaUpload } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';

function UploadReport() {
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [reports, setReports] = useState([]);

  const location = useLocation();
  const reportData = location.state;

  const handleFileChange = (e) => {
    setReport(e.target.files[0]);
    setMessage('');
  };



  const handleUpload = () => {
    if (!report) {
      setMessage('Please select a report file to upload.');
      return;
    }

    setLoading(true);
    const formData = new FormData();

    formData.append('report', report);
    formData.append('issue_id', reportData.id);
    formData.append('location', reportData.location);
    formData.append('device_id', reportData.device_id);
    formData.append('device_name', reportData.name);
    formData.append('reported_by', reportData.reported_by);
    formData.append('engineer_id', reportData.assigned_engineer_id);

    axios.post('http://localhost/projects_and_practices/projects/OBN_project/uploadreport.php', formData)
      .then((response) => {
        setLoading(false);
        if (response.data.success) {
          setSuccess('Report uploaded successfully.');
          setError('');
          setReport(null);
          
        } else {
          setError('Failed to upload report: ' + response.data.message);
          setSuccess('');
        }
      })
      .catch((error) => {
        setLoading(false);
        setError('Error uploading report: ' + error.message);
        setSuccess('');
      });
  };

  return (
    <Engineerlayout>
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upload Report</h2>
        {message && <div className="text-red-500 mb-4">{message}</div>}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        {success && <div className="text-green-500 mb-4">{success}</div>}

        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={handleFileChange}
          className="border rounded p-2 w-full mb-4"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center"
        >
          <FaUpload className="mr-2" />
          {loading ? 'Uploading...' : 'Upload Report'}
        </button>

        {reportData && (
          <div className="mt-6 p-4 bg-gray-100 rounded border">
            <h3 className="text-lg font-bold mb-2">Report Info:</h3>
            <p><strong>Issue ID:</strong> {reportData.id}</p>
            <p><strong>Device:</strong> {reportData.device_id} - {reportData.name}</p>
            <p><strong>Location:</strong> {reportData.location}</p>
            <p><strong>Reported By:</strong> {reportData.reported_by}</p>
            <p><strong>Engineer ID:</strong> {reportData.assigned_engineer_id}</p>
            <p><strong>Updated At:</strong> {reportData.updated_at}</p>
          </div>
        )}

      </div>
    </Engineerlayout>
  );
}

export default UploadReport;
