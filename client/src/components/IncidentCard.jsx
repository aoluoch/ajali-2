import React from 'react'

const IncidentCard = ({ incident }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-4">
      <h3 className="text-xl font-semibold">{incident.title}</h3>
      <p>{incident.description}</p>
      <div
        className={`text-sm font-bold mt-2 ${
          incident.status === 'Under Investigation'
            ? 'text-yellow-500'
            : incident.status === 'Resolved'
            ? 'text-green-500'
            : 'text-red-500'
        }`}
      >
        {incident.status}
      </div>
    </div>
  )
}

export default IncidentCard
