import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, User, Bell, Settings, List, X } from 'lucide-react';
import PropTypes from 'prop-types';

function Sidebar({ onClose }) {
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Create Incident', href: '/create-incident', icon: PlusCircle },
    { name: 'My Profile', href: '/profile', icon: User },
    { name: 'Notifications', href: '/notifications', icon: Bell },
    { name: 'Manage Incidents', href: '/manage-incidents', icon: List },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-64 bg-white h-full overflow-y-auto shadow-md">
      {/* Close button - only visible on mobile */}
      <button
        onClick={onClose}
        className="md:hidden absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100"
      >
        <X className="h-5 w-5 text-gray-500" />
      </button>

      <nav className="py-4">
        <ul className="space-y-1 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center px-3 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3 shrink-0" />
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
};

Sidebar.defaultProps = {
  onClose: () => {},
};

export default Sidebar;
