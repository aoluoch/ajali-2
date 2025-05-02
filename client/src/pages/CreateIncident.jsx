import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { createIncident, fetchIncidentById, updateIncident } from '../store/slices/incidentSlice';
import Button from '../components/Button';
import Input from '../components/Input';
import ErrorMessage from '../components/ErrorMessage';
import LoadingSpinner from '../components/LoadingSpinner';

function LocationPicker({ setPosition }) {
  useMapEvents({
    click: (e) => {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

function CreateIncident() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams(); // Get the incident ID from URL if editing
  const { loadingStates, error, currentIncident } = useSelector((state) => state.incidents);

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState([0, 0]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const formRef = useRef(null);

  // Fetch incident data if editing
  useEffect(() => {
    if (id) {
      setIsEditing(true);
      dispatch(fetchIncidentById(id))
        .unwrap()
        .then(incident => {
          setDescription(incident.description || '');
          setPosition([incident.latitude || 0, incident.longitude || 0]);
          // Note: We can't populate the file inputs with existing files
          // due to security restrictions, but we can show existing images
          if (incident.images && incident.images.length > 0) {
            const imagePreviews = incident.images.map(img => img.image_url);
            setImagePreview(imagePreviews);
          }
        })
        .catch(err => {
          console.error('Failed to fetch incident:', err);
          navigate('/dashboard');
        });
    }
  }, [id, dispatch, navigate]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    // Create image previews
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideos(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!description.trim()) {
      dispatch({ type: 'incidents/setError', payload: 'Description is required' });
      return;
    }

    // Validate coordinates
    if (position[0] === 0 && position[1] === 0) {
      dispatch({ type: 'incidents/setError', payload: 'Please select a location on the map' });
      return;
    }

    try {
      if (isEditing && id) {
        // For editing, we'll use a JSON payload instead of FormData
        // since we're not handling file uploads in the edit endpoint
        const data = {
          description,
          latitude: position[0],
          longitude: position[1]
        };

        await dispatch(updateIncident({ id, data })).unwrap();
        navigate(`/incident-details/${id}`);
      } else {
        // For creating, use FormData to handle file uploads
        const formData = new FormData();
        formData.append('description', description);
        formData.append('latitude', position[0].toString());
        formData.append('longitude', position[1].toString());

        images.forEach((image) => {
          formData.append('images', image);
        });

        videos.forEach((video) => {
          formData.append('videos', video);
        });

        const result = await dispatch(createIncident(formData)).unwrap();
        navigate(`/incident-details/${result.id}`);
      }
    } catch (err) {
      // Error is handled by the reducer
      console.error(`Failed to ${isEditing ? 'update' : 'create'} incident:`, err);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">
          {isEditing ? 'Edit Incident' : 'Report an Incident'}
        </h1>
        <Button
          variant="secondary"
          onClick={() => navigate(isEditing ? `/incident-details/${id}` : '/dashboard')}
          className="text-sm"
        >
          Cancel
        </Button>
      </div>

      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
            rows="4"
            placeholder="Describe the incident in detail..."
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium">Location (Click on map to set)</label>
          <div className="h-[250px] sm:h-[400px] w-full rounded-lg overflow-hidden border relative z-0">
            <MapContainer
              center={position[0] !== 0 ? position : [0, 0]}
              zoom={position[0] !== 0 ? 13 : 2}
              className="h-full w-full"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              <LocationPicker setPosition={setPosition} />
              {position && <Marker position={position} />}
            </MapContainer>
          </div>
          <div className="text-xs sm:text-sm text-gray-600">
            Selected coordinates: {position[0].toFixed(6)}, {position[1].toFixed(6)}
          </div>
        </div>

        {!isEditing && (
          <>
            <div className="space-y-2">
              <label className="block text-sm font-medium">Images</label>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="w-full text-sm sm:text-base"
              />
              {imagePreview.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4 mt-2">
                  {imagePreview.map((src, index) => (
                    <img
                      key={index}
                      src={src}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 sm:h-32 object-cover rounded"
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Videos</label>
              <Input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoChange}
                className="w-full text-sm sm:text-base"
              />
              {videos.length > 0 && (
                <div className="text-xs sm:text-sm text-gray-600">
                  {videos.length} video(s) selected
                </div>
              )}
            </div>
          </>
        )}

        {isEditing && imagePreview.length > 0 && (
          <div className="space-y-2">
            <label className="block text-sm font-medium">Existing Images</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4">
              {imagePreview.map((src, index) => (
                <img
                  key={index}
                  src={src}
                  alt={`Image ${index + 1}`}
                  className="w-full h-24 sm:h-32 object-cover rounded"
                />
              ))}
            </div>
            <p className="text-xs text-gray-500">
              Note: To add or remove images, please contact support.
            </p>
          </div>
        )}

        {error && <ErrorMessage message={error} />}

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loadingStates.createIncident || loadingStates.updateIncident}
            className="w-full sm:w-auto"
          >
            {loadingStates.createIncident || loadingStates.updateIncident ? (
              <LoadingSpinner />
            ) : (
              isEditing ? 'Save Changes' : 'Submit Report'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default CreateIncident;
