import React from 'react';

const Header = () => {
  return (
    <header className="bg-red-600 text-white p-4 flex flex-wrap justify-between items-center">
      <div className="text-3xl font-bold text-center sm:text-left w-full sm:w-auto">
        Ajali!
      </div>

      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <span className="sm:mt-0">Pauline Nguru</span>
        <button className="bg-red-500 text-white px-4 py-2 rounded-md sm:mt-0 mt-2 w-full sm:w-auto">
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
