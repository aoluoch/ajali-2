import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import HomePage from './pages/HomePage';
import CreateIncident from './pages/CreateIncident';
import MyProfile from './pages/MyProfile';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Admin from './components/Admin'; 
import ContactPage from './pages/ContactPage';
import ProtectedRoute from './components/ProtectedRoute'; // Import the ProtectedRoute

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page as default route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Layout wrapper for protected routes */}
        <Route element={<Layout />}>
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/create-incident" 
            element={
              <ProtectedRoute>
                <CreateIncident />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <MyProfile />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/notifications" 
            element={
              <ProtectedRoute>
                <Notifications />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/settings" 
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            } 
          />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Redirect all unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;