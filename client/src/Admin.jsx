import React from 'react';
import './Admin.css';

const Admin = () => {
    
  const username = "Admin User";

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <div className="sidebar bg-gray-800 text-white w-64 h-screen">
        <div className="sidebar-header p-4 text-xl font-bold">
          Admin Dashboard
        </div>
        <ul className="sidebar-links p-4 space-y-4">
          <li>
            <a href="/" className="text-gray-300 hover:text-white">Dashboard</a>
          </li>
          <li>
            <a href="/home" className="text-gray-300 hover:text-white">Home</a>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="main-content flex-1 flex flex-col">
        {/* Navbar */}
        <div className="navbar bg-gray-800 text-white p-4 flex justify-between items-center">
          <div className="navbar-left flex space-x-6">
            <a href="/user-home" className="hover:text-gray-300">User Home</a>
            <a href="/report-incident" className="hover:text-gray-300">Report New Incident</a>
          </div>
          <div className="navbar-right flex items-center space-x-4">
            <span>{username}</span>
            <button className="text-red-400 hover:text-red-600">Logout</button>
          </div>
        </div>

        {/* Main Dashboard Content */}
        <div className="content p-6">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
          <p>Manage incidents and monitor system status.</p>
        </div>
      </div>
    </div>
  );
};

export default Admin;
