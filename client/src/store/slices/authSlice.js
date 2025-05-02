import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
      state.error = null;
    }
  }
});

export const { setAuth, setLoading, setError, logout } = authSlice.actions;

export const checkAuthStatus = () => async (dispatch) => {
  try {
    dispatch(setLoading(true));
    const response = await fetch('/api/check-auth', {
      credentials: 'include'
    });
    const data = await response.json();
    
    if (response.ok) {
      dispatch(setAuth({
        isAuthenticated: true,
        user: data.user
      }));
    } else {
      dispatch(setAuth({
        isAuthenticated: false,
        user: null
      }));
    }
  } catch (error) {
    dispatch(setError('Failed to check authentication status'));
  }
};

export default authSlice.reducer;