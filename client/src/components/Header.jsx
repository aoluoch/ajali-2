import PropTypes from 'prop-types'; // Import PropTypes
import { useAuth } from '../context/AuthContext';
import { Bell, Settings, LogOut, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import NotificationBadge from './NotificationBadge';

const Header = ({ onMenuClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-primary-600 text-white p-4 flex items-center justify-between shadow-lg">
      <div className="flex items-center space-x-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <Link to="/home" className="text-2xl sm:text-3xl font-bold hover:text-primary-100">
          Ajali!
        </Link>
      </div>

      <div className="flex items-center space-x-3 sm:space-x-6">
        <Link to="/notifications" className="relative hover:text-primary-100">
          <NotificationBadge />
          <Bell className="h-6 w-6" /> {/* Use the Bell icon here */}
        </Link>
        <Link to="/settings" className="hover:text-primary-100 hidden sm:block">
          <Settings className="h-6 w-6" />
        </Link>
        <div className="flex items-center space-x-2 sm:space-x-4">
          <span className="hidden md:block">{user?.username}</span>
          <button
            onClick={logout}
            className="flex items-center space-x-1 bg-primary-700 px-2 sm:px-4 py-2 rounded-lg hover:bg-primary-800 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span className="hidden sm:block">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

// Add PropTypes validation
Header.propTypes = {
  onMenuClick: PropTypes.func.isRequired,
};

export default Header;