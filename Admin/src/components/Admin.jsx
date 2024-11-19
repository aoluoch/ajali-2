import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaCog } from 'react-icons/fa'; // Importing icons from react-icons
import Navbar from './Navbar';

const Admin = () => {
    return (
        <div className="flex h-screen bg-white">                                                                                             
            {/* Sidebar */}
            <div className="bg-red-600 text-white shadow-md w-64">
                <h2 className="text-2xl font-bold p-6 flex items-center">Admin Dashboard</h2>
                <ul className="mt-6">
                    <li className="p-4 hover:bg-red-400 cursor-pointer">
                        <Link to="/">Dashboard</Link>
                    </li>
                    <li className="p-4 hover:bg-red-400 cursor-pointer">
                        <Link to="/manage-incidents">Manage Incidents</Link>
                    </li>
                    <li className="p-4 hover:bg-red-400 cursor-pointer">
                        <Link to="/notifications">Notifications</Link>
                    </li>
                    <li className="p-4 hover:bg-red-400 cursor-pointer">
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
           <Navbar></Navbar>.
        </div>
    );
};

export default Admin;
