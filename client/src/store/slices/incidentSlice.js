import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const fetchIncidents = createAsyncThunk(
  'incidents/fetchIncidents',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/incidents');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch incidents');
    }
  }
);

export const fetchIncidentById = createAsyncThunk(
  'incidents/fetchIncidentById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/incidents/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch incident details');
    }
  }
);

export const updateIncident = createAsyncThunk(
  'incidents/updateIncident',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/incidents/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update incident');
    }
  }
);

export const createIncident = createAsyncThunk(
  'incidents/createIncident',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/incidents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || 'Failed to create incident');
    }
  }
);

export const updateIncidentStatus = createAsyncThunk(
  'incidents/updateStatus',
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/admin/incidents/${id}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update status');
    }
  }
);

export const deleteIncident = createAsyncThunk(
  'incidents/deleteIncident',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/incidents/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete incident');
    }
  }
);

const initialState = {
  incidents: [],
  currentIncident: null,
  error: null,
  loadingStates: {
    fetchIncidents: false,
    fetchIncidentById: false,
    createIncident: false,
    updateIncident: false,
    updateStatus: false,
    deleteIncident: false
  }
};

const incidentSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch incidents
      .addCase(fetchIncidents.pending, (state) => {
        state.loadingStates.fetchIncidents = true;
        state.error = null;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.incidents = action.payload;
        state.loadingStates.fetchIncidents = false;
        state.error = null;
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingStates.fetchIncidents = false;
      })
      // Fetch incident by ID
      .addCase(fetchIncidentById.pending, (state) => {
        state.loadingStates.fetchIncidentById = true;
        state.currentIncident = null;
        state.error = null;
      })
      .addCase(fetchIncidentById.fulfilled, (state, action) => {
        state.currentIncident = action.payload;
        state.loadingStates.fetchIncidentById = false;
        state.error = null;
      })
      .addCase(fetchIncidentById.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingStates.fetchIncidentById = false;
        state.currentIncident = null;
      })
      // Create incident
      .addCase(createIncident.pending, (state) => {
        state.loadingStates.createIncident = true;
        state.error = null;
      })
      .addCase(createIncident.fulfilled, (state, action) => {
        state.incidents.push(action.payload);
        state.loadingStates.createIncident = false;
        state.error = null;
      })
      .addCase(createIncident.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingStates.createIncident = false;
      })
      // Update incident
      .addCase(updateIncident.pending, (state) => {
        state.loadingStates.updateIncident = true;
        state.error = null;
      })
      .addCase(updateIncident.fulfilled, (state, action) => {
        const index = state.incidents.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.incidents[index] = action.payload;
        }
        if (state.currentIncident && state.currentIncident.id === action.payload.id) {
          state.currentIncident = action.payload;
        }
        state.loadingStates.updateIncident = false;
        state.error = null;
      })
      .addCase(updateIncident.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingStates.updateIncident = false;
      })
      // Update incident status
      .addCase(updateIncidentStatus.pending, (state) => {
        state.loadingStates.updateStatus = true;
        state.error = null;
      })
      .addCase(updateIncidentStatus.fulfilled, (state, action) => {
        const index = state.incidents.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.incidents[index] = action.payload;
        }
        state.loadingStates.updateStatus = false;
        state.error = null;
      })
      .addCase(updateIncidentStatus.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingStates.updateStatus = false;
      })
      // Delete incident
      .addCase(deleteIncident.pending, (state) => {
        state.loadingStates.deleteIncident = true;
        state.error = null;
      })
      .addCase(deleteIncident.fulfilled, (state, action) => {
        state.incidents = state.incidents.filter((i) => i.id !== action.payload);
        state.loadingStates.deleteIncident = false;
        state.error = null;
      })
      .addCase(deleteIncident.rejected, (state, action) => {
        state.error = action.payload;
        state.loadingStates.deleteIncident = false;
      });
  },
});

export const { clearError } = incidentSlice.actions;
export default incidentSlice.reducer;