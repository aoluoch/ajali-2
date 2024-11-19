import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

function Manageincidents() {
  const [incidents, setIncidents] = useState([]);
  const [media, setMedia] = useState({ images: {}, videos: {} });
  const [loading, setLoading] = useState(true);
  const [change,setchange] = useState("resolved")
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all incidents
        const incidentsResponse = await axios.get('http://127.0.0.1:5000/incidents', {
          withCredentials: true,
        });
        const fetchedIncidents = incidentsResponse.data;

        // Fetch images and videos for each incident
        const mediaPromises = fetchedIncidents.map(async (incident) => {
          const imagesResponse = await axios.get(
            `http://127.0.0.1:5000/incidents/${incident.id}/images`,
            { withCredentials: true }
          );
          const videosResponse = await axios.get(
            `http://127.0.0.1:5000/incidents/${incident.id}/videos`,
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
        setMedia({ images, videos });
      } catch (err) {
        console.error('Error fetching incidents and media:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleStatusChange = (id, newStatus) => {
    // Update the status on the backend
    fetch(`http://127.0.0.1:5000/incidents/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) => {
        // If the backend update is successful, update the status locally in the UI
        setIncidents((prevIncidents) =>
          prevIncidents.map((incident) =>
            incident.id === id ? { ...incident, status: newStatus } : incident
          )
        );
        console.log('Status updated:', data);
      })
      .catch((error) => console.error('Error updating status:', error));
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:5000/incidents/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        // Remove the incident from the local state
        setIncidents((prevIncidents) =>
          prevIncidents.filter((incident) => incident.id !== id)
        );
        console.log('Incident deleted:', data);
      })
      .catch((error) => console.error('Error deleting incident:', error));
  };

  return (
    <>
    <Navbar/>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Incident Management</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {incidents.map((incident) => (
            <div
              key={incident.id}
              className="p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300 ease-in-out"
            >
              {/* Incident Title and Description */}
              <Link to={`/incident/${incident.id}`} className="text-blue-600 font-semibold text-lg">
                <h2>{incident.description}</h2>
              </Link>
              <p className="text-gray-600 text-sm">{incident.created_at}</p>

              {/* Media Section: Images and Videos */}
              <div className="mt-4">
                {media.images[incident.id] && media.images[incident.id].length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold">Images</h3>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {media.images[incident.id].map((image, index) => (
                        <img
                          key={index}
                          src={image.image_url}
                          alt={`incident-${incident.id}-image-${index}`}
                          className="w-full h-32 object-cover rounded-md"
                        />
                      ))}
                    </div>
                  </div>
                )}

                {media.videos[incident.id] && media.videos[incident.id].length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">Videos</h3>
                    <div className="space-y-2">
                      {media.videos[incident.id].map((video, index) => (
                        <div key={index}>
                          <video controls className="w-full h-32 object-cover rounded-md">
                            <source src={video.video_url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Status Update Dropdown */}
              <div className="mt-4">
                <label className="block text-sm font-medium">Change Status:</label>
                <select
                  value={incident.status}
                  onChange={(e) => (e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md mt-2"
                >
                  <option value="under investigation">Under Investigation</option>
                  <option value="rejected">Rejected</option>
                  <option value="resolved">Resolved</option>
                </select>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-4">
                <button
                  onClick={() => handleDelete(incident.id)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md text-sm hover:bg-red-600"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div> 
    </>
  );
}

export default Manageincidents;
