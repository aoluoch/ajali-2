import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { User, LogOut, Menu, X, Heart } from 'lucide-react';
import { logout } from '../store/slices/authSlice';

// Import the SVG file
import logo from '../assets/ajali-logo.svg';

const Logo = () => (
  <img
    src={logo}
    alt="Logo"
    className="h-8 w-24"
  />
);

function Navbar() {
  const dispatch = useDispatch();
  const location = useLocation();
  const { token } = useSelector((state) => state.auth);
  const isLandingPage = location.pathname === '/landing';
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  const navLinks = [
    { to: '/home', label: 'Home' },
    { to: '/create-incident', label: 'Incidents' },
    { to: '/contact', label: 'Contact' },
  ];

  return (
    <nav className={`
      ${isLandingPage ? 'bg-transparent absolute' : 'bg-[#FF3333]'}
      w-full z-50 transition-all duration-300 ease-in-out
    `}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 text-white hover:opacity-90 transition-opacity"
          >
            <Logo />
            <span className="text-2xl font-bold hidden md:block">Ajali!</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-white hover:text-[#FFE4D6] transition-colors duration-200"
              >
                {link.label}
              </Link>
            ))}

            {token ? (
              <>
                <Link
                  to="/incidents/new"
                  className="bg-white text-[#FF3333] px-6 py-2 rounded-full font-semibold 
                           hover:bg-[#FFE4D6] transition-all duration-200 shadow-md 
                           hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Report Incident
                </Link>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-white hover:text-[#FFE4D6] 
                           transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="flex items-center space-x-2 text-white hover:text-[#FFE4D6] 
                           transition-colors duration-200"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-[#FF3333] px-6 py-2 rounded-full font-semibold 
                           hover:bg-[#FFE4D6] transition-all duration-200 shadow-md 
                           hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Register
                </Link>
                <Link
                  to="/donate"
                  className="flex items-center space-x-2 bg-[#B71935] text-white px-6 py-2 
                           rounded-full font-semibold hover:bg-[#931032] transition-all 
                           duration-200 shadow-md hover:shadow-lg transform 
                           hover:-translate-y-0.5"
                >
                  <Heart className="h-5 w-5" />
                  <span>Donate</span>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white hover:text-[#FFE4D6] transition-colors"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-[#FF3333] pb-6">
            <div className="flex flex-col space-y-4 px-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={() => setIsOpen(false)}
                  className="text-white hover:text-[#FFE4D6] transition-colors py-2"
                >
                  {link.label}
                </Link>
              ))}
              
              {token ? (
                <>
                  <Link
                    to="/incidents/new"
                    onClick={() => setIsOpen(false)}
                    className="bg-white text-[#FF3333] px-6 py-2 rounded-full font-semibold 
                             text-center hover:bg-[#FFE4D6] transition-colors"
                  >
                    Report Incident
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 text-white hover:text-[#FFE4D6] 
                             transition-colors py-2"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center space-x-2 text-white hover:text-[#FFE4D6] 
                             transition-colors py-2"
                  >
                    <User className="h-5 w-5" />
                    <span>Login</span>
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsOpen(false)}
                    className="bg-white text-[#FF3333] px-6 py-2 rounded-full font-semibold 
                             text-center hover:bg-[#FFE4D6] transition-colors"
                  >
                    Register
                  </Link>
                  <Link
                    to="/donate"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center space-x-2 bg-[#B71935] 
                             text-white px-6 py-2 rounded-full font-semibold 
                             hover:bg-[#931032] transition-colors"
                  >
                    <Heart className="h-5 w-5" />
                    <span>Donate</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;