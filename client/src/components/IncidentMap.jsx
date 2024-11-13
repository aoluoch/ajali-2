import React, { useEffect, useRef } from 'react';
import L from 'leaflet';

const IncidentMap = ({ incidents }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initializing the map
    const map = L.map(mapRef.current).setView([0, 0], 13); // Default center (we can update later)
    
    // Adding OpenStreetMap tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Adding markers for incidents
    incidents.forEach(incident => {
      L.marker([incident.latitude, incident.longitude])
        .addTo(map)
        .bindPopup(`<b>${incident.title}</b><br>${incident.description}`);
    });

    // Fitting map bounds to include all markers
    const bounds = incidents.map(incident => [incident.latitude, incident.longitude]);
    map.fitBounds(bounds);
  }, [incidents]);

  return <div ref={mapRef} style={{ height: '400px', width: '100%' }}></div>;
};

export default IncidentMap;
