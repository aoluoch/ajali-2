import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, PlusCircle, User, Bell, Settings, List } from 'lucide-react';

function Sidebar() {
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
    <div className="w-64 bg-white h-screen fixed left-0 top-16 shadow-md">
      <nav className="mt-4">
        <ul className="space-y-2 px-4">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive(item.href)
                      ? 'bg-primary-50 text-primary-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

export default Sidebar;
