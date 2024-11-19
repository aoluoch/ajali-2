// src/components/AdminDashboard.jsx

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setIncidents, setLoading, updateIncidentStatus } from '../redux/adminSlice';
import axios from 'axios';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { incidents, loading } = useSelector(state => state.admin);

  const [status, setStatus] = useState('');

  // Fetch incidents from the backend API
  useEffect(() => {
    const fetchIncidents = async () => {
      dispatch(setLoading(true));
      try {
        const response = await axios.get('/api/incidents'); // Your backend API endpoint
        dispatch(setIncidents(response.data));
      } catch (error) {
        console.error("Error fetching incidents:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchIncidents();
  }, [dispatch]);

  // Handle the status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      // Update the state locally
      dispatch(updateIncidentStatus({ id, status: newStatus }));

      // Send status change to the backend
      await axios.put(`/api/incidents/${id}`, { status: newStatus });

      // Optionally, you can trigger an email or SMS notification here
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold">Ajali! Admin</h2>
        <nav className="mt-8">
          <ul>
            <li><a href="#" className="block py-2">Dashboard</a></li>
            <li><a href="#" className="block py-2">Incident Reports</a></li>
            <li><a href="#" className="block py-2">User Management</a></li>
            <li><a href="#" className="block py-2">Settings</a></li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-4">
        <h1 className="text-3xl font-bold mb-6">Incident Reports</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Title</th>
                <th className="py-2 px-4 border">Status</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incidents.map(incident => (
                <tr key={incident.id}>
                  <td className="py-2 px-4 border">{incident.id}</td>
                  <td className="py-2 px-4 border">{incident.title}</td>
                  <td className="py-2 px-4 border">{incident.status}</td>
                  <td className="py-2 px-4 border">
                    <button
                      onClick={() => handleStatusChange(incident.id, 'under investigation')}
                      className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Under Investigation
                    </button>
                    <button
                      onClick={() => handleStatusChange(incident.id, 'resolved')}
                      className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Resolved
                    </button>
                    <button
                      onClick={() => handleStatusChange(incident.id, 'rejected')}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Rejected
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
