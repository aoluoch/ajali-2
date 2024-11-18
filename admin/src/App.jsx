
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import your components
import Admin from './components/Admin';
import Settings from './components/Settings'; // Import the Settings component
import Notifications from './components/Notifications';
import ManageIncidents from './components/ManageIncidents';

const App = () => {
  return (
    <Router>
      <div className="App">
        {/* Define routes here */}
        <Routes>
            <Route path="/" element={<Admin />} /> 
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/manage-incidents" element={<ManageIncidents />} />
            <Route path="/settings" element={<Settings />} /> 
            {/* <Route path="/footer" element={<Footer />} /> If footer is needed */}
  
        </Routes>
      </div>
    </Router>
  );
};

export default App;
