import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import AdminLayout from './Adminlayout';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('admin');
  const [editingUserId, setEditingUserId] = useState(null);
  const inputref=useRef();

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost/projects_and_practices/projects/OBN_project/users.php');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    inputref.current.focus();
    fetchUsers();
  }, []);

  // Handle form submission (add or edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name,
      username,
      password,
      email,
      phone,
      role
    };

    try {
      if (editingUserId) {
        // Edit user
        await axios.post('http://localhost/projects_and_practices/projects/OBN_project/edit_user.php', {
          id: editingUserId,
          ...formData
        });
        setEditingUserId(null);
      } else {
        // Add new user
        await axios.post('http://localhost/projects_and_practices/projects/OBN_project/add_user.php', formData);
      }

      // Reset form
      setName('');
      setUsername('');
      setPassword('');
      setEmail('');
      setPhone('');
      setRole('admin');

      fetchUsers(); // Refresh user list
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  // Delete a user
  const handleDelete = async (id) => {
    try {
      await axios.post('http://localhost/projects_and_practices/projects/OBN_project/delete_user.php', { id });
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Edit user (prefill form)
  const handleEdit = (id) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setEditingUserId(user.id);
      setName(user.name);
      setUsername(user.username);
      setPassword('');
      setEmail(user.email);
      setPhone(user.phone);
      setRole(user.role);
    }
  };

  return (
    <AdminLayout>
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">{editingUserId ? 'Edit User' : 'Add User'}</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
        <input ref={inputref} className="border p-2" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input className="border p-2" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input className="border p-2" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required={!editingUserId} />
        <input className="border p-2" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <input className="border p-2" type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        <select className="border p-2" value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="admin">Admin</option>
          <option value="network_engineer">Engineer</option>
          <option value="end_user">End User</option>
        </select>
        <button className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white p-2 rounded col-span-1 md:col-span-2" type="submit">
          {editingUserId ? 'Update User' : 'Add User'}
        </button>
      </form>

      <h2 className="text-2xl font-bold mt-8 mb-4">User List</h2>
      <table className="w-full border border-gray-300 shadow-2xl rounded-lg ">
        <thead className="bg-gray-200">
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Username</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="border px-4 py-2 hover:bg-gray-300">{user.id}</td>
              <td className="border px-4 py-2 hover:bg-gray-300">{user.name}</td>
              <td className="border px-4 py-2 hover:bg-gray-300">{user.username}</td>
              <td className="border px-4 py-2 hover:bg-gray-300">{user.email}</td>
              <td className="border px-4 py-2 hover:bg-gray-300">{user.phone}</td>
              <td className="border px-4 py-2 capitalize hover:bg-gray-300">{user.role.replace('_', ' ')}</td>
              <td className="border px-8 flex py-2 space-x-2">
                <button onClick={() => handleEdit(user.id)} className="bg-blue-600 px-4 py-3 rounded cursor-pointer text-white hover:bg-blue-700">Edit</button>
                <button onClick={() => handleDelete(user.id)} className="bg-red-600 px-2 py-3 rounded cursor-pointer text-white hover:bg-red-700">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </AdminLayout>
  );
};

export default Users;
