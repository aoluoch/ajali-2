import { useState, useRef } from 'react';
import { Camera, MapPin } from 'lucide-react';

export default function CreateIncident() {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [latLong, setLatLong] = useState({ latitude: '', longitude: '' });
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  const imageInputRef = useRef(null);
  const videoInputRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!description || !location) {
        alert('Please fill out all required fields.');
        return;
      }

      const formData = new FormData();
      formData.append('user_id', localStorage.getItem('user_id'));
      formData.append('description', description);
      formData.append('location', location);
      formData.append('latitude', latLong.latitude);
      formData.append('longitude', latLong.longitude);

      images.forEach((image) => formData.append('media_image', image));
      videos.forEach((video) => formData.append('media_video', video));

      const response = await fetch('http://127.0.0.1:5000/incidents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('user_id')}` // Include user_id in headers
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        alert('Incident reported successfully. Help is on the way!');
        setDescription('');
        setLocation('');
        setLatLong({ latitude: '', longitude: '' });
        setImages([]);
        setVideos([]);
        setImagePreviews([]);
        setVideoPreviews([]);
      } else {
        const errorData = await response.json();
        alert(errorData.error || 'Error posting incident or media.');
      }
    } catch (error) {
      console.error('Error creating incident or uploading media:', error);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleGeolocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLatLong({ latitude, longitude });

        fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b85c853e3d4b4b568df304a948d34d8e`)
          .then((res) => res.json())
          .then((data) => {
            const humanReadableLocation = data.results[0]?.formatted || `Lat: ${latitude}, Long: ${longitude}`;
            setLocation(humanReadableLocation);
          })
          .catch(() => {
            setLocation(`Lat: ${latitude}, Long: ${longitude}`);
          });
      });
    } else {
      alert('Geolocation is not supported by this browser.');
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews(imageUrls);
  };

  const handleVideoUpload = (e) => {
    const files = Array.from(e.target.files);
    setVideos(files);

    const videoUrls = files.map((file) => URL.createObjectURL(file));
    setVideoPreviews(videoUrls);
  };

  const triggerImageUpload = () => {
    imageInputRef.current.click();
  };

  const triggerVideoUpload = () => {
    videoInputRef.current.click();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Report an Incident</h1>

      <div className="bg-red-600 rounded-lg p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">
              <span className="text-lg font-medium text-white">What happened?</span>
              <textarea
                className="mt-2 w-full  text-gray-400 px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
                rows={4}
                placeholder="Describe the incident in detail..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-lg font-medium text-white">Location</span>
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  className="flex-1 text-gray-400 px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:border-yellow-500"
                  placeholder="Enter location or use map pin"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
                <button
                  type="button"
                  className="p-2 bg-white text-gray-400 hover:text-white rounded-lg"
                  onClick={handleGeolocation}
                >
                  <MapPin className="w-5 h-5" />
                </button>
              </div>
            </label>
          </div>

          <div>
            <span className="text-lg font-medium text-white">Evidence</span>
            <div className="mt-2 flex gap-4">
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-400 rounded-lg"
                onClick={triggerImageUpload}
              >
                <Camera className="w-5 h-5" />
                <span>Add Photos</span>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </button>
              <button
                type="button"
                className="flex items-center gap-2 px-4 py-2 bg-white text-gray-400 hover:text-white rounded-lg"
                onClick={triggerVideoUpload}
              >
                <Camera className="w-5 h-5" />
                <span>Add Videos</span>
                <input
                  ref={videoInputRef}
                  type="file"
                  accept="video/*"
                  multiple
                  className="hidden"
                  onChange={handleVideoUpload}
                />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              {imagePreviews.map((url, idx) => (
                <img key={idx} src={url} alt={`preview-${idx}`} className="h-24 object-cover rounded-lg" />
              ))}
              {videoPreviews.map((url, idx) => (
                <video key={idx} src={url} className="h-24 object-cover rounded-lg" controls />
              ))}
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 bg-red-500 text-white rounded-lg focus:outline-none hover:bg-red-400"
            >
              Report Incident
            </button>
          </div>
        </form>
      </div>

      {responseMessage && (
        <div className="mt-4 text-white">
          <strong>{responseMessage}</strong>
        </div>
      )}
    </div>
  );
}
