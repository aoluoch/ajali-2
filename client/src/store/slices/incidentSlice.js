import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

// Async thunks
export const createIncident = createAsyncThunk(
  'incidents/create',
  async (formData) => {
    const response = await axios.post(`${API_URL}/incidents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }
);

export const updateIncident = createAsyncThunk(
  'incidents/update',
  async ({ id, data }) => {
    const response = await axios.put(`${API_URL}/incidents/${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }
);

export const deleteIncident = createAsyncThunk(
  'incidents/delete',
  async (id) => {
    await axios.delete(`${API_URL}/incidents/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return id;
  }
);

export const fetchIncidents = createAsyncThunk(
  'incidents/fetchAll',
  async () => {
    const response = await axios.get(`${API_URL}/incidents`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data;
  }
);

export const updateIncidentStatus = createAsyncThunk(
  'incidents/updateStatus',
  async ({ id, status }) => {
    const response = await axios.put(
      `${API_URL}/admin/incidents/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    return response.data;
  }
);

const incidentSlice = createSlice({
  name: 'incidents',
  initialState: {
    incidents: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create incident
      .addCase(createIncident.pending, (state) => {
        state.loading = true;
      })
      .addCase(createIncident.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents.push(action.payload);
      })
      .addCase(createIncident.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update incident
      .addCase(updateIncident.fulfilled, (state, action) => {
        const index = state.incidents.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.incidents[index] = action.payload;
        }
      })
      // Delete incident
      .addCase(deleteIncident.fulfilled, (state, action) => {
        state.incidents = state.incidents.filter((i) => i.id !== action.payload);
      })
      // Fetch incidents
      .addCase(fetchIncidents.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents = action.payload;
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Update incident status
      .addCase(updateIncidentStatus.fulfilled, (state, action) => {
        const index = state.incidents.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.incidents[index] = action.payload;
        }
      });
  },
});

export const { clearError } = incidentSlice.actions;
export default incidentSlice.reducer;