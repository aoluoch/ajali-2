import { CheckCircle, Clock, AlertTriangle } from 'lucide-react';
import PropTypes from 'prop-types';

const StatusBadge = ({ status }) => {
  const getStatusConfig = () => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return {
          icon: <CheckCircle className="h-4 w-4" />,
          classes: 'bg-green-100 text-green-800'
        };
      case 'under investigation':
        return {
          icon: <Clock className="h-4 w-4" />,
          classes: 'bg-yellow-100 text-yellow-800'
        };
      default:
        return {
          icon: <AlertTriangle className="h-4 w-4" />,
          classes: 'bg-red-100 text-red-800'
        };
    }
  };

  const { icon, classes } = getStatusConfig();

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium ${classes}`}>
      {icon}
      <span className="ml-1">{status}</span>
    </span>
  );
};

StatusBadge.propTypes = {
  status: PropTypes.string.isRequired,
};

export default StatusBadge;