import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateIncident from "./pages/CreateIncident";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyProfile from "./pages/MyProfile";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Footer from "./components/Footer";
import Admin from './components/Admin';
import ContactForm from './pages/ContactPage';
import Settings from './pages/Settings';
import Notifications from './pages/Notifications';
import ManageIncidents from './pages/ManageIncidents';

const AppLayout = () => {
  const location = useLocation();
  
  // Define paths where Header and Sidebar should appear
  const showHeaderSidebar = ['/home', '/create-incident', '/profile'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showHeaderSidebar && <Header />}
      <div className="flex flex-1">
        {showHeaderSidebar && <Sidebar />}
        <div className={`flex-1 overflow-auto ${showHeaderSidebar ? 'p-4' : 'p-0'}`}>
          <Routes>
            {/* Landing page as default route */}
            <Route path="/" element={<LandingPage />} />
            
            {/* Protected routes with header and sidebar */}
            <Route path="/home" element={<HomePage />} />
            <Route path="/create-incident" element={<CreateIncident />} />
            <Route path="/profile" element={<MyProfile />} />
            
            {/* Public routes without header and sidebar */}
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/manage-incidents" element={<ManageIncidents />} />
            <Route path="/contact" element={<ContactForm />} />
            <Route path="/settings" element={<Settings />} />

            {/* Redirect all unknown routes to landing page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          {/* Only show footer on pages without header and sidebar */}
          {!showHeaderSidebar && <Footer />}
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;