import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
//import { useDispatch, useSelector } from 'react-redux';
//import { checkAuthStatus } from '../store/slices/authSlice';
import LoadingSpinner from './LoadingSpinner';
import PropTypes from 'prop-types'; // Added import for PropTypes

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired, // Added propTypes validation
};

export default ProtectedRoute;