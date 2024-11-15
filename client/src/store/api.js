import axios from 'axios';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000',  // Update this base URL according to your Flask server
  withCredentials: true, // Ensure sessions are sent with each request
});

// Error handling helper
const handleApiError = (error) => {
  // If the error is a response from the server
  if (error.response) {
    // The server responded with a status other than 2xx
    console.error(`API Error: ${error.response.status} - ${error.response.statusText}`);
    return {
      success: false,
      message: error.response.data.message || 'An error occurred on the server',
      status: error.response.status
    };
  } else if (error.request) {
    // The request was made, but no response was received
    console.error('Network Error: No response received from the server.');
    return {
      success: false,
      message: 'Network error: No response received from the server',
    };
  } else {
    // Something happened in setting up the request that triggered an error
    console.error('Error: ', error.message);
    return {
      success: false,
      message: error.message || 'An unknown error occurred',
    };
  }
};

// User API
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/users', userData);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/login', credentials);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post('/logout');
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Incident API
export const getIncidents = async () => {
  try {
    const response = await api.get('/incidents');
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const createIncident = async (incidentData) => {
  try {
    const response = await api.post('/incidents', incidentData);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const updateIncident = async (id, incidentData) => {
  try {
    const response = await api.put(`/incidents/${id}`, incidentData);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteIncident = async (id) => {
  try {
    const response = await api.delete(`/incidents/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Incident Image API
export const postIncidentImage = async (incidentId, imageUrl) => {
  try {
    const response = await api.post(`/incidents/${incidentId}/images`, { image_url: imageUrl });
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteIncidentImage = async (incidentId, imageId) => {
  try {
    const response = await api.delete(`/incidents/${incidentId}/images/${imageId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

// Incident Video API
export const postIncidentVideo = async (incidentId, videoUrl) => {
  try {
    const response = await api.post(`/incidents/${incidentId}/videos`, { video_url: videoUrl });
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export const deleteIncidentVideo = async (incidentId, videoId) => {
  try {
    const response = await api.delete(`/incidents/${incidentId}/videos/${videoId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return handleApiError(error);
  }
};

export default api;
