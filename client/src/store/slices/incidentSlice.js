// src/store/slices/incidentSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getIncidents, createIncident, updateIncident, deleteIncident } from '../api';  // Import API calls

// Async Thunks
export const fetchIncidents = createAsyncThunk('incidents/fetchAll', async (_, { rejectWithValue }) => {
  try {
    const response = await getIncidents();
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const addIncident = createAsyncThunk('incidents/create', async (incidentData, { rejectWithValue }) => {
  try {
    const response = await createIncident(incidentData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const editIncident = createAsyncThunk('incidents/update', async ({ id, incidentData }, { rejectWithValue }) => {
  try {
    const response = await updateIncident(id, incidentData);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const removeIncident = createAsyncThunk('incidents/delete', async (id, { rejectWithValue }) => {
  try {
    await deleteIncident(id);
    return id;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

// Incident Slice
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
      .addCase(addIncident.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addIncident.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents.push(action.payload);
      })
      .addCase(addIncident.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update incident
      .addCase(editIncident.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editIncident.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.incidents.findIndex((incident) => incident.id === action.payload.id);
        if (index !== -1) {
          state.incidents[index] = action.payload;
        }
      })
      .addCase(editIncident.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete incident
      .addCase(removeIncident.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeIncident.fulfilled, (state, action) => {
        state.loading = false;
        state.incidents = state.incidents.filter((incident) => incident.id !== action.payload);
      })
      .addCase(removeIncident.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = incidentSlice.actions;
export default incidentSlice.reducer;
