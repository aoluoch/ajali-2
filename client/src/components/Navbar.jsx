import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AlertTriangle, Menu, X, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import { logout } from '../store/slices/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const navItems = [
    { label: 'Home', path: '/', type: 'route' },
    { label: 'Recent Incidents', path: 'incidents', type: 'scroll' },
    { label: 'About', path: 'about', type: 'scroll' },
    { label: 'Contact', path: '/contact', type: 'route' }
  ];

  const handleNavClick = (item, e) => {
    if (item.type === 'scroll') {
      e.preventDefault();
      const element = document.getElementById(item.path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  useEffect(() => {
    setIsOpen(false);
  }, []);

  const renderNavLink = (item) => {
    if (item.type === 'route') {
      return (
        <Link
          key={item.label}
          to={item.path}
          className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          onClick={() => setIsOpen(false)}
        >
          {item.label}
        </Link>
      );
    }

    return (
      <a
        key={item.label}
        href={`#${item.path}`}
        className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer"
        onClick={(e) => handleNavClick(item, e)}
      >
        {item.label}
      </a>
    );
  };

  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <Button
          onClick={handleLogout}
          variant="danger"
          className="flex items-center"
        >
          <LogOut className="h-5 w-5 mr-2" />
          Logout
        </Button>
      );
    }
    return (
      <Link
        to="/login"
        className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
      >
        Sign In
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <AlertTriangle className="h-8 w-8 text-primary-600" />
              <span className="font-bold text-xl text-gray-900">Ajali!</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map(renderNavLink)}
            {renderAuthButtons()}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              item.type === 'route' ? (
                <Link
                  key={item.label}
                  to={item.path}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={`#${item.path}`}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary-600 hover:bg-primary-50"
                  onClick={(e) => handleNavClick(item, e)}
                >
                  {item.label}
                </a>
              )
            ))}
            {isAuthenticated ? (
              <Button
                onClick={handleLogout}
                variant="danger"
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                <LogOut className="h-5 w-5 mr-2" />
                Logout
              </Button>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 rounded-md text-base font-medium bg-primary-600 text-white hover:bg-primary-700"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;