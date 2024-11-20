import { useState, useEffect } from "react";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import "leaflet-geosearch/dist/geosearch.css";

const CreateIncident = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [mediaFiles, setMediaFiles] = useState([]);
  const [location, setLocation] = useState(null);
  const [manualCoordinates, setManualCoordinates] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  
  const LocationSetter = () => {
    useMapEvents({
      click(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
        setManualCoordinates(`${e.latlng.lat}, ${e.latlng.lng}`);
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
        setManualCoordinates(`${lat}, ${lng}`);
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

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ajali-default");

    try {
      const response = await axios.post(`https://api.cloudinary.com/v1_1/dhmw4vdgc/upload`, formData);
      return response.data.secure_url;
    } catch (error) {
      console.error("Error uploading file to Cloudinary", error.response?.data || error.message);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!mediaFiles.length) {
      setErrorMessage("Please upload at least one media file.");
      return;
    }
    if (!location) {
      setErrorMessage("Please select a location.");
      return;
    }

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("incidentType", incidentType);
    formData.append("latitude", location[0]);
    formData.append("longitude", location[1]);

    // Upload media to Cloudinary first and get the URLs
    const mediaUrls = [];
    for (const file of mediaFiles) {
      const url = await uploadToCloudinary(file);
      if (url) mediaUrls.push(url);
    }

    if (mediaUrls.length === 0) {
      setErrorMessage("Failed to upload media.");
      setIsSubmitting(false);
      return;
    }

    // Append media files directly to FormData for backend
    mediaFiles.forEach((file) => formData.append("media", file));

    try {
      const response = await axios.post("http://127.0.0.1:5000/incidents", formData);
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
        {/* Title Input */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            placeholder="Enter a short and descriptive title"
            required
          />
        </div>

        {/* Description Input */}
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

        {/* Incident Type */}
        <div className="mb-4">
          <label htmlFor="incidentType" className="block text-lg font-medium text-gray-700">
            Incident Type <span className="text-red-500">*</span>
          </label>
          <select
            id="incidentType"
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            className={`w-full p-3 rounded-md text-white focus:outline-none ${
              !incidentType ? "bg-gray-200" : incidentType === "Red Flag" ? "bg-red-600" : "bg-[#FBC02D]"
            }`}
          >
            <option value="" disabled className="text-gray-500">
              Select Incident Type
            </option>
            <option value="Red Flag" className="text-white">
              Red Flag
            </option>
            <option value="Intervention" className="text-white">
              Intervention
            </option>
          </select>
        </div>

        {/* Media Upload */}
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

        {/* Map and Location Input */}
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

        {/* Submit Button */}
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
