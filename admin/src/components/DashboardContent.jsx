import React from 'react';

const DashboardContent = () => {
  return (
    <div>
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Admin Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-gray-700">Incident Reports</h3>
          <p className="text-gray-500">Manage all reported incidents</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-gray-700">Pending Requests</h3>
          <p className="text-gray-500">View and process pending requests</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-medium text-gray-700">Notifications</h3>
          <p className="text-gray-500">View notifications and updates</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
