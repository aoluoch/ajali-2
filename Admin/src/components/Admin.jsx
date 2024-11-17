import React from 'react';
import { Link } from 'react-router-dom';
import { FaBell, FaCog } from 'react-icons/fa'; // Importing icons from react-icons

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
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <div className="flex items-center justify-between bg-red-600 text-white shadow-md p-6 border-b border-black">
                    <div className="flex items-center">
                        <Link to="/" className="text-xl font-bold">Ajali!</Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        {/* Removed Incident Reports link */}
                        <div className="relative cursor-pointer">
                            <FaBell className="text-white" />
                            <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full px-1">2</span>
                        </div>
                        <FaCog className="cursor-pointer text-white" />
                        <Link to="/logout" className="hover:text-gray-300">Logout</Link>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-semibold text-black">Welcome to the Admin Dashboard!</h1>
                    {/* Add your routing logic here to display different components */}
                </div>
            </div>
        </div>
    );
};

export default Admin;