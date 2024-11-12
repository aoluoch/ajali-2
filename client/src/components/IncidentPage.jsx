import React, { useState, useEffect } from 'react';
import IncidentCard from './IncidentCard';
import Filters from './Filters';
import IncidentMap from './MapSection';

// Main component for managing and displaying incidents
/* Instructions to backend team:
    1. Implement the endpoint at '/api/incidents' to provide a list of incidents.
    2. Each incident should include "title", "description", "status", "mediaUrls", "latitude", and "longitude".
    3. Accept optional query parameters for filtering incidents based on proximity or status (e.g., 'Recent' or 'Resolved').*/

const IncidentPage = () => {
  const [incidents, setIncidents] = useState([]);
  const [filter, setFilter] = useState('Recent');

  // Fetch incidents from backend when component mounts or filter changes
  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        // Fetch data from backend and apply selected filter
        const response = await fetch(`/api/incidents?filter=${filter}`);
        const data = await response.json();
        setIncidents(data);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      }
    };

    fetchIncidents();
  }, [filter]);

  return (
    <div className="p-4">
      {/* Render filtering options */}
      <Filters setFilter={setFilter} />

      {/* Render map showing incident locations */}
      <IncidentMap incidents={incidents} />

      {/* Render a list of incident cards */}
      <div className="incident-list mt-4">
        {incidents.map((incident) => (
          <IncidentCard key={incident.id} incident={incident} />
        ))}
      </div>
    </div>
  );
};

export default IncidentPage;
