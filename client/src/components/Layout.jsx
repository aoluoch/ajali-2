import { useState } from 'react';
import PropTypes from 'prop-types'; 
import { Menu, X } from 'lucide-react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <div className={`
          fixed inset-y-0 left-0 z-30 w-64 bg-red-600 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute right-4 top-4 text-white lg:hidden"
          >
            <X className="h-6 w-6" />
          </button>
          <Sidebar />
        </div>

        {/* Main Content */}
        <main className="flex-1 overflow-auto p-4 lg:p-6">
          {/* Add Menu button for opening the sidebar */}
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

// Add prop types validation
Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;