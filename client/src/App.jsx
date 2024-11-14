import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateIncident from "./pages/CreateIncident";
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MyProfile from "./pages/MyProfile";
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Footer from "./components/Footer";


function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-1">
          <Sidebar />
          <div className="flex-1 overflow-auto p-4">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/create-incident" element={<CreateIncident />} />
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/login" element={<Login />} /> {/* If login page is needed */}
              <Route path="/landing" element={<LandingPage />} /> {/* If landing page is needed */}
              {/* <Route path="/footer" element={<Footer />} /> If footer is needed */}
            </Routes>
            <Footer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
