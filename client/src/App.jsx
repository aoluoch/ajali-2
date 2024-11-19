import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from "./components/Footer";
import ContactPage from './pages/ContactPage';
import CreateIncident from './pages/CreateIncident';
import HomePage from './pages/HomePage';
import LandingPage from './components/LandingPage';
import Login from './pages/Login';
import ManageIncidents from './pages/ManageIncidents';
import MyProfile from './pages/MyProfile';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
import Admin from './components/Admin'; 

function App() {
  return (
    <Router>
            <Routes>
              {/* Landing page as default route */}
              <Route path="/" element={<LandingPage />} />
              <Route element={<Layout />}>
              {/* Unprotected routes */}
              <Route path="/home" element={<HomePage />} />
              <Route path="/create-incident" element={<CreateIncident />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/manage-incidents" element={<ManageIncidents />} />
              <Route path="/settings" element={<Settings />} />
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
