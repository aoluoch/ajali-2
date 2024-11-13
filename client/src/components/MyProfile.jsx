import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const MyProfile = () => {
  const [user] = useState({
    name: "Pauline Nguru",
    email: "pauline.nguru@student.moringaschool.com",
    profilePicture: "https://images.pexels.com/photos/11293756/pexels-photo-11293756.jpeg", // Placeholder profile image URL
  });

  const [incidents, setIncidents] = useState([
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
      location: [-1.282379, 36.832275], // Kenyatta Market, Nairobi
      media: [
        { type: "image", src: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg" },
        { type: "image", src: "https://images.pexels.com/photos/256701/pexels-photo-256701.jpeg" },
      ],
    },
    {
      id: 3,
      title: "Flooding in South C",
      description: "Heavy rain caused flooding in the South C area.",
      status: "Under Investigation",
      location: [-1.319824, 36.825903], // South C, Nairobi
      media: [
        { type: "image", src: "https://images.pexels.com/photos/753626/pexels-photo-753626.jpeg" },
        { type: "image", src: "https://images.pexels.com/photos/753627/pexels-photo-753627.jpeg" },
      ],
    },
    {
      id: 4,
      title: "Power Outage in CBD",
      description: "Widespread power outage affecting Nairobi CBD.",
      status: "Resolved",
      location: [-1.28333, 36.81667], // Nairobi CBD
      media: [
        { type: "image", src: "https://images.pexels.com/photos/1254519/pexels-photo-1254519.jpeg" },
        { type: "video", src: "https://www.w3schools.com/html/mov_bbb.mp4" },
      ],
    },
  ]);

  
  const handleEdit = (id) => {
    // Find the incident by ID
    const incidentToEdit = incidents.find(incident => incident.id === id);
    
    // Log the selected incident details for editing
    console.log("Edit incident:", incidentToEdit);

    // You can implement logic here to open an edit form, modal, or redirect to an edit page
  };

  const handleDelete = (id) => {
    // Logic for deleting an incident by ID
    setIncidents(incidents.filter(incident => incident.id !== id));
    console.log("Deleted incident:", id);
  };

  return (
    <div className="p-6">
      {/* Profile Section */}
      <div className="mb-6 text-center">
        {user.profilePicture && (
          <img
            src={user.profilePicture}
            alt="Profile"
            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
          />
        )}
        <h1 className="text-3xl font-semibold mb-2">{user.name}</h1>
        <p className="text-gray-600 mb-4">{user.email}</p>
      </div>

      {/* Incident Dashboard */}
      <h2 className="text-2xl font-semibold mb-4">My Reported Incidents</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {incidents.map((incident) => (
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
            <MapContainer center={incident.location} zoom={13} style={{ height: '200px' }} className="rounded-md shadow-md mb-4">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={incident.location}>
                <Popup>{incident.title}</Popup>
              </Marker>
            </MapContainer>

            {/* Edit and Delete Buttons */}
            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => handleEdit(incident.id)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(incident.id)}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
