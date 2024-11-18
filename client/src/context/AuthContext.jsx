import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import * as api from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const checkAuthStatus = useCallback(async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const userData = JSON.parse(storedUser);
        setUser(userData);
        const response = await api.checkAuthStatus();
        if (!response.data.isAuthenticated) {
          throw new Error('Session expired');
        }
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      const userData = {
        id: response.data.id,
        username: response.data.username,
        email: response.data.email,
        profilePicture: response.data.profilePicture || null,
        is_admin: response.data.is_admin || false,
      };
      setUser(userData);
      localStorage.setItem('user', JSON.stringify(userData));
      navigate('/home');
      return { success: true };
    } catch (error) {
      console.error('Login failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Invalid credentials',
      };
    }
  };

  const register = async (userData) => {
    try {
      await api.register(userData);
      navigate('/login');
      return { success: true };
    } catch (error) {
      console.error('Registration failed:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('user');
      navigate('/login');
    }
  };

  const value = {
    user,
    login,
    logout,
    register,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook to use the AuthContext
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};