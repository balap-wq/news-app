import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/headlines', { replace: true }); // ← stays on headlines
  };

  return (
    <div className="bg-black text-white p-4 sticky top-0 z-10 mx-auto md:flex items-center justify-between">
      <NavLink to="/headlines">
        <h1 className="text-4xl md:text-5xl font-extrabold">
          <span className="text-5xl md:text-7xl text-orange-400 font-monoton font-extralight">N</span>
          ews
          <span className="text-5xl md:text-7xl text-orange-400 font-kings font-extralight">h</span>
          ub
        </h1>
      </NavLink>

      <nav className="flex items-center gap-3 ">
        <ul className="flex space-x-4 mt-3">
          <li className="hover:text-orange-400">
            <NavLink to="/headlines">Headlines</NavLink>
          </li>
          <li className="hover:text-orange-400 flex">
            <NavLink to="/about">Favourites</NavLink>
          </li>
        </ul>

        {user ? (
          <div className="flex items-center gap-2 mt-3">
            <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-black font-extrabold text-sm">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <span className="text-sm text-wrap text-white">{user.name}</span>
            <button
              onClick={handleLogout}
              className="text-xs text-gray-400 hover:text-orange-400 border border-gray-600 px-3 py-1 rounded cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <a href={`${import.meta.env.VITE_API_URL}/auth/google?prompt=select_account`} className="mt-3">
            <button className="text-sm bg-orange-400 text-black font-bold px-4 py-1.5 rounded hover:bg-orange-300 transition-colors cursor-pointer">
              Sign in with Google
            </button>
          </a>
        )}
      </nav>
    </div>
  );
};

export default Header;