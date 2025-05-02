import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import CreateIncident from './pages/CreateIncident';
import MyProfile from './pages/MyProfile';
import ManageIncidents from './pages/ManageIncidents';
import ContactPage from './pages/ContactPage';
import LandingPage from './pages/LandingPage';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<><Navbar /><ContactPage /></>} />
        <Route path="/" element={<LandingPage />} exact />
        
        {/* Protected routes */}
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<HomePage />} />
          <Route path="/create-incident" element={<CreateIncident />} />
          <Route path="/profile" element={<MyProfile />} />
          <Route path="/manage-incidents" element={<ManageIncidents />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;