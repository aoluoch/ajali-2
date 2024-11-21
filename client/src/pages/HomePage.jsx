import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Search, Filter, MapPin } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const HomePage = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        // Replace this with your actual API call
        const response = await new Promise((resolve) =>
          setTimeout(
            () =>
              resolve([
                {
                  id: '1',
                  title: 'Incident 1',
                  description: 'Description 1',
                  status: 'Under Investigation',
                  location: [-1.286389, 36.817223],
                  media: [
                    { type: 'image', src: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg' },
                  ],
                },
                {
                  id: '2',
                  title: 'Incident 2',
                  description: 'Description 2',
                  status: 'Resolved',
                  location: [-1.282379, 36.832275],
                  media: [
                    { type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' },
                  ],
                },
              ]),
            1000
          )
        );
        setIncidents(response);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch incidents');
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  const filteredIncidents = incidents.filter((incident) => {
    const matchesStatus = filter === "All" || incident.status === filter;
    const matchesSearchQuery =
      incident.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      incident.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearchQuery;
  });

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="pt-20 p-6"> 
      {/* Search and Filter */}
      <div className="mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:justify-between">
        <input
          type="text"
          placeholder="Search incidents..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent w-full md:w-1/3"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
        >
          <option value="All">All</option>
          <option value="Under Investigation">Under Investigation</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      {/* Incident Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredIncidents.map((incident) => (
          <div key={incident.id} className="bg-white p-6 rounded-md shadow-lg">
            <h3 className="text-xl font-semibold mb-2">{incident.title}</h3>
            <p className="text-gray-700 mb-2">{incident.description}</p>
            <div
              className={`inline-block px-3 py-1 text-white rounded-md mb-4 ${
                incident.status === 'Resolved'
                  ? 'bg-green-500'
                  : incident.status === 'Under Investigation'
                  ? 'bg-yellow-500'
                  : 'bg-red-500'
              }`}
            >
              {incident.status}
            </div>

            {/* Media Gallery */}
            <Carousel showThumbs={false} dynamicHeight={true} className="mb-4">
              {incident.media.map((item, index) => (
                <div key={index}>
                  {item.type === 'image' ? (
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

            {/* Map */}
            <MapContainer center={incident.location} zoom={13} style={{ height: '200px' }} className="rounded-md shadow-md">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={incident.location}>
                <Popup>{incident.title}</Popup>
              </Marker>
            </MapContainer>
          </div>
        ))}
      </div>

      {/* Overall Map */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Map of All Incidents</h2>
        <MapContainer center={[-1.286389, 36.817223]} zoom={12} style={{ height: '400px' }} className="rounded-md shadow-lg">
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {filteredIncidents.map((incident) => (
            <Marker key={incident.id} position={incident.location}>
              <Popup>
                <strong>{incident.title}</strong>
                <br />
                {incident.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default HomePage;