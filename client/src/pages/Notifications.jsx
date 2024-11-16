import React from 'react';

const Notifications = () => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold">Notifications</h2>
            <ul className="mt-4">
                <li className="border-b py-2">Notification 1: New incident reported.</li>
                <li className="border-b py-2">Notification 2: Incident resolved.</li>
                <li className="border-b py-2">Notification 3: New user registered.</li>
                <li className="border-b py-2">Notification 4: System maintenance scheduled.</li>
            </ul>
        </div>
    );
};

export default Notifications;