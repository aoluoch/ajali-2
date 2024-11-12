// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import IncidentReportPage from './components/IncidentReportPage';

const App = () => {
    const [page, setPage] = useState('dashboard');
    const incidents = []; // Placeholder for incident data

    return (
        <Router>
            <Header username="John Doe" />
            <div className="flex">
                <Sidebar onNavigate={setPage} />
                <main className="flex-grow">
                    {page === 'dashboard' && <Dashboard incidents={incidents} />}
                    {page === 'newIncident' && <IncidentReportPage />}
                    {/* Add routes for additional pages */}
                </main>
            </div>
        </Router>
    );
};

export default App;
