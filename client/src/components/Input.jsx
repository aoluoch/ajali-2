import PropTypes from 'prop-types';
import { inputStyles } from '../styles/theme';

const Input = ({
  error,
  size = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = inputStyles.base;
  const focusClasses = inputStyles.focus;
  const errorClasses = error ? inputStyles.error : '';
  const sizeClasses = inputStyles.sizes[size];

  return (
    <div className="w-full">
      <input
        className={`${baseClasses} ${focusClasses} ${errorClasses} ${sizeClasses} ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

Input.propTypes = {
  error: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  className: PropTypes.string,
  // Add other props validation as needed
};

export default Input;