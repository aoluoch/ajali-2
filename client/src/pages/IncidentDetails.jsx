import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncidentById, deleteIncident } from '../store/slices/incidentSlice';
import { MapPin, Clock, User, ArrowLeft, Edit2, AlertTriangle, Trash2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import StatusBadge from '../components/StatusBadge';
import Button from '../components/Button';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ConfirmDialog from '../components/ConfirmDialog';

const IncidentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const { currentIncident, error } = useSelector((state) => state.incidents);
  const { user } = useSelector((state) => state.auth);
  const isLoading = useSelector((state) => state.incidents.loadingStates.fetchIncidentById);
  const deleteLoading = useSelector((state) => state.incidents.loadingStates.deleteIncident);

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    if (!deleteLoading) {
      setIsDeleteDialogOpen(false);
    }
  };

  const handleDelete = async () => {
    try {
      await dispatch(deleteIncident(id)).unwrap();
      navigate('/dashboard', { replace: true });
    } catch (err) {
      console.error('Failed to delete incident:', err);
      closeDeleteDialog();
    }
  };

  useEffect(() => {
    dispatch(fetchIncidentById(id));
  }, [dispatch, id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  if (!currentIncident) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Incident not found. It may have been deleted or you don't have permission to view it.
              </p>
            </div>
          </div>
        </div>
        <Button
          variant="secondary"
          onClick={() => navigate(-1)}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      {deleteLoading && (
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-6">
          <div className="flex">
            <div className="flex-shrink-0">
              <LoadingSpinner size="sm" className="text-blue-500" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                Deleting incident... Please wait.
              </p>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={handleDelete}
        title="Delete Incident"
        message="Are you sure you want to delete this incident? This action cannot be undone."
        confirmText="Delete Incident"
        cancelText="Cancel"
        confirmVariant="danger"
        isLoading={deleteLoading}
      />

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex flex-wrap justify-between items-start gap-4 mb-4">
            <h1 className="text-2xl font-bold text-gray-900 flex-grow">
              Incident Report #{currentIncident.id}
            </h1>
            <StatusBadge status={currentIncident.status} size="lg" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Details</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Description</h3>
                  <p className="mt-1 text-gray-900">{currentIncident.description}</p>
                </div>

                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-primary-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Reported on</h3>
                    <p className="text-gray-900">{formatDate(currentIncident.created_at)}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <User className="h-5 w-5 text-primary-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Reported by</h3>
                    <p className="text-gray-900">{currentIncident.username || 'Anonymous'}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-primary-500 mr-2" />
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Location</h3>
                    <p className="text-gray-900">
                      {`${currentIncident.latitude.toFixed(6)}, ${currentIncident.longitude.toFixed(6)}`}
                    </p>
                  </div>
                </div>
              </div>

              {(user?.id === currentIncident.user_id || user?.is_admin) && (
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link to={`/edit-incident/${currentIncident.id}`}>
                    <Button
                      variant="secondary"
                      className="flex items-center"
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit Incident
                    </Button>
                  </Link>

                  <Button
                    variant="danger"
                    onClick={openDeleteDialog}
                    className="flex items-center"
                    disabled={deleteLoading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Incident
                  </Button>
                </div>
              )}
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-4">Location</h2>
              <div className="h-[300px] rounded-lg overflow-hidden relative z-0">
                <MapContainer
                  center={[currentIncident.latitude, currentIncident.longitude]}
                  zoom={13}
                  className="h-full w-full"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <Marker position={[currentIncident.latitude, currentIncident.longitude]}>
                    <Popup>
                      <div>
                        <h3 className="font-medium">Incident #{currentIncident.id}</h3>
                        <p className="text-sm mt-1">{currentIncident.description}</p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            </div>
          </div>

          {currentIncident.images && currentIncident.images.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Images</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {currentIncident.images.map((image, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <img
                      src={image.image_url}
                      alt={`Incident ${currentIncident.id} - Image ${index + 1}`}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentIncident.videos && currentIncident.videos.length > 0 && (
            <div className="mt-8">
              <h2 className="text-lg font-semibold mb-4">Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentIncident.videos.map((video, index) => (
                  <div key={index} className="rounded-lg overflow-hidden shadow-md">
                    <video
                      src={video.video_url}
                      controls
                      className="w-full h-auto"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IncidentDetails;
