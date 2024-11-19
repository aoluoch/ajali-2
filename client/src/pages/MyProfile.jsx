import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, MapPin, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    fetchUser().then(setUser).catch(setError).finally(() => setLoading(false));
    // Fetch incidents data
    fetchIncidents().then(setIncidents).catch(setError);
  }, []);

  const fetchUser = async () => {
    // Replace with actual API call
    return { id: 1, username: 'User', email: 'user@example.com', profilePicture: null };
  };

  const fetchIncidents = async () => {
    // Replace with actual API call
    return [
      { id: 1, userId: 1, title: 'Incident 1', description: 'Description 1', status: 'resolved' },
      { id: 2, userId: 1, title: 'Incident 2', description: 'Description 2', status: 'under investigation' }
    ];
  };

  const deleteIncident = async (id) => {
    // Replace with actual API call
    setIncidents(incidents.filter(incident => incident.id !== id));
  };

  // If no user is found, show loading state
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const userIncidents = incidents.filter(incident => incident.userId === user.id);
  const filteredIncidents = userIncidents.filter(incident => 
    filter === 'all' || incident.status.toLowerCase() === filter
  );

  const handleEdit = (incident) => {
    navigate('/create-incident', { state: { incident } });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        await deleteIncident(id);
        alert('Incident deleted successfully');
      } catch {
        alert('Failed to delete incident');
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'under investigation':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-600">Error loading incidents: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Profile Section */}
      <div className="mb-8 text-center">
        <div className="relative inline-block">
          <img
            src={user.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.username || 'User')}&background=random`}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">{user.username || 'User'}</h1>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* Incidents Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">My Incidents</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('under investigation')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'under investigation' ? 'bg-red-600 text-white' : 'bg-gray-100'
              }`}
            >
              Under Investigation
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-4 py-2 rounded-lg ${
                filter === 'resolved' ? 'bg-red-600 text-white' : 'bg-gray-100'
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {filteredIncidents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No incidents found</h3>
            <p className="mt-2 text-gray-500">
              {filter === 'all' 
                ? "You haven't reported any incidents yet"
                : `No ${filter} incidents found`}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredIncidents.map((incident) => (
              <div key={incident.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{incident.title}</h3>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(incident.status)}
                    <span className={`text-sm ${
                      incident.status === 'Resolved' ? 'text-green-600' :
                      incident.status === 'Under Investigation' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {incident.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">{incident.description}</p>
                
                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEdit(incident)}
                    className="flex items-center space-x-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded"
                  >
                    <Edit2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Edit</span>
                  </button>
                  <button
                    onClick={() => handleDelete(incident.id)}
                    className="flex items-center space-x-1 px-3 py-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="h-4 w-4" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;