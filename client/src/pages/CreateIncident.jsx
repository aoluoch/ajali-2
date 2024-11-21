import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

const CreateIncident = () => {
  const [description, setDescription] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [location, setLocation] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const LocationSetter = () => {
    useMapEvents({
      click(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
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
        style: "bar",
        searchLabel: "Type location here to search...",
        autoClose: true,
        showMarker: true,
        keepResult: true,
      });
      map.addControl(searchControl);

      map.on("geosearch/showlocation", (result) => {
        const { x: lng, y: lat } = result.location;
        setLocation([lat, lng]);
      });

      return () => map.removeControl(searchControl);
    }, [map]);
    return null;
  };

  const handleAddMedia = (event) => {
    const files = Array.from(event.target.files);
    setMediaFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const handleRemoveMedia = (index) => {
    setMediaFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const handleIncidentTypeChange = (event) => {
    setIncidentType(event.target.value);
    console.log("Selected Incident Type:", event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!description || !incidentType || !mediaFiles.length || !location) {
      setErrorMessage("All fields are required.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("description", description);
    formData.append("incidentType", incidentType);
    formData.append("latitude", location[0]);
    formData.append("longitude", location[1]);
    mediaFiles.forEach((file) => formData.append("media", file));

    try {
      const response = await axios.post("http://127.0.0.1:5000/incidents", formData, {
        withCredentials: true, // Ensure cookies are sent with the request
      });
      console.log("Incident created:", response.data);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Error submitting incident:", error.response?.data || error.message);
      setErrorMessage("Failed to submit incident. Please try again.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6 text-center sm:text-left">Create New Incident</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Provide details about the incident"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="incidentType" className="block text-lg font-medium text-gray-700">
            Incident Type <span className="text-red-500">*</span>
          </label>
          <select
                        id="incidentType"
                        value={incidentType}
                        onChange={handleIncidentTypeChange}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      >
                        <option value="" disabled>Select Incident Type</option>
                        <option value="Red Flag">Red Flag</option>
                        <option value="Intervention">Intervention</option>
                      </select>
                    </div>
            
                    <div className="mb-4">
                      <label htmlFor="media" className="block text-lg font-medium text-gray-700">
                        Media Attachments <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="file"
                        id="media"
                        multiple
                        accept="image/*,video/*"
                        onChange={handleAddMedia}
                        className="w-full p-3 border border-gray-300 rounded-md"
                        required
                      />
                      <div className="mt-2 flex flex-wrap gap-4">
                        {mediaFiles.map((file, index) => (
                          <div key={index} className="relative">
                            {file.type.startsWith("image/") ? (
                              <img
                                src={URL.createObjectURL(file)}
                                alt="Preview"
                                className="w-32 h-32 object-cover rounded-md"
                              />
                            ) : (
                              <video
                                src={URL.createObjectURL(file)}
                                controls
                                className="w-32 h-32 object-cover rounded-md"
                              />
                            )}
                            <button
                              type="button"
                              onClick={() => handleRemoveMedia(index)}
                              className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                            >
                              X
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
            
                    <div className="mb-4">
                      <label className="block text-lg font-medium text-gray-700">
                        Location <span className="text-red-500">*</span>
                      </label>
                      <MapContainer center={[-1.285573, 36.830845]} zoom={12} style={{ height: "300px", width: "100%" }}>
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        <LocationSetter />
                        <AddGeoSearch />
                        {location && (
                          <Marker position={location}>
                            <Popup>Incident Location</Popup>
                          </Marker>
                        )}
                      </MapContainer>
                    </div>
            
                    <div className="flex justify-center">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-blue-600 text-white p-3 rounded-md"
                      >
                        {isSubmitting ? "Submitting..." : "Create Incident"}
                      </button>
                    </div>
                  </form>
            
                  {errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
                </div>
              );
            };
            
            export default CreateIncident;