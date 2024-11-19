import { useState, useEffect } from 'react';

const ManageIncidents = () => {
    const [incidents, setIncidents] = useState([]); // State to store incidents
    const [loading, setLoading] = useState(true); // State for loading indicator
    const [error, setError] = useState(""); // State for error handling

    // Fetch incidents from API when component mounts
    useEffect(() => {
        const fetchIncidents = async () => {
            try {
                const response = await fetch("http://127.0.0.1:5000/incidents");
                if (!response.ok) {
                    throw new Error("Failed to fetch incidents");
                }
                const data = await response.json();
                setIncidents(data); // Update state with fetched incidents
            } catch (err) {
                setError(err.message); // Handle error
            } finally {
                setLoading(false); // Set loading to false after fetching
            }
        };

        fetchIncidents();
    }, []); // Empty dependency array means this effect runs only once after the first render

    if (loading) {
        return <div>Loading incidents...</div>;
    }

    if (error) {
        return <div className="text-red-500">{error}</div>;
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold">Manage Incidents</h2>
            <table className="min-w-full mt-4 border">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border px-4 py-2">Incident ID</th>
                        <th className="border px-4 py-2">Description</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {incidents.length === 0 ? (
                        <tr>
                            <td colSpan="4" className="border px-4 py-2 text-center">
                                No incidents available
                            </td>
                        </tr>
                    ) : (
                        incidents.map((incident) => (
                            <tr key={incident.id}>
                                <td className="border px-4 py-2">{incident.id}</td>
                                <td className="border px-4 py-2">{incident.description}</td>
                                <td className="border px-4 py-2">{incident.status}</td>
                                <td className="border px-4 py-2">
                                    <button className="text-blue-500">View</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageIncidents;
