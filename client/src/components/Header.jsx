import { Settings, LogOut, AlertTriangle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import NotificationBadge from './NotificationBadge';

const Header = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken'); 
    localStorage.removeItem('user'); 
    navigate('/login'); 
  };

  return (
    <header className="bg-white shadow-md fixed w-full z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo and App Name */}
          <div className="flex items-center space-x-2">
            <AlertTriangle className="h-8 w-8 text-primary-600" />
            <Link
              to="/home"
              className="font-bold text-xl text-gray-900 hover:text-primary-700 transition-colors"
            >
              Ajali!
            </Link>
          </div>

          {/* Actions Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/notifications"
              className="relative text-gray-700 hover:text-primary-600"
            >
              <NotificationBadge />
            </Link>
            <Link
              to="/settings"
              className="text-gray-700 hover:text-primary-600"
            >
              <Settings className="h-6 w-6" />
            </Link>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700 hidden md:block">{username}</span>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-primary-600 px-4 py-2 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:block">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
