import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [message, setmessage] = useState('');
  const navigate = useNavigate();

  const handlelogin = () => {
  
   axios.post('http://localhost/projects_and_practices/projects/OBN_project/login.php', {
        username,
        password,
      })
      .then((response) => {
        if (response.data.success) {
          // const role = response.data.role; 
          const { role, user_id } = response.data;

          // Store user info in localStorage
  localStorage.setItem('user', JSON.stringify({ user_id, role }));
          if (role === 'admin') {
            navigate('/admin/dashboard');
          }
          else if (role === 'network_engineer') {
            navigate('/engineer/dashboard');
          }
          else if (role === 'end_user') {
            navigate('/enduser/dashboard');
          }
          else {
            setmessage('Unknown role');
          }
        } else {
          setmessage('Invalid credentials');
        }
      })
      .catch((error) => {
        setmessage('Error connecting to server');
      });
  };




  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md border-t-2 border-gray-200">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Login</h2>

        {message && (
          <div className="mb-4 text-red-600 text-center font-semibold">{message}</div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setusername(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          onClick={handlelogin}
          className="w-full bg-blue-600 hover:bg-blue-700 cursor-pointer text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
