// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IncidentPage from './components/IncidentPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/incidents" element={<IncidentPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
