import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // for routing
import Admin from './Admin'; 

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define your routes here */}
        <Route path="/" element={<Admin />} />
        {/* Add other routes for different pages if needed */}
      </Routes>
      
    </Router>
  );
};

export default App;

