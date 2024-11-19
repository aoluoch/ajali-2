import React from "react";
import { Link } from "react-router-dom";
import { FaBell, FaCog } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className="fixed top-0 left-0 w-full bg-red-600 text-white shadow-md p-6 border-b border-black z-50">
      {/* Navbar Container */}
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center space-x-6">
          <Link to="/login" className="text-white text-lg">
            Login
          </Link>
        </div>

        {/* Center Section */}
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">
            Ajali!
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-6">
          <Link to="/incidents" className="text-lg hover:text-gray-300">
            Incidents
          </Link>
          <div className="relative cursor-pointer">
            <FaBell className="text-white" />
            <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full px-1">
              2
            </span>
          </div>
          <FaCog className="cursor-pointer text-white" />
          <Link to="/logout" className="hover:text-gray-300">
            Logout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
