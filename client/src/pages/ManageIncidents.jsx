import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { fetchIncidents, updateIncidentStatus, deleteIncident } from '../store/slices/incidentSlice';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import StatusBadge from '../components/StatusBadge';
import ErrorMessage from '../components/ErrorMessage';

function ManageIncidents() {
  const dispatch = useDispatch();
  const { incidents, error } = useSelector((state) => state.incidents);
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  useEffect(() => {
    dispatch(fetchIncidents());
  }, [dispatch]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await dispatch(updateIncidentStatus({ id, status: newStatus })).unwrap();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!showConfirmDelete) {
      setShowConfirmDelete(id);
      return;
    }
    try {
      await dispatch(deleteIncident(id)).unwrap();
      setShowConfirmDelete(false);
    } catch (err) {
      console.error('Failed to delete incident:', err);
    }
  };

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
      <h1 className="text-2xl font-bold mb-6">Manage Incidents</h1>

      <div className="grid lg:grid-cols-2 gap-4 lg:gap-6">
        {/* List View */}
        <div className="space-y-4 order-2 lg:order-1">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="p-3 sm:p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap gap-2 justify-between items-start mb-2">
                <h3 className="font-medium">Incident #{incident.id}</h3>
                <StatusBadge status={incident.status} />
              </div>
              
              <p className="text-gray-600 mb-4 text-sm sm:text-base">{incident.description}</p>
              
              {incident.images?.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                  {incident.images.map((image, index) => (
                    <img
                      key={index}
                      src={image.image_url}
                      alt={`Evidence ${index + 1}`}
                      className="w-full h-20 sm:h-24 object-cover rounded"
                    />
                  ))}
                </div>
              )}
              
              {incident.videos?.length > 0 && (
                <div className="mb-4 space-y-2">
                  {incident.videos.map((video, index) => (
                    <video
                      key={index}
                      src={video.video_url}
                      controls
                      className="w-full rounded"
                    />
                  ))}
                </div>
              )}

              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={incident.status}
                  onChange={(e) => handleStatusChange(incident.id, e.target.value)}
                  className="px-2 py-1 text-sm border rounded flex-grow sm:flex-grow-0"
                >
                  <option value="under investigation">Under Investigation</option>
                  <option value="resolved">Resolved</option>
                  <option value="rejected">Rejected</option>
                </select>

                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                  <Button
                    onClick={() => setSelectedIncident(incident)}
                    variant="secondary"
                    className="text-sm px-3 py-1"
                  >
                    View on Map
                  </Button>

                  {showConfirmDelete === incident.id ? (
                    <>
                      <Button
                        onClick={() => handleDelete(incident.id)}
                        variant="danger"
                        className="text-sm px-3 py-1"
                      >
                        Confirm
                      </Button>
                      <Button
                        onClick={() => setShowConfirmDelete(false)}
                        variant="secondary"
                        className="text-sm px-3 py-1"
                      >
                        Cancel
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={() => handleDelete(incident.id)}
                      variant="danger"
                      className="text-sm px-3 py-1"
                    >
                      Delete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Map View */}
        <div className="h-[300px] sm:h-[400px] lg:h-[600px] bg-gray-100 rounded-lg overflow-hidden order-1 lg:order-2 sticky top-20 z-0">
          <MapContainer
            center={[0, 0]}
            zoom={2}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {incidents.map((incident) => (
              <Marker
                key={incident.id}
                position={[incident.latitude, incident.longitude]}
              >
                <Popup>
                  <div>
                    <h3 className="font-medium">Incident #{incident.id}</h3>
                    <StatusBadge status={incident.status} />
                    <p className="text-sm mt-2">{incident.description}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}

export default ManageIncidents;
