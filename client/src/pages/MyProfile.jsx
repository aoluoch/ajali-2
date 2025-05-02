import React from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';

function MyProfile() {
  const { user } = useSelector((state) => state.auth);
  const { incidents } = useSelector((state) => state.incidents);

  // Filter user's incidents
  const userIncidents = incidents.filter(incident => incident.user_id === user?.id);

  return (
    <div className="container mx-auto px-4 py-4 sm:py-8">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h1 className="text-xl sm:text-2xl font-bold mb-6">My Profile</h1>
          
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6">
              <div className="flex items-center gap-3 min-w-[200px]">
                <User className="h-5 w-5 text-gray-500 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Username</p>
                  <p className="font-medium">{user?.username}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-gray-500 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Email</p>
                  <p className="font-medium">{user?.email}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-gray-500 shrink-0" />
                <div>
                  <p className="text-sm text-gray-500">Role</p>
                  <p className="font-medium">{user?.is_admin ? 'Administrator' : 'User'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-4 sm:p-6">
          <h2 className="text-lg sm:text-xl font-bold mb-4">My Incidents</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-sm text-blue-600">Total Reports</p>
              <p className="text-xl sm:text-2xl font-bold text-blue-800">{userIncidents.length}</p>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-600">Under Investigation</p>
              <p className="text-xl sm:text-2xl font-bold text-yellow-800">
                {userIncidents.filter(i => i.status === 'under investigation').length}
              </p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-600">Resolved</p>
              <p className="text-xl sm:text-2xl font-bold text-green-800">
                {userIncidents.filter(i => i.status === 'resolved').length}
              </p>
            </div>
          </div>
          
          <Link to="/create-incident">
            <Button variant="primary" className="w-full sm:w-auto">
              Report New Incident
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;