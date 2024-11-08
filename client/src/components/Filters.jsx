import React from 'react';

// Component to filter incidents by categories like "Nearby" or "Recent"
/* Instructions to backend team: 
Implement the backend logic to filter incidents by proximity ("Nearby") 
and status ("Recent", "Under Investigation", "Resolved", "Rejected"). 
Expose these filter options as query parameters in the API endpoint.*/

const Filters = ({ setFilter }) => {
  const filters = ['Nearby', 'Recent', 'Under Investigation', 'Resolved', 'Rejected'];

  return (
    <div className="flex space-x-2 mb-4">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => setFilter(filter)}
          className="p-2 bg-blue-500 text-white rounded"
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default Filters;
