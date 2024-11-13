import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <Routes>
        {/* Route for the landing page */}
        <Route path="/LandingPage" element={<LandingPage />} />

        {/* Route for the login page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;

