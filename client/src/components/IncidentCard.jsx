import React from 'react';

// Component to display individual incident details
// Instructions to backend team: Ensure each incident object returned by the API has "title", "description", "status", and an array "mediaUrls" for any images/videos related to the incident.

const IncidentCard = ({ incident }) => {
  return (
    <div className="p-4 border rounded shadow">
      {/* Display incident title */}
      <h2 className="text-lg font-bold">{incident.title}</h2>

      {/* Display incident description */}
      <p>{incident.description}</p>

      {/* Display incident status with color-coding based on status */}
      <span className={`badge ${incident.status.toLowerCase()}`}>
        {incident.status}
      </span>
      
      {/* Render a gallery for media files (images/videos) associated with the incident */}
      <div className="media-gallery mt-2">
        {incident.mediaUrls && incident.mediaUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt="Incident Media"
            className="w-full h-32 object-cover rounded mt-2"
          />
        ))}
      </div>
    </div>
  );
};

export default IncidentCard;
