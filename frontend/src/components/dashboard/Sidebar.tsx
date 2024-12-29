// frontend/components/dashboard/Sidebar.tsx

import { FC } from 'react';
import { Link } from 'react-router-dom';

const Sidebar: FC = () => {
  return (
    <div className="bg-gray-800 text-white w-64 h-full p-4">
      <h3 className="text-xl font-bold mb-6">Dashboard</h3>
      <ul>
        <li className="mb-4">
          <Link to="/dashboard" className="hover:text-blue-400">Home</Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/test" className="hover:text-blue-400">Test</Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/practice" className="hover:text-blue-400">Practice</Link>
        </li>
        <li className="mb-4">
          <Link to="/dashboard/results" className="hover:text-blue-400">Results</Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
