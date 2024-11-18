import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, Settings, LogOut, Users, FileText, AlertTriangle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import AdminIncidentReview from '../components/AdminIncidentReview';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('incidents');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotifications();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleStatusUpdate = async (incidentId, status) => {
    try {
      // API call to update incident status
      const response = await fetch(`http://localhost:5000/incidents/${incidentId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) throw new Error('Failed to update incident status');

      addNotification({
        type: 'success',
        message: `Incident status updated to ${status}`
      });
    } catch (error) {
      addNotification({
        type: 'error',
        message: error.message
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 mr-2" />
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="relative">
                <Bell className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-white text-red-600 rounded-full w-4 h-4 text-xs flex items-center justify-center">
                  3
                </span>
              </button>
              <button>
                <Settings className="h-6 w-6" />
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-700 px-4 py-2 rounded-lg hover:bg-red-800 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-8 mb-8">
          <button
            onClick={() => setActiveTab('incidents')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'incidents'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <FileText className="h-5 w-5" />
            <span>Pending Incidents</span>
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg ${
              activeTab === 'users'
                ? 'bg-red-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Users className="h-5 w-5" />
            <span>Manage Users</span>
          </button>
        </div>

        {activeTab === 'incidents' ? (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Pending Incidents</h2>
            <div className="space-y-4">
              <AdminIncidentReview
                incident={{
                  id: 1,
                  title: "Traffic Accident on Uhuru Highway",
                  description: "Multiple vehicles involved in a collision",
                  status: "Pending"
                }}
                onUpdateStatus={handleStatusUpdate}
              />
              {/* Add more incidents as needed */}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">User Management</h2>
            {/* Add user management UI here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;