import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { useDispatch } from 'react-redux';
import { deleteIncident } from '../store/slices/incidentSlice';
import { addNotification } from '../store/slices/uiSlice';
import { Edit2, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import StatusBadge from './StatusBadge';

const IncidentCard = ({ incident }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = () => {
    navigate('/create-incident', { state: { incident } });
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      setIsDeleting(true);
      try {
        await dispatch(deleteIncident(incident.id)).unwrap();
        dispatch(addNotification({
          type: 'success',
          message: 'Incident deleted successfully'
        }));
      } catch {
        // Removed unused 'error' variable
        dispatch(addNotification({
          type: 'error',
          message: 'Failed to delete incident'
        }));
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold">{incident.title}</h3>
          <StatusBadge status={incident.status} />
        </div>

        <p className={`text-gray-600 ${expanded ? '' : 'line-clamp-2'}`}>
          {incident.description}
        </p>
        
        <button
          onClick={() => setExpanded(!expanded)}
          className="text-primary-600 text-sm flex items-center mt-2 hover:text-primary-700"
        >
          {expanded ? (
            <>Show less <ChevronUp className="h-4 w-4 ml-1" /></>
          ) : (
            <>Show more <ChevronDown className="h-4 w-4 ml-1" /></>
          )}
        </button>

        <div className="flex justify-end space-x-2 mt-4">
          <Button
            onClick={handleEdit}
            variant="secondary"
            size="sm"
          >
            <Edit2 className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="danger"
            size="sm"
          >
            <Trash2 className="h-4 w-4 mr-1" />
            <span className="hidden sm:inline">{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Define prop types for the component
IncidentCard.propTypes = {
  incident: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default IncidentCard;