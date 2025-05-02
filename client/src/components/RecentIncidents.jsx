import { motion } from 'framer-motion';
import { MapPin, Clock, AlertCircle, Edit2, Trash2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchIncidents, deleteIncident } from '../store/slices/incidentSlice';
import { Link } from 'react-router-dom';
import Button from './Button.jsx';
import StatusBadge from './StatusBadge';
import LoadingSpinner from './LoadingSpinner';

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
    <section id="incidents" className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Recent Incidents</h2>
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
            Stay informed about recent incidents in your area
          </p>
        </motion.div>

        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {recentIncidents.map((incident, index) => (
            <motion.div
              key={incident.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              <div className="p-4 sm:p-6 flex-grow">
                <div className="flex justify-between items-start mb-3">
                  <StatusBadge status={incident.status} />
                  {(user?.id === incident.user_id || user?.is_admin) && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(incident.id)}
                        className="p-1 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete incident"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                      {user?.id === incident.user_id && (
                        <Link
                          to={`/edit-incident/${incident.id}`}
                          className="p-1 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                          title="Edit incident"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                      )}
                    </div>
                  )}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 sm:mb-3 line-clamp-2">
                  {incident.description}
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-gray-600">
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
              </div>
              <div className="p-4 sm:p-6 pt-0 sm:pt-0">
                <Link to={`/incident/${incident.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full text-xs sm:text-sm"
                  >
                    View Details
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 sm:mt-12">
          <Link to="/manage-incidents">
            <Button
              variant="primary"
              size="lg"
              className="inline-flex items-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 text-sm sm:text-base"
            >
              <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              View All Incidents
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecentIncidents;