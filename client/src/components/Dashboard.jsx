import React from 'react';
import IncidentCard from './IncidentCard';
import MapSection from './MapSection';
import RecentIncidents from './RecentIncidents';

const Dashboard = ({ incidents }) => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold">Incident Dashboard</h2>
            <div className="my-4">
                <button className="btn">Nearby</button>
                <button className="btn">Recent</button>
                <button className="btn">Under Investigation</button>
                <button className="btn">Resolved</button>
                <button className="btn">Rejected</button>
            </div>
            <div className="grid grid-cols-2 gap-4">
                {incidents.map(incident => (
                    <IncidentCard key={incident.id} incident={incident} />
                ))}
            </div>
            <MapSection incidents={incidents} />
            <RecentIncidents />
        </div>
    );
};

export default Dashboard;
