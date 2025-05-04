import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';

export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await api.post('/login', credentials);
      const { access_token, user } = response.data;
      // Store auth data
      localStorage.setItem('token', access_token);
      localStorage.setItem('user', JSON.stringify(user));
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/register', userData);
      // Don't store auth data after registration
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Registration failed');
    }
  }
);

export const checkAuthStatus = createAsyncThunk(
  'auth/checkStatus',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!token || !storedUser || storedUser === "undefined") {
        throw new Error('No token or valid user data found');
      }

      let user;
      try {
        user = JSON.parse(storedUser);
      } catch (parseError) {
        throw new Error('Invalid user data format');
      }

      // Verify token is valid by making a request
      await api.get('/incidents');
      return { user, token };
    } catch (error) {
      // Clear invalid auth data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return rejectWithValue('Authentication failed: ' + error.message);
    }
  }
);

const loadInitialState = () => {
  const token = localStorage.getItem('token');
  const storedUser = localStorage.getItem('user');

  let user = null;
  try {
    // Only attempt to parse if storedUser exists and is not "undefined"
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (error) {
    // If parsing fails, clear the invalid data
    console.error("Failed to parse user data from localStorage:", error);
    localStorage.removeItem('user');
  }

  return {
    user,
    token: token || null,
    error: null,
    isAuthenticated: !!token && !!user, // Only authenticate if we have both token and valid user
    isLoading: false
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadInitialState(),
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      // Register cases
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        // Don't set authentication state after registration
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      // Check auth status cases
      .addCase(checkAuthStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.isLoading = false;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
        state.isLoading = false;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;