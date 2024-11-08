import React from 'react';

const Sidebar = ({ onNavigate }) => {
    return (
        <aside className="w-1/4 bg-gray-100 h-full p-4">
            <nav>
                <ul>
                    <li onClick={() => onNavigate('dashboard')}>Dashboard</li>
                    <li onClick={() => onNavigate('newIncident')}>Create New Incident</li>
                    <li onClick={() => onNavigate('profile')}>My Profile</li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
