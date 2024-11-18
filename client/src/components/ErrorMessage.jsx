import { AlertTriangle } from 'lucide-react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ message }) => {
  return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
        <p className="ml-3 text-red-700">{message}</p>
      </div>
    </div>
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorMessage;