import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncidents } from '../store/slices/incidentSlice';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import RecentIncidents from '../components/RecentIncidents';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import StatusBadge from '../components/StatusBadge';
import Container from '../components/Container';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import { PlusCircle } from 'lucide-react';

function HomePage() {
  const dispatch = useDispatch();
  const { incidents, error, loadingStates } = useSelector((state) => state.incidents);
  const { user } = useSelector((state) => state.auth);
  const isLoading = loadingStates.fetchIncidents;

  useEffect(() => {
    dispatch(fetchIncidents());
  }, [dispatch]);

  if (error) return <ErrorMessage message={error} />;

  return (
    <Container className="py-6 sm:py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.username || 'User'}!
        </h1>
        <p className="text-gray-600">
          Here's an overview of all reported incidents.
        </p>
      </div>

      {/* Loading indicator that doesn't block content */}
      {isLoading && (
        <div className="fixed top-20 right-6 bg-white rounded-full p-2 shadow-lg z-50">
          <LoadingSpinner size="sm" />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Map View */}
        <Card
          title="Incident Map"
          className="h-full"
          action={
            <Link
              to="/create-incident"
              className="text-sm text-primary-600 hover:text-primary-700 flex items-center"
            >
              <PlusCircle className="h-4 w-4 mr-1" />
              Report
            </Link>
          }
        >
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
                      <Link
                        to={`/incident-details/${incident.id}`}
                        className="text-xs text-primary-600 hover:text-primary-700 mt-2 inline-block"
                      >
                        View details
                      </Link>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </Card>

        {/* Recent Incidents */}
        <Card title="Recent Incidents">
          <RecentIncidents />
        </Card>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <Card className="text-center py-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Total Incidents</h3>
          <p className="text-3xl font-bold text-primary-600">
            {incidents.length}
          </p>
        </Card>
        <Card className="text-center py-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Under Investigation</h3>
          <p className="text-3xl font-bold text-blue-600">
            {incidents.filter(i => i.status === 'under investigation').length}
          </p>
        </Card>
        <Card className="text-center py-6">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Resolved</h3>
          <p className="text-3xl font-bold text-green-600">
            {incidents.filter(i => i.status === 'resolved').length}
          </p>
        </Card>
      </div>
    </Container>
  );
}

export default HomePage;
