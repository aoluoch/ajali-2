import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { createIncident, fetchIncidentById, updateIncident } from '../store/slices/incidentSlice';
import { X } from 'lucide-react';
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
  const { id } = useParams();
  const { loadingStates, error, currentIncident } = useSelector((state) => state.incidents);

  const [isEditing, setIsEditing] = useState(false);
  const [description, setDescription] = useState('');
  const [position, setPosition] = useState([0, 0]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [videoPreview, setVideoPreview] = useState([]);
  const formRef = useRef(null);

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
  const MAX_FILES = 5;

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      dispatch(fetchIncidentById(id))
        .unwrap()
        .then(incident => {
          setDescription(incident.description || '');
          setPosition([incident.latitude || 0, incident.longitude || 0]);
          if (incident.images && incident.images.length > 0) {
            const imagePreviews = incident.images.map(img => img.image_url);
            setImagePreview(imagePreviews);
          }
          if (incident.videos && incident.videos.length > 0) {
            const videoPreviews = incident.videos.map(vid => vid.video_url);
            setVideoPreview(videoPreviews);
          }
        })
        .catch(err => {
          console.error('Failed to fetch incident:', err);
          navigate('/dashboard');
        });
    }
  }, [id, dispatch, navigate]);

  const validateFiles = (files, type) => {
    const errors = [];
    const validTypes = type === 'image' 
      ? ['image/jpeg', 'image/png', 'image/gif'] 
      : ['video/mp4', 'video/quicktime', 'video/x-msvideo'];

    if (files.length > MAX_FILES) {
      errors.push(`You can only upload up to ${MAX_FILES} ${type}s at once`);
    }

    for (const file of files) {
      if (!validTypes.includes(file.type)) {
        errors.push(`${file.name} is not a valid ${type} file`);
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name} exceeds the maximum file size of 10MB`);
      }
    }

    return errors;
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const errors = validateFiles(files, 'image');

    if (errors.length > 0) {
      dispatch({ type: 'incidents/setError', payload: errors.join('\n') });
      return;
    }

    setImages(files);
    setImagePreview(files.map(file => URL.createObjectURL(file)));
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    const errors = validateFiles(files, 'video');

    if (errors.length > 0) {
      dispatch({ type: 'incidents/setError', payload: errors.join('\n') });
      return;
    }

    setVideos(files);
    setVideoPreview(files.map(file => URL.createObjectURL(file)));
  };

  const removeImage = (index) => {
    const newImages = [...images];
    const newPreviews = [...imagePreview];
    URL.revokeObjectURL(newPreviews[index]); // Clean up the URL object
    newImages.splice(index, 1);
    newPreviews.splice(index, 1);
    setImages(newImages);
    setImagePreview(newPreviews);
  };

  const removeVideo = (index) => {
    const newVideos = [...videos];
    const newPreviews = [...videoPreview];
    URL.revokeObjectURL(newPreviews[index]); // Clean up the URL object
    newVideos.splice(index, 1);
    newPreviews.splice(index, 1);
    setVideos(newVideos);
    setVideoPreview(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      dispatch({ type: 'incidents/setError', payload: 'Description is required' });
      return;
    }

    if (position[0] === 0 && position[1] === 0) {
      dispatch({ type: 'incidents/setError', payload: 'Please select a location on the map' });
      return;
    }

    try {
      if (isEditing && id) {
        const data = {
          description,
          latitude: position[0],
          longitude: position[1]
        };
        await dispatch(updateIncident({ id, data })).unwrap();
        navigate(`/incident-details/${id}`);
      } else {
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
      console.error(`Failed to ${isEditing ? 'update' : 'create'} incident:`, err);
    }
  };

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      imagePreview.forEach(url => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
      });
      videoPreview.forEach(url => {
        if (url.startsWith('blob:')) URL.revokeObjectURL(url);
      });
    };
  }, [imagePreview, videoPreview]);

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
              <label className="block text-sm font-medium">Images (Max {MAX_FILES} files, 10MB each)</label>
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
                    <div key={index} className="relative group">
                      <img
                        src={src}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-24 sm:h-32 object-cover rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium">Videos (Max {MAX_FILES} files, 10MB each)</label>
              <Input
                type="file"
                accept="video/*"
                multiple
                onChange={handleVideoChange}
                className="w-full text-sm sm:text-base"
              />
              {videoPreview.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                  {videoPreview.map((src, index) => (
                    <div key={index} className="relative group">
                      <div className="relative rounded-lg overflow-hidden bg-gray-100">
                        <video
                          src={src}
                          controls
                          controlsList="nodownload"
                          preload="metadata"
                          className="w-full rounded aspect-video object-cover"
                          poster={src + '#t=0.1'} // Creates a thumbnail from the first frame
                        >
                          Your browser does not support the video tag.
                        </video>
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-red-600"
                          title="Remove video"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-1 text-sm text-gray-500 truncate">
                        Video {index + 1}
                      </p>
                    </div>
                  ))}
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
