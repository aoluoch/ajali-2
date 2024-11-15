import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'; // Import Redux hooks
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import PropTypes from 'prop-types';
import { createIncident } from "../store/slices/incidentSlice"; // Import the createIncident function

const CreateIncident = ({ match }) => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [incidentType, setIncidentType] = useState('Red Flag');
  const [file, setFile] = useState(null);
  const [location, setLocation] = useState([-1.285573, 36.830845]); // Default Moringa School coordinates
  const [manualLat, setManualLat] = useState('');
  const [manualLng, setManualLng] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [incidentId, setIncidentId] = useState(null); // For editing

  const LocationSetter = () => {
    useMapEvents({
      click(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
        setManualLat(e.latlng.lat);
        setManualLng(e.latlng.lng);
      },
    });
    return null;
  };

  const AddGeoSearch = () => {
    const map = useMap();
    useEffect(() => {
      const provider = new OpenStreetMapProvider();
      const searchControl = new GeoSearchControl({
        provider,
        style: 'button',
      });
      map.addControl(searchControl);
      return () => map.removeControl(searchControl);
    }, [map]);
    return null;
  };

  // Fetch incident data for editing
  useEffect(() => {
    if (match && match.params.id) {
      setIsEditing(true);
      setIncidentId(match.params.id); // Get incidentId from URL
      fetch(`http://127.0.0.1:5000/incidents/${match.params.id}`)
        .then(res => res.json())
        .then(data => {
          setTitle(data.title);
          setDescription(data.description);
          setIncidentType(data.incidentType);
          setLocation(data.location); // Ensure you set the correct location
          setManualLat(data.location[0]);
          setManualLng(data.location[1]);
        })
        .catch(err => console.error('Error fetching incident:', err));
    }
  }, [match]);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = {
      title,
      description,
      incidentType,
      latitude: manualLat,
      longitude: manualLng,
      file
    };

    if (isEditing) {
      // Call the edit incident action here
      console.log('Editing incident...');
    } else {
      // Dispatch the createIncident action with the form data
      dispatch(createIncident(incidentId, formData))
        .then(() => {
          setIsSubmitting(false);
        })
        .catch(() => {
          setErrorMessage('Error while submitting the form');
          setIsSubmitting(false);
        });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center sm:text-left">{isEditing ? 'Edit Incident' : 'Create New Incident'}</h1>
      <form onSubmit={handleSubmit}>
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-base sm:text-lg"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-base sm:text-lg"
            required
          />
        </div>

        {/* Incident Type */}
        <div className="mb-4">
          <label htmlFor="incidentType" className="block text-lg font-medium text-gray-700">Incident Type</label>
          <select
            id="incidentType"
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md text-base sm:text-lg"
          >
            <option value="Red Flag">Red Flag</option>
            <option value="Intervention">Intervention</option>
          </select>
        </div>

        {/* Attachments */}
        <div className="mb-4">
          <label htmlFor="file" className="block text-lg font-medium text-gray-700">Attachment (Image/Video)</label>
          <input
            type="file"
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-3 border border-gray-300 rounded-md text-base sm:text-lg"
          />
        </div>

        {/* Map */}
        <div className="mb-6">
          <MapContainer center={location} zoom={12} style={{ height: '300px', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationSetter />
            <AddGeoSearch />
            <Marker position={location}>
              <Popup>Incident Location</Popup>
            </Marker>
          </MapContainer>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center sm:justify-between">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto bg-blue-600 text-white p-3 rounded-md text-lg"
          >
            {isSubmitting ? 'Submitting...' : isEditing ? 'Save Changes' : 'Create Incident'}
          </button>
        </div>
      </form>

      {errorMessage && <div className="text-red-500 mt-4 text-center">{errorMessage}</div>}
    </div>
  );
};

CreateIncident.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string
    })
  })
};

export default CreateIncident;
