import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from 'react-redux'; // Importing Provider for Redux
import { store } from "./store/store"; // Importing the Redux store
import HomePage from "./pages/HomePage";
import CreateIncident from "./components/CreateIncident";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard"; // Ensure AdminDashboard is imported
import ContactPage from "./pages/ContactPage"; // Ensure ContactPage is imported
import ManageIncidents from "./pages/ManageIncidents";
import UserSidebar from "./components/UserSidebar";
import AdminSidebar from "./components/AdminSidebar"; // Ensure Sidebar is imported

function App() {
  return (
    <Provider store={store}> {/* Wrapping the app with Provider for Redux */}
      <Router>
        <div className="flex flex-col h-screen">
          <Header />
          <div className="flex flex-1">
            <UserSidebar /> {/* Ensuring Sidebar is included */}
            <div className="flex-1 overflow-auto p-4">
            </div> {/* Closing the div to fix the lint error */}
              <AdminSidebar />
              <div className="flex-1 overflow-auto p-4">
              <Routes>
                <Route path="/home" element={<HomePage />} />
                <Route path="/login" element={<Login />} /> {/* Login page */}
                <Route path="/landing" element={<LandingPage />} /> {/* Landing page */}
                <Route path="/navbar" element={<Navbar />} /> {/* Navbar */}
                <Route path="/admin" element={<AdminDashboard />} /> {/* Admin Dashboard */}
                <Route path="/manage-incidents" element={<ManageIncidents />} /> {/* Manage Incidents */}
                <Route path="/create-incident" element={<CreateIncident />} /> {/* Create Incident */}
                <Route path="/contact" element={<ContactPage />} /> {/* Contact Page */}
              </Routes>
              <Footer /> {/* Footer */}
            </div>
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
