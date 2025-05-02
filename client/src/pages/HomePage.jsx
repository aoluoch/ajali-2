import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncidents } from '../store/slices/incidentSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import RecentIncidents from '../components/RecentIncidents';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import StatusBadge from '../components/StatusBadge';

function HomePage() {
  const dispatch = useDispatch();
  const { incidents, error } = useSelector((state) => state.incidents);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchIncidents());
  }, [dispatch]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.username || 'User'}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of all reported incidents.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Map View */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Incident Map</h2>
          <div className="h-[400px] rounded-lg overflow-hidden relative z-0">
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

        {/* Recent Incidents */}
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Recent Incidents</h2>
          <RecentIncidents incidents={incidents.slice(0, 5)} />
        </div>

        {/* Statistics */}
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">Total Incidents</h3>
            <p className="text-3xl font-bold text-primary-600">
              {incidents.length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">Under Investigation</h3>
            <p className="text-3xl font-bold text-blue-600">
              {incidents.filter(i => i.status === 'under investigation').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-medium mb-2">Resolved</h3>
            <p className="text-3xl font-bold text-green-600">
              {incidents.filter(i => i.status === 'resolved').length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
