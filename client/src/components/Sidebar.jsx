import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, User, Bell, Settings, List, X, AlertTriangle } from 'lucide-react';
import PropTypes from 'prop-types';

function Sidebar({ onClose = () => {} }) {
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
    <div className="w-64 bg-white h-full overflow-y-auto">
      {/* Header with logo and close button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <div className="flex items-center space-x-2">
          <AlertTriangle className="h-6 w-6 text-primary-600" />
          <span className="font-semibold text-gray-900">Ajali Dashboard</span>
        </div>

        {/* Close button - only visible on mobile */}
        <button
          onClick={onClose}
          className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Close sidebar"
        >
          <X className="h-5 w-5 text-gray-500" />
        </button>
      </div>

      <nav className="py-6">
        <div className="px-4 mb-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Main Menu
        </div>
        <ul className="space-y-2 px-3">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  onClick={onClose}
                  className={`flex items-center px-4 py-3 rounded-lg transition-all ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-600 font-medium shadow-sm'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 shrink-0 ${isActive(item.href) ? 'text-primary-600' : 'text-gray-500'}`} />
                  <span className="truncate">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="px-4 py-6 mt-auto border-t border-gray-100">
        <div className="text-xs text-gray-500 mb-2">
          © {new Date().getFullYear()} Ajali
        </div>
      </div>
    </div>
  );
}

Sidebar.propTypes = {
  onClose: PropTypes.func,
};

export default Sidebar;
