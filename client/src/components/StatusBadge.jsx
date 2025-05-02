import React from 'react';
import PropTypes from 'prop-types';

function StatusBadge({ status }) {
  const getStatusStyles = () => {
    switch (status) {
      case 'under investigation':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['under investigation', 'resolved', 'rejected']).isRequired,
};

export default StatusBadge;