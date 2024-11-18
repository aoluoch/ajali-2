import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from './slices/authSlice';
import incidentReducer from './slices/incidentSlice';
import uiReducer from './slices/uiSlice';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user'] // Only persist user data, not auth state
};

const store = configureStore({
  reducer: {
    auth: persistReducer(authPersistConfig, authReducer),
    incidents: incidentReducer,
    ui: uiReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    })
});

export const persistor = persistStore(store);
export default store;