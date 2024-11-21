import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'leaflet/dist/leaflet.css';
import './index.css';
import App from './App.jsx';
import './i18n'; 

// Import the I18nextProvider
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n'; // Import the i18n instance

// Import the AuthProvider
import { AuthProvider } from './authcontext'; // Make sure the path is correct

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap the App component with I18nextProvider and AuthProvider */}
    <I18nextProvider i18n={i18n}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </I18nextProvider>
  </StrictMode>
);