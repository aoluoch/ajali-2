import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '../../utils/api';

// Async thunks
export const fetchIncidents = createAsyncThunk(
  'incidents/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.getIncidents();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch incidents');
    }
  }
);

export const createIncident = createAsyncThunk(
  'incidents/create',
  async (incidentData, { rejectWithValue }) => {
    try {
      const response = await api.createIncident(incidentData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to create incident');
    }
  }
);

export const updateIncident = createAsyncThunk(
  'incidents/update',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.updateIncident(id, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update incident');
    }
  }
);

export const deleteIncident = createAsyncThunk(
  'incidents/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.deleteIncident(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete incident');
    }
  }
);

const initialState = {
  incidents: [],
  loading: false,
  error: null,
  currentIncident: null
};

const incidentSlice = createSlice({
  name: 'incidents',
  initialState,
  reducers: {
    setCurrentIncident: (state, action) => {
      state.currentIncident = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch incidents
      .addCase(fetchIncidents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIncidents.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents = action.payload;
      })
      .addCase(fetchIncidents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create incident
      .addCase(createIncident.fulfilled, (state, action) => {
        state.incidents.push(action.payload);
      })
      // Update incident
      .addCase(updateIncident.fulfilled, (state, action) => {
        const index = state.incidents.findIndex(inc => inc.id === action.payload.id);
        if (index !== -1) {
          state.incidents[index] = action.payload;
        }
      })
      // Delete incident
      .addCase(deleteIncident.fulfilled, (state, action) => {
        state.incidents = state.incidents.filter(inc => inc.id !== action.payload);
      });
  }
});

export const { setCurrentIncident, clearError } = incidentSlice.actions;
export default incidentSlice.reducer;