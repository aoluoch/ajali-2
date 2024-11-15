import { Link } from 'react-router-dom'; // Assuming you're using react-router for navigation
import { useSelector } from 'react-redux';
import AjaliLogo from '../assets/ajali-logo.svg'; // Import your logo component here

const UserSidebar = () => {
  const user = useSelector((state) => state.user); // Assuming user info is in the state

  return (
    <div className="bg-[var(--color-primary-600)] h-full w-64 p-4 flex flex-col justify-between">
      {/* Logo or App Name */}
      <div className="text-3xl font-bold text-white mb-8 flex items-center space-x-4">
        <AjaliLogo className="w-10 h-10" /> {/* Add AjaliLogo with specific width and height */}
        <span>Ajali!</span>
      </div>

      {/* User Info Display */}
      {user && (
        <div className="text-white mb-4">
          <span className="text-lg font-semibold">Hello, {user.username}!</span> {/* Displaying username */}
        </div>
      )}

      {/* Sidebar Navigation */}
      <nav>
        <ul className="space-y-4">
          {/* Dashboard Link */}
          <li>
            <Link
              to="/home"
              className="text-white text-lg font-semibold hover:bg-[var(--color-primary-400)] px-4 py-2 rounded-md block"
            >
              Dashboard
            </Link>
          </li>

          {/* Create New Incident Link */}
          <li>
            <Link
              to="/create-incident"
              className="text-white text-lg font-semibold hover:bg-[var(--color-primary-400)] px-4 py-2 rounded-md block"
            >
              Create New Incident
            </Link>
          </li>

          {/* My Profile Link */}
          <li>
            <Link
              to="/profile"
              className="text-white text-lg font-semibold hover:bg-[var(--color-primary-400)] px-4 py-2 rounded-md block"
            >
              My Profile
            </Link>
          </li>
        </ul>
      </nav>

      {/* Optional Footer or Extra Links */}
      <div className="mt-auto text-center text-sm text-white">
        <p>© 2024 Ajali Inc. All rights reserved.</p>
      </div>
    </div>
  );
};

export default UserSidebar;
