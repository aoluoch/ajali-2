import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Import the Provider from react-redux
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import store from './store/store'
import ContactPage from './pages/ContactPage';
import CreateIncident from './pages/CreateIncident';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import ManageIncidents from './pages/ManageIncidents';
import MyProfile from './pages/MyProfile';
import Notifications from './pages/Notifications';
import Settings from './pages/Settings';
  
function App() {
  return (
    <Provider store={store}> {/* Wrap your app with the Provider */}
      <Router>
        <AuthProvider>
          <NotificationProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Protected routes */}
              <Route path="/home" element={
                <ProtectedRoute>
                  <Layout>
                    <HomePage />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/create-incident" element={
                <ProtectedRoute>
                  <Layout>
                    <CreateIncident />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout>
                    <MyProfile />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/notifications" element={
                <ProtectedRoute>
                  <Layout>
                    <Notifications />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/manage-incidents" element={
                <ProtectedRoute>
                  <Layout>
                    <ManageIncidents />
                  </Layout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <Layout>
                    <Settings />
                  </Layout>
                </ProtectedRoute>
              } />
            </Routes>
          </NotificationProvider>
        </AuthProvider>
      </Router>
    </Provider>
  );
}

export default App;