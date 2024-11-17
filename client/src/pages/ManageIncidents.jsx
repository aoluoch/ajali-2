import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Manageincidents() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/incidents')
      .then((response) => response.json())
      .then((data) => {
        setIncidents(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching incidents:', error);
        setLoading(false);
      });
  }, []);

  const handleStatusChange = (id, newStatus) => {
    fetch(`http://127.0.0.1:5000/incidents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Update the status locally
        setIncidents((prevIncidents) =>
          prevIncidents.map((incident) =>
            incident.id === id ? { ...incident, status: newStatus } : incident
          )
        );
        console.log('Status updated:', data);
      })
      .catch((error) => console.error('Error updating status:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/incidents/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Remove the incident from the local state
        setIncidents((prevIncidents) =>
          prevIncidents.filter((incident) => incident.id !== id)
        );
        console.log('Incident deleted:', data);
      })
      .catch((error) => console.error('Error deleting incident:', error));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incidents</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-4">
          {incidents.map((incident) => (
            <li
              key={incident.id}
              className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-100"
            >
              <Link to={`/incident/${incident.id}`} className="text-blue-500">
                <h2 className="text-lg font-semibold">{incident.description}</h2>
                <p>Status: {incident.status}</p>
              </Link>

              {/* Status Update Dropdown */}
              <div className="mt-2">
                <label className="mr-2">Change Status:</label>
                <select
                  value={incident.status}
                  onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                  className="border p-1 rounded"
                >
                  <option value="under investigation">Under Investigation</option>
                  <option value="reject">Rejected</option>
                  <option value="resolve">Resolved</option>
                </select>
              </div>

              {/* Edit and Delete Icons */}
              <div className="mt-2 flex space-x-2">
                <button
                  onClick={() => handleStatusChange(incident.id, 'resolved')}
                  className="text-green-500 hover:text-green-700"
                >
                  ✅ Resolve
                </button>
                <button
                  onClick={() => handleDelete(incident.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  🗑️ Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Manageincidents;
