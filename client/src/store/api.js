import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',  // Update this base URL according to your Flask server
  withCredentials: true, // Ensure sessions are sent with each request
});

// User API
export const registerUser = (userData) => api.post('/users', userData);
export const loginUser = (credentials) => api.post('/login', credentials);
export const logoutUser = () => api.post('/logout');

// Incident API
export const getIncidents = () => api.get('/incidents');
export const createIncident = (incidentData) => api.post('/incidents', incidentData);
export const updateIncident = (id, incidentData) => api.put(`/incidents/${id}`, incidentData);
export const deleteIncident = (id) => api.delete(`/incidents/${id}`);

// Incident Image API
export const postIncidentImage = (incidentId, imageUrl) => api.post(`/incidents/${incidentId}/images`, { image_url: imageUrl });
export const deleteIncidentImage = (incidentId, imageId) => api.delete(`/incidents/${incidentId}/images/${imageId}`);

// Incident Video API
export const postIncidentVideo = (incidentId, videoUrl) => api.post(`/incidents/${incidentId}/videos`, { video_url: videoUrl });
export const deleteIncidentVideo = (incidentId, videoId) => api.delete(`/incidents/${incidentId}/videos/${videoId}`);

export default api;
