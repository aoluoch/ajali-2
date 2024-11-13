import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import IncidentCard from '../components/IncidentCard'

const Dashboard = () => {
  const [incidents, setIncidents] = useState([])

  useEffect(() => {
    const fetchIncidents = async () => {
      const response = await fetch('http://localhost:5000/api/incidents')
      const data = await response.json()
      setIncidents(data)
    }

    fetchIncidents()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link to="/create-incident" className="bg-blue-500 text-white px-4 py-2 rounded">
          Create New Incident
        </Link>
      </div>

      <div className="my-4">
        <h2 className="text-xl font-semibold">Recent Incidents</h2>
        <div className="mt-4">
          {incidents.map((incident) => (
            <IncidentCard key={incident.id} incident={incident} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
