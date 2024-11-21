import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../authcontext'; // Import the useAuth hook
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types'; // Import PropTypes

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth(); // Destructure from useAuth

  // Show a loading spinner if the loading state is true
  if (loading) {
    return <LoadingSpinner />;
  }

  // If the user is not authenticated, redirect to the login page
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // If authenticated, render the children components
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // PropTypes validation for children
};

export default ProtectedRoute;