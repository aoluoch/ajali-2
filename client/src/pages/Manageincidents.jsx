import React from 'react';

const ManageIncidents = () => {
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
                    <tr>
                        <td className="border px-4 py-2">1</td>
                        <td className="border px-4 py-2">Incident description 1</td>
                        <td className="border px-4 py-2">Open</td>
                        <td className="border px-4 py-2">
                            <button className="text-blue-500">View</button>
                        </td>
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">2</td>
                        <td className="border px-4 py-2">Incident description 2</td>
                        <td className="border px-4 py-2">Resolved</td>
                        <td className="border px-4 py-2">
                            <button className="text-blue-500">View</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ManageIncidents;