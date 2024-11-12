import React from 'react';

// Component to display a map with incident locations
/* Instructions to backend team: 
Provide incident location data as "latitude" and "longitude" properties within each incident object. 
Ensure this data is accurate and accessible in the /api/incidents endpoint.*/

const MapSection = ({ incidents }) => {
  return (
    <div className="map-container w-full h-64 bg-gray-200">
      <p>Map displaying incident locations will appear here.</p>

      {/* Use latitude and longitude from the backend data to set map markers for each incident */}
    </div>
  );
};

export default MapSection;
