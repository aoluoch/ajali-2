import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from "./components/Footer";
import {
  Admin,
  ContactPage,
  CreateIncident,
  HomePage,
  LandingPage,
  Login,
  ManageIncidents,
  MyProfile,
  Notifications,
  Settings
} from './pages';

const AppLayout = () => {
  const location = useLocation();
  
  // Define paths where Header and Sidebar should appear
  const showHeaderSidebar = ['/home', '/create-incident', '/profile', '/notifications', '/manage-incidents', '/settings'].includes(location.pathname);

  return (
    <Layout>
      <div className="flex flex-col min-h-screen">
        {showHeaderSidebar && <Header />}
        <div className="flex flex-1">
          {showHeaderSidebar && <Sidebar />}
          <div className={`flex-1 overflow-auto ${showHeaderSidebar ? 'p-4' : 'p-0'}`}>
            <Routes>
              {/* Landing page as default route */}
              <Route path="/" element={<LandingPage />} />
              
              {/* Protected routes with header and sidebar */}
              <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/create-incident" element={<ProtectedRoute><CreateIncident /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><MyProfile /></ProtectedRoute>} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              <Route path="/manage-incidents" element={<ProtectedRoute><ManageIncidents /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
              
              {/* Public routes without header and sidebar */}
              <Route path="/login" element={<Login />} />
              <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Redirect all unknown routes to landing page */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            {/* Only show footer on pages without header and sidebar */}
            {!showHeaderSidebar && <Footer />}
          </div>
        </div>
      </div>
    </Layout>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <NotificationProvider>
          <AppLayout />
        </NotificationProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;