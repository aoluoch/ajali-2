import React from 'react';

const Header = ({ username }) => {
    return (
        <header className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="text-2xl font-bold">Ajali!</div>
            <input
                type="text"
                placeholder="Search by Title"
                className="p-2 rounded"
            />
            <div className="flex items-center gap-4">
                <span>{username}</span>
                <button className="text-red-500">Logout</button>
            </div>
        </header>
    );
};

export default Header;
