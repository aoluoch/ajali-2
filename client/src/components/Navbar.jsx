import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User, LogOut } from 'lucide-react';
import { logout } from '../store/slices/authSlice';
import AjaliLogo from '../assets/ajali-logo.svg';

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const isLandingPage = location.pathname === '/landing';

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className={`${isLandingPage ? 'bg-transparent absolute w-full z-10' : 'bg-red-600'} text-white shadow-lg`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold">
            <img src={AjaliLogo} alt="Ajali Logo" className="h-8 w-8" />
            <span>Ajali!</span>
          </Link>

          <div className="flex items-center space-x-6">
            {token ? (
              <>
                <Link to="/dashboard" className="hover:text-red-100 transition-colors">
                  Dashboard
                </Link>
                <Link
                  to="/incidents/new"
                  className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-50 transition-colors"
                >
                  Report Incident
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 hover:text-red-100 transition-colors"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="flex items-center space-x-2 hover:text-red-100 transition-colors">
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-50 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;