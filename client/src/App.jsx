import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Layout from './components/Layout';
import LandingPage from './components/LandingPage';
import HomePage from './pages/HomePage';
import CreateIncident from './pages/CreateIncident';
import MyProfile from './pages/MyProfile';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Login from './pages/Login';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing page as default route */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Layout wrapper for protected routes */}
        <Route element={<Layout />}>
          <Route path="/home" element={<HomePage />} />
          <Route path="/create-incident" element={<CreateIncident />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Route>

        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Redirect all unknown routes to landing page */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;