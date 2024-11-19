import React, { useEffect, useState } from "react";
import axios from "axios";

function Incidents() {
  const [incidents, setIncidents] = useState([]);
  const [filteredIncidents, setFilteredIncidents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterState, setFilterState] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [media, setMedia] = useState({ images: {}, videos: {} });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all incidents
        const incidentsResponse = await axios.get("http://localhost:5000/incidents", {
          withCredentials: true,
        });
        const fetchedIncidents = incidentsResponse.data;

        // Fetch images and videos for each incident
        const mediaPromises = fetchedIncidents.map(async (incident) => {
          const imagesResponse = await axios.get(
            `http://localhost:5000/incidents/${incident.id}/images`,
            { withCredentials: true }
          );
          const videosResponse = await axios.get(
            `http://localhost:5000/incidents/${incident.id}/videos`,
            { withCredentials: true }
          );

          return {
            id: incident.id,
            images: imagesResponse.data,
            videos: videosResponse.data,
          };
        });

        const mediaResults = await Promise.all(mediaPromises);

        const images = {};
        const videos = {};

        mediaResults.forEach((item) => {
          images[item.id] = item.images;
          videos[item.id] = item.videos;
        });

        setIncidents(fetchedIncidents);
        setFilteredIncidents(fetchedIncidents); // Initialize filtered incidents
        setMedia({ images, videos });
      } catch (err) {
        setError("Failed to fetch incidents. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Filter and search functionality
    let updatedIncidents = [...incidents];

    if (filterState !== "all") {
      updatedIncidents = updatedIncidents.filter(
        (incident) => incident.status === filterState
      );
    }

    if (searchQuery) {
      updatedIncidents = updatedIncidents.filter(
        (incident) =>
          incident.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (`Incident ${incident.id}`).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredIncidents(updatedIncidents);
  }, [filterState, searchQuery, incidents]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-700 font-bold text-xl">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <p className="text-red-700 font-bold text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-red-700 text-white py-4 shadow-md">
        <h1 className="text-center text-3xl font-bold">Incident Reports</h1>
      </header>

      <div className="container mx-auto py-6 px-4">
        {/* Filter and Search Section */}
        <div className="flex flex-wrap items-center justify-between mb-6">
          <select
            className="border border-gray-300 rounded-lg p-2 bg-gray-50"
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="all">All</option>
            <option value="resolved">Resolved</option>
            <option value="under investigation">Under Investigation</option>
            <option value="rejected">Rejected</option>
          </select>

          <input
            type="text"
            placeholder="Search by description or name"
            className="border border-gray-300 rounded-lg p-2 w-full sm:w-auto"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Incident Cards */}
        {filteredIncidents.length === 0 ? (
          <p className="text-center text-gray-600">No incidents found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredIncidents.map((incident) => (
              <div
                key={incident.id}
                className="border border-gray-200 rounded-lg shadow-md p-4 bg-gray-50"
              >
                <h2 className="text-lg font-bold text-red-700">
                  Incident #{incident.id}
                </h2>
                <p className="text-gray-800 mt-2">
                  <strong>Description:</strong> {incident.description}
                </p>
                <p className="text-gray-800 mt-2">
                  <strong>Status:</strong> {incident.status}
                </p>
                <p className="text-gray-800 mt-2">
                  <strong>Latitude:</strong> {incident.latitude}
                </p>
                <p className="text-gray-800 mt-2">
                  <strong>Longitude:</strong> {incident.longitude}
                </p>
                <p className="text-gray-500 mt-4 text-sm">
                  <em>Reported by User ID: {incident.user_id}</em>
                </p>

                {/* Images Section */}
                <div className="mt-4">
                  <h3 className="text-gray-800 font-semibold">Images:</h3>
                  {media.images[incident.id]?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {media.images[incident.id].map((image) => (
                        <img
                          key={image.id}
                          src={image.image_url}
                          alt={`Incident ${incident.id}`}
                          className="h-60 w-[100%] object-cover border border-gray-300 rounded-md"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No images available.</p>
                  )}
                </div>

                {/* Videos Section */}
                <div className="mt-4">
                  <h3 className="text-gray-800 font-semibold">Videos:</h3>
                  {media.videos[incident.id]?.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {media.videos[incident.id].map((video) => (
                        <video
                          key={video.id}
                          controls
                          src={video.video_url}
                          className="w-full h-60 border border-gray-300 rounded-md"
                        />
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">No videos available.</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Incidents;