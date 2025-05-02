import React from 'react';
import { Bell } from 'lucide-react';

function Notifications() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Notifications</h1>
      
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <Bell className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">No new notifications at this time.</p>
      </div>
    </div>
  );
}

export default Notifications;
