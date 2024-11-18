import PropTypes from 'prop-types';
import { buttonStyles } from '../styles/theme';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  ...props
}) => {
  const baseClasses = buttonStyles.base;
  const variantClasses = buttonStyles[variant];
  const sizeClasses = buttonStyles.sizes[size];
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${disabledClasses} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.string,
  size: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;