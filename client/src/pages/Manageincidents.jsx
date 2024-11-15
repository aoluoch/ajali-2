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
        return (
            <div className="p-6 text-[var(--color-primary-600)]">
                <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full border-4 border-t-[var(--color-primary-400)] border-white h-6 w-6"></div>
                    <span>Loading incidents...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="p-6 text-[var(--color-error)]">Error: {error}</div>;
    }

    return (
        <div className="p-6 bg-[var(--color-background)] rounded-lg shadow-lg">
            <h2 className="text-3xl font-semibold text-[var(--color-primary-600)] mb-6">Manage Incidents</h2>
            <table className="min-w-full bg-white rounded-lg shadow-md border border-[var(--color-primary-400)]">
                <thead>
                    <tr className="bg-[var(--color-primary-200)] text-[var(--color-primary-600)]">
                        <th className="border px-6 py-3 text-left">Incident ID</th>
                        <th className="border px-6 py-3 text-left">Description</th>
                        <th className="border px-6 py-3 text-left">Status</th>
                        <th className="border px-6 py-3 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {incidents.length > 0 ? (
                        incidents.map((incident) => (
                            <tr key={incident.id} className="hover:bg-[var(--color-primary-100)] transition-colors">
                                <td className="border px-6 py-4">{incident.id}</td>
                                <td className="border px-6 py-4">{incident.description}</td>
                                <td className="border px-6 py-4">{incident.status}</td>
                                <td className="border px-6 py-4">
                                    <button className="text-[var(--color-primary-600)] hover:text-[var(--color-primary-400)] font-semibold">View</button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="border px-6 py-4 text-center text-[var(--color-primary-400)]" colSpan="4">
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
