import PropTypes from 'prop-types';
import { buttonStyles } from '../styles/theme';
import LoadingSpinner from './LoadingSpinner';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  isLoading = false,
  ...props
}) => {
  const baseClasses = buttonStyles.base;
  const variantClasses = buttonStyles[variant];
  const sizeClasses = buttonStyles.sizes[size];
  const disabledClasses = (disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className} flex items-center justify-center`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <LoadingSpinner size="sm" className="mr-2" />
          {typeof children === 'string' ? children : 'Loading...'}
        </>
      ) : children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};

export default Button;