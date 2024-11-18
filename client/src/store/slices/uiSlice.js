import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  notifications: [],
  theme: 'light',
  sidebarOpen: false
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      state.notifications.push({
        id: Date.now(),
        ...action.payload
      });
    },
    removeNotification: (state, action) => {
      state.notifications = state.notifications.filter(n => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    toggleTheme: (state) => {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    }
  }
});

export const {
  addNotification,
  removeNotification,
  clearNotifications,
  toggleTheme,
  toggleSidebar
} = uiSlice.actions;

export default uiSlice.reducer;