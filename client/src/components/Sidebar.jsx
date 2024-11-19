import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-red-600 text-white p-4">
      <ul className="space-y-4">
        <li>
          <NavLink 
            to="/home" 
            className={({ isActive }) => 
              isActive
                ? 'block py-2 px-4 bg-white text-red-600 rounded-md'  
                : 'block py-2 px-4 hover:bg-red-700 rounded-md'       
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
                ? 'block py-2 px-4 bg-white text-red-600 rounded-md'  
                : 'block py-2 px-4 hover:bg-red-700 rounded-md'       
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
                ? 'block py-2 px-4 bg-white text-red-600 rounded-md'  
                : 'block py-2 px-4 hover:bg-red-700 rounded-md'       
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
