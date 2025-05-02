import React from 'react';
import PropTypes from 'prop-types';

/**
 * Card component for consistent styling
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.title - Card title
 * @param {React.ReactNode} props.action - Action component (button, link, etc.)
 * @param {boolean} props.noPadding - Whether to remove padding
 * @returns {React.ReactElement} Card component
 */
const Card = ({ 
  children, 
  className = '', 
  title, 
  action,
  noPadding = false
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {title && (
        <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
          {action && <div>{action}</div>}
        </div>
      )}
      <div className={noPadding ? '' : 'p-6'}>
        {children}
      </div>
    </div>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  title: PropTypes.string,
  action: PropTypes.node,
  noPadding: PropTypes.bool
};

export default Card;
