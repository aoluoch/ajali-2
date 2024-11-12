// IncidentReportPage.jsx
import React, { useState } from 'react';

const IncidentReportPage = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [location, setLocation] = useState({ lat: '', lng: '' });

    const handleSubmit = () => {
        // Trigger backend API to save the incident
    };

    return (
        <div className="p-4">
            <h2>Create New Incident</h2>
            <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="">Select Type</option>
                <option value="Red Flag">Red Flag</option>
                <option value="Intervention">Intervention</option>
            </select>
            {/* File Upload and Geolocation Inputs */}
            <button onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default IncidentReportPage;
