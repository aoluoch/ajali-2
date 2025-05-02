import { motion } from 'framer-motion';
import { MapPin, Clock, Edit2, Trash2, Eye } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchIncidents, deleteIncident } from '../store/slices/incidentSlice';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import StatusBadge from './StatusBadge';
import Container from './Container';
import Card from './Card';

const RecentIncidents = () => {
  const dispatch = useDispatch();
  const { incidents } = useSelector((state) => state.incidents);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchIncidents());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        await dispatch(deleteIncident(id)).unwrap();
      } catch (error) {
        console.error('Failed to delete incident:', error);
      }
    }
  };

  // Sort incidents by date (most recent first) and take the first 6
  const recentIncidents = [...incidents]
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
    .slice(0, 6);

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    return `${Math.floor(diffInSeconds / 86400)} days ago`;
  };

  return (
    <div className="w-full">
      {recentIncidents.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No incidents reported yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {recentIncidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="overflow-hidden">
                <div className="flex justify-between items-start mb-4">
                  <StatusBadge status={incident.status} />
                  {(user?.id === incident.user_id || user?.is_admin) && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(incident.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete incident"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      {user?.id === incident.user_id && (
                        <Link
                          to={`/edit-incident/${incident.id}`}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit incident"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {incident.description.length > 100
                    ? `${incident.description.substring(0, 100)}...`
                    : incident.description}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="h-4 w-4 mr-2 text-primary-500 shrink-0" />
                      <span className="truncate">
                        {`${incident.latitude.toFixed(6)}, ${incident.longitude.toFixed(6)}`}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-primary-500 shrink-0" />
                      <span>{formatTimeAgo(incident.created_at)}</span>
                    </div>
                  </div>

                  <div className="flex justify-start sm:justify-end items-center sm:items-end mt-4 sm:mt-0">
                    <Link to={`/incident-details/${incident.id}`}>
                      <Button
                        variant="primary"
                        size="sm"
                        className="flex items-center w-full sm:w-auto"
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentIncidents;