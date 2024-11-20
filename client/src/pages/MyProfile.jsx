import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit2, Trash2, MapPin, Clock, CheckCircle, AlertTriangle, Camera } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { Cloudinary } from '@cloudinary/url-gen';
import { auto } from '@cloudinary/url-gen/actions/resize';
import { AdvancedImage } from '@cloudinary/react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const MyProfile = () => {
  const [user, setUser] = useState(null);
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all');
  const [uploading, setUploading] = useState(false); // For image upload loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('user')); // Retrieve user data from localStorage
        if (!storedUser) throw new Error('User not authenticated');

        setUser(storedUser);

        // Mock incidents data
        setIncidents([
          { id: 1, userId: storedUser.id, title: 'Issue with login', status: 'under investigation', description: 'Unable to log in to the system.', location: [-1.286389, 36.817223], media: [{ type: 'image', src: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg' }] },
          { id: 2, userId: storedUser.id, title: 'Server downtime', status: 'resolved', description: 'The server was down for 2 hours.', location: [-1.282379, 36.832275], media: [{ type: 'video', src: 'https://www.w3schools.com/html/mov_bbb.mp4' }] },
          { id: 3, userId: storedUser.id, title: 'Payment failure', status: 'under investigation', description: 'Payment gateway not responding.', location: [-1.290000, 36.818000], media: [{ type: 'image', src: 'https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg' }] },
        ]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchUser = async () => {
    // Replace with actual API call
    return { id: 1, username: 'User', email: 'user@example.com', profilePicture: null };
  };

  const fetchIncidents = async () => {
    // Replace with actual API call
    return [
      { id: 1, userId: 1, title: 'Incident 1', description: 'Description 1', status: 'resolved' },
      { id: 2, userId: 1, title: 'Incident 2', description: 'Description 2', status: 'under investigation' }
    ];
  };

  const deleteIncident = async (id) => {
    // Replace with actual API call
    setIncidents(incidents.filter(incident => incident.id !== id));
  };

  // If no user is found, show loading state
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const userIncidents = incidents.filter(incident => incident.userId === user.id);
  const filteredIncidents = userIncidents.filter(incident => 
    filter === 'all' || incident.status.toLowerCase() === filter
  );

  const handleEdit = (incident) => {
    navigate('/create-incident', { state: { incident } });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this incident?')) {
      try {
        await deleteIncident(id);
        alert('Incident deleted successfully');
      } catch {
        alert('Failed to delete incident');
      }
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'under investigation':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
    }
  };

  const filteredIncidents = incidents.filter((incident) => 
    filter === 'all' || incident.status.toLowerCase() === filter
  );

  const handleUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setUploading(true);

    // Assuming Cloudinary upload (you can replace this with your actual upload logic)
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ajali-default'); // Replace with your preset

      const res = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (data.secure_url) {
        const updatedUser = { ...user, profilePicture: data.secure_url };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        alert('Profile picture uploaded successfully');
      }
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed, please try again.');
    } finally {
      setUploading(false);
    }
  };

  // Cloudinary setup for resizing
  const cld = new Cloudinary({ cloud: { cloudName: 'dhmw4vdgc' } });
  const img = user?.profilePicture ? cld.image(user?.profilePicture).resize(auto().width(150).height(150)) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-6">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="p-6 mt-20">
      {/* Profile Section */}
      <div className="mb-8 text-center">
        <div className="relative inline-block">
          {/* Cloudinary Image */}
          {img ? (
            <AdvancedImage cldImg={img} className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg" />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
          <label htmlFor="file-input" className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-2 cursor-pointer">
            <Camera className="h-5 w-5" />
          </label>
          <input
            type="file"
            id="file-input"
            className="hidden"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading} // Disable input while uploading
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold text-gray-900">{user?.username || 'User'}</h1>
        <p className="text-gray-600">{user?.email || 'No email available'}</p>
      </div>

      {/* Incidents Section */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">My Incidents</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('under investigation')}
              className={`px-4 py-2 rounded-lg ${filter === 'under investigation' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
            >
              Under Investigation
            </button>
            <button
              onClick={() => setFilter('resolved')}
              className={`px-4 py-2 rounded-lg ${filter === 'resolved' ? 'bg-red-600 text-white' : 'bg-gray-100'}`}
            >
              Resolved
            </button>
          </div>
        </div>

        {filteredIncidents.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <MapPin className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-lg font-medium text-gray-900">No incidents found</h3>
            <p className="mt-2 text-gray-500">
              {filter === 'all'
                ? "You haven't reported any incidents yet"
                : `No ${filter} incidents found`}
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredIncidents.map((incident) => (
              <div key={incident.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold">{incident.title}</h3>
                  <div className="flex items-center space-x-1">
                    {getStatusIcon(incident.status)}
                    <span
                      className={`text-sm ${
                        incident.status === 'Resolved' ? 'text-green-600' :
                        incident.status === 'Under Investigation' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}
                    >
                      {incident.status}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 line-clamp-2">{incident.description}</p>

                {/* Media Gallery */}
                <Carousel showThumbs={false} dynamicHeight={true} className="mb-4">
                  {incident.media.map((item, index) => (
                    <div key={index}>
                      {item.type === 'image' ? (
                        <img src={item.src} alt="Incident media" className="w-full h-auto rounded-lg" />
                      ) : (
                        <video controls className="w-full h-auto rounded-lg">
                          <source src={item.src} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  ))}
                </Carousel>

                {/* Map */}
                <div className="h-40 w-full mt-4">
                  <MapContainer center={incident.location} zoom={13} style={{ height: '100%', width: '100%' }}>
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    <Marker position={incident.location}>
                      <Popup>{incident.title}</Popup>
                    </Marker>
                  </MapContainer>
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => handleEdit(incident)}
                    className="text-primary-600 hover:text-primary-500"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(incident.id)}
                    className="text-red-600 hover:text-red-500"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;