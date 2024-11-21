import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white text-gray-800 p-4 shadow-lg pt-24 border-r border-gray-200"> {/* Background color and shadow updated */}
      <ul className="space-y-6"> {/* Increased spacing for modern feel */}
        <li>
          <NavLink 
            to="/home" 
            className={({ isActive }) => 
              isActive
                ? 'block py-3 px-4 bg-red-700 text-white rounded-md shadow-md'  /* Active state with darker red */
                : 'block py-3 px-4 text-red-700 hover:bg-red-100 rounded-md transition-all duration-300 ease-in-out' /* Hover effect with smooth transition */
            }
          >
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/create-incident" 
            className={({ isActive }) => 
              isActive
                ? 'block py-3 px-4 bg-red-700 text-white rounded-md shadow-md'  /* Active state with darker red */
                : 'block py-3 px-4 text-red-700 hover:bg-red-100 rounded-md transition-all duration-300 ease-in-out' /* Hover effect */
            }
          >
            Create New Incident
          </NavLink>
        </li>
        <li>
          <NavLink 
            to="/profile" 
            className={({ isActive }) => 
              isActive
                ? 'block py-3 px-4 bg-red-700 text-white rounded-md shadow-md'  /* Active state with darker red */
                : 'block py-3 px-4 text-red-700 hover:bg-red-100 rounded-md transition-all duration-300 ease-in-out' /* Hover effect */
            }
          >
            My Profile
          </NavLink>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;