import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthStatus } from '../store/slices/authSlice';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      dispatch(checkAuthStatus());
    }
  }, [dispatch, isAuthenticated]);

  // If we're checking auth status, show nothing
  if (isLoading) {
    return null;
  }

  // If not authenticated, redirect to login with the intended location
  if (!isAuthenticated) {
    // Don't include the login page as the redirect location
    const redirectPath = location.pathname === '/login' ? '/' : location.pathname;
    return <Navigate to="/login" state={{ from: redirectPath }} replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;