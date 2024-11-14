import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-red-600 text-white p-4">
      <ul className="space-y-4">
        <li>
          <Link 
            to="/" 
            className="block py-2 px-4 hover:bg-red-700 rounded-md"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link 
            to="/create-incident" 
            className="block py-2 px-4 hover:bg-red-700 rounded-md"
          >
            Create New Incident
          </Link>
        </li>
        <li>
          <Link 
            to="/profile" 
            className="block py-2 px-4 hover:bg-red-700 rounded-md"
          >
            My Profile
          </Link>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;
