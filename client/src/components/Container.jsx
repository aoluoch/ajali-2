import React from 'react';
import PropTypes from 'prop-types';

/**
 * Container component for consistent page layouts
 * 
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.fluid - Whether the container should be full width
 * @param {string} props.as - HTML element to render as
 * @returns {React.ReactElement} Container component
 */
const Container = ({ 
  children, 
  className = '', 
  fluid = false, 
  as: Component = 'div' 
}) => {
  return (
    <Component 
      className={`
        ${fluid ? 'w-full' : 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'}
        ${className}
      `}
    >
      {children}
    </Component>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  fluid: PropTypes.bool,
  as: PropTypes.elementType
};

export default Container;
