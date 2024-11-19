import React from 'react';
import { Link } from 'react-router-dom'; // You can use React Router for navigation

const Sidebar = () => {
  return (
    <div className="w-64 bg-blue-800 text-white p-5">
      <h2 className="text-2xl font-bold mb-4">Ajali! Admin</h2>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:text-gray-400">Dashboard</Link>
        </li>
        <li className="mb-4">
          <Link to="/incidents" className="hover:text-gray-400">Manage Incidents</Link>
        </li>
        <li className="mb-4">
          <Link to="/settings" className="hover:text-gray-400">Settings</Link>
        </li>
        <li className="mb-4">
          <Link to="/users" className="hover:text-gray-400">Users</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
