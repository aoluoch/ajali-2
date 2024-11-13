import { useState } from 'react'
import Map from '../components/Map'

const CreateIncident = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [incidentType, setIncidentType] = useState('Red Flag')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const incidentData = {
      title,
      description,
      incident_type: incidentType,
      latitude,
      longitude,
    }

    const response = await fetch('http://localhost:5000/api/incidents', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(incidentData),
    })

    if (response.ok) {
      alert('Incident created successfully')
    } else {
      alert('Failed to create incident')
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold mb-4">Create New Incident</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 w-full border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 w-full border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="incidentType" className="block text-sm">Incident Type</label>
          <select
            id="incidentType"
            value={incidentType}
            onChange={(e) => setIncidentType(e.target.value)}
            className="p-2 w-full border rounded"
          >
            <option value="Red Flag">Red Flag</option>
            <option value="Intervention">Intervention</option>
          </select>
        </div>
        <div>
          <label htmlFor="latitude" className="block text-sm">Latitude</label>
          <input
            type="number"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            className="p-2 w-full border rounded"
            required
          />
        </div>
        <div>
          <label htmlFor="longitude" className="block text-sm">Longitude</label>
          <input
            type="number"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            className="p-2 w-full border rounded"
            required
          />
        </div>
        {/* Map Component */}
        <div className="mt-4">
          <Map latitude={parseFloat(latitude)} longitude={parseFloat(longitude)} title={title} />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded mt-4">
          Submit Incident
        </button>
      </form>
    </div>
  )
}

export default CreateIncident
