import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchIncidents } from '../store/slices/incidentSlice'; // Import the action to fetch incidents

const ManageIncidents = () => {
    const dispatch = useDispatch();

    // Accessing incidents, loading, and error state from Redux store
    const { incidents, loading, error } = useSelector((state) => state.incidents);

    // Fetch incidents when the component mounts
    useEffect(() => {
        dispatch(fetchIncidents());
    }, [dispatch]);

    if (loading) {
        return <div className="p-6">Loading incidents...</div>;
    }

    if (error) {
        return <div className="p-6 text-red-500">Error: {error}</div>;
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
                    {incidents.length > 0 ? (
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
                    ) : (
                        <tr>
                            <td className="border px-4 py-2" colSpan="4">
                                No incidents found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default ManageIncidents;
