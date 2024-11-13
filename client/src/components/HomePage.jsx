import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Carousel } from 'react-responsive-carousel'; // Import a simple carousel component for media gallery
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel CSS
import Header from './Header';

const HomePage = () => {
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  // Dummy incident data with media gallery items (images and videos) and updated Nairobi locations
  const incidents = [
    {
      id: 1,
      title: "Accident on Uhuru Highway",
      description: "A vehicle crashed into a pole.",
      status: "Under Investigation",
      location: [-1.286389, 36.817223], // Uhuru Highway, Nairobi
      media: [
        { type: "image", src: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg" },
        { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
      ],
    },
    {
      id: 2,
      title: "Fire in Kenyatta Market",
      description: "A large fire broke out in the Kenyatta Market area.",
      status: "Resolved",
      location: [-1.282379, 36.832275], 
      media: [
        { type: "image", src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" },
        { type: "image", src: "https://images.pexels.com/photos/256701/pexels-photo-256701.jpeg" },
      ],
    },
    {
      id: 3,
      title: "Flooding in Lang'ata",
      description: "Flooding caused by heavy rain in Lang'ata area.",
      status: "Rejected",
      location: [-1.302040, 36.798240], 
      media: [
        { type: "image", src: "https://images.pexels.com/photos/460621/pexels-photo-460621.jpeg" },
        { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
      ],
    },
    {
      id: 4,
      title: "Power Outage in Westlands",
      description: "A blackout affecting multiple blocks in Westlands.",
      status: "Under Investigation",
      location: [-1.237659, 36.812103], 
      media: [
        { type: "image", src: "https://images.pexels.com/photos/705868/pexels-photo-705868.jpeg" },
        { type: "image", src: "https://images.pexels.com/photos/735978/pexels-photo-735978.jpeg" },
      ],
    },
  ];

  // Filter incidents based on selection and search query
  const filteredIncidents = incidents.filter((incident) => {
    // Check if the incident's status matches the selected filter
    const matchesStatus = filter === "All" || incident.status === filter;

    // Check if the incident title contains the search query (case insensitive)
    const matchesSearchQuery = incident.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesSearchQuery;
  });

  return (
    <div className="p-6">
      {/* Search Bar */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <input
          type="text"
          placeholder="Search incidents by title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md w-full sm:w-2/3 md:w-1/2 lg:w-1/3"
        />
      </div>

      {/* Filter Dropdown */}
      <div className="flex justify-between items-center mb-6 flex-wrap">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="bg-white border border-gray-300 text-gray-700 py-2 px-4 rounded-md w-full sm:w-1/3"
        >
          <option value="All">All</option>
          <option value="Under Investigation">Under Investigation</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Incident Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="bg-white p-6 rounded-md shadow-lg">
            {/* Incident Overview */}
            <h3 className="text-xl font-semibold mb-2">{incident.title}</h3>
            <p className="text-gray-700 mb-2">{incident.description}</p>
            <div
              className={`inline-block px-3 py-1 text-white rounded-md mb-4 ${
                incident.status === "Resolved" ? "bg-green-500" :
                incident.status === "Under Investigation" ? "bg-yellow-500" :
                "bg-red-500"
              }`}
            >
              {incident.status}
            </div>

            {/* Media Gallery Carousel */}
            <Carousel showThumbs={false} dynamicHeight={true} className="mb-4">
              {incident.media.map((item, index) => (
                <div key={index}>
                  {item.type === "image" ? (
                    <img src={item.src} alt="Incident media" className="w-full h-48 object-cover rounded-md" />
                  ) : (
                    <video controls className="w-full h-48 rounded-md">
                      <source src={item.src} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
              ))}
            </Carousel>

            {/* Map for Incident Location */}
            <MapContainer center={incident.location} zoom={13} style={{ height: '200px' }} className="rounded-md shadow-md">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={incident.location}>
                <Popup>{incident.title}</Popup>
              </Marker>
            </MapContainer>
          </div>
        ))}
      </div>

      {/* Map Displaying All Incident Locations */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Map of All Incidents</h2>
        <MapContainer center={[-1.286389, 36.817223]} zoom={12} style={{ height: '400px' }} className="rounded-md shadow-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {incidents.map((incident) => (
            <Marker key={incident.id} position={incident.location}>
              <Popup>
                <strong>{incident.title}</strong><br />
                {incident.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
}

export default HomePage;
