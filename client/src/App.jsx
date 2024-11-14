import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './Admin';
import ContactForm from './ContactPage'; // Import the ContactPage component
import Settings from './Settings'; // Import the Settings component
import Notifications from './Notifications';
import ManageIncidents from './Manageincidents';
import IncidentReports from './Incidentreport';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Admin />} /> 
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/manage-incidents" element={<ManageIncidents/>} />
        <Route path="/incident-reports" element={<IncidentReports />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/settings" element={<Settings />} /> 
        {/* Add other routes for different pages if needed */}
      </Routes>
    </Router>
  );
};

export default App;
