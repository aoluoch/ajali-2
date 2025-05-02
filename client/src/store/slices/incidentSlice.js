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
      return rejectWithValue(error.response?.data?.message || 'Failed to create incident');
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
  loading: false,
  error: null,
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
      .addCase(createIncident.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createIncident.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents.push(action.payload);
      })
      .addCase(createIncident.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateIncidentStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateIncidentStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.incidents.findIndex((i) => i.id === action.payload.id);
        if (index !== -1) {
          state.incidents[index] = action.payload;
        }
      })
      .addCase(updateIncidentStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteIncident.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteIncident.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents = state.incidents.filter((i) => i.id !== action.payload);
      })
      .addCase(deleteIncident.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = incidentSlice.actions;
export default incidentSlice.reducer;