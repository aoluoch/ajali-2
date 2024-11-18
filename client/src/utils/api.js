import axios from 'axios';

const API_URL = 'http://127.0.0.1:5000';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor to include CSRF token
api.interceptors.request.use(
  (config) => {
    // Get auth token from localStorage
    const user = localStorage.getItem('user');
    if (user) {
      const token = JSON.parse(user).token;
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`; // Fixed template literal
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth endpoints
export const register = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Registration failed');
  }
};

export const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Login failed');
  }
};

export const logout = async () => {
  try {
    await api.post('/auth/logout');
    localStorage.removeItem('user');
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Logout failed');
  }
};

export const checkAuthStatus = async () => {
  try {
    const response = await api.get('/auth/status');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Auth check failed');
  }
};

// Incident endpoints
export const getIncidents = async () => {
  try {
    const response = await api.get('/incidents');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch incidents');
  }
};

export const createIncident = async (incidentData) => {
  try {
    const response = await api.post('/incidents', incidentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create incident');
  }
};

export const updateIncident = async (id, incidentData) => {
  try {
    const response = await api.put(`/incidents/${id}`, incidentData); // Fixed template literal
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to update incident');
  }
};

export const deleteIncident = async (id) => {
  try {
    await api.delete(`/incidents/${id}`); // Fixed template literal
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete incident');
  }
};

// Media endpoints
export const uploadImage = async (incidentId, imageData) => {
  try {
    const response = await api.post(`/incidents/${incidentId}/images`, imageData); // Fixed template literal
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload image');
  }
};

export const uploadVideo = async (incidentId, videoData) => {
  try {
    const response = await api.post(`/incidents/${incidentId}/videos`, videoData); // Fixed template literal
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to upload video');
  }
};

export const deleteImage = async (incidentId, imageId) => {
  try {
    await api.delete(`/incidents/${incidentId}/images/${imageId}`); // Fixed template literal
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete image');
  }
};

export const deleteVideo = async (incidentId, videoId) => {
  try {
    await api.delete(`/incidents/${incidentId}/videos/${videoId}`); // Fixed template literal
    return true;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete video');
  }
};

export default api;