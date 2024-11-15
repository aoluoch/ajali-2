import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import incidentReducer from './slices/incidentSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    incidents: incidentReducer,
  },
});

export default store;