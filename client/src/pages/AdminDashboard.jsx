import { Link } from 'react-router-dom';
import { Bell, Settings } from 'lucide-react'; // Importing lucide-react icons

const Admin = () => {
    return (
        <div className="flex h-screen bg-[var(--color-background)]">
            {/* Sidebar */}
            <div className="bg-[var(--color-primary-600)] text-white shadow-md w-64">
                <h2 className="text-2xl font-bold p-6 flex items-center">
                    <span className="text-white font-bold">Ajali!</span>
                </h2>
                <ul className="mt-6 space-y-4">
                    <li className="p-4 hover:bg-[var(--color-primary-400)] cursor-pointer rounded-md transition">
                        <Link to="/home">Dashboard</Link>
                    </li>
                    <li className="p-4 hover:bg-[var(--color-primary-400)] cursor-pointer rounded-md transition">
                        <Link to="/manage-incidents">Manage Incidents</Link>
                    </li>
                    <li className="p-4 hover:bg-[var(--color-primary-400)] cursor-pointer rounded-md transition">
                        <Link to="/notifications">Notifications</Link>
                    </li>
                    <li className="p-4 hover:bg-[var(--color-primary-400)] cursor-pointer rounded-md transition">
                        <Link to="/settings">Settings</Link>
                    </li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col">
                {/* Top Navbar */}
                <div className="flex items-center justify-between bg-[var(--color-primary-600)] text-white shadow-md p-6 border-b border-black">
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="text-xl font-bold">Ajali!</Link>
                    </div>
                    <div className="flex items-center space-x-6">
                        {/* Notifications */}
                        <div className="relative cursor-pointer">
                            <Bell className="text-white" size={20} />
                            <span className="absolute -top-1 -right-2 bg-black text-white text-xs rounded-full px-1">2</span>
                        </div>
                        {/* Settings */}
                        <Settings className="cursor-pointer text-white" size={20} />
                        {/* Logout Link */}
                        <Link to="/logout" className="text-white hover:text-gray-300">Logout</Link>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="flex-1 p-6">
                    <h1 className="text-3xl font-semibold text-black">Welcome to the Admin Dashboard!</h1>
                    {/* Add your routing logic here to display different components */}
                </div>
            </div>
        </div>
    );
};

export default Admin;
