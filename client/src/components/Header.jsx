import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/slices/authSlice'; // Assuming you have a logout action
import AjaliLogo from '../assets/ajali-logo.svg'; // Import the SVG file

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <header className="bg-[var(--color-primary-600)] text-white p-4 flex flex-wrap justify-between items-center">
      {/* Logo or App Name */}
      <div className="text-3xl font-bold text-center sm:text-left w-full sm:w-auto">
        <AjaliLogo width="40" height="40" className="feather feather-briefcase" />
        Ajali!
      </div>

      {/* User Info and Logout */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <span className="sm:mt-0">{user ? user.username : 'Guest'}</span>
        <button
          onClick={handleLogout}
          className="bg-[var(--color-primary-500)] hover:bg-[var(--color-primary-400)] text-white px-4 py-2 rounded-md sm:mt-0 mt-2 w-full sm:w-auto"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;