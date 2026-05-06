import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
      credentials: 'include', // ← sends the httpOnly cookie automatically
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.user) setUser(data.user);
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = () => {
    fetch(`${import.meta.env.VITE_API_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    }).then(() => setUser(null));
  };

  return (
    <>
      <div className="bg-black text-white p-4 sticky top-0 z-10 mx-auto md:flex items-center justify-between">
        <NavLink to="/headlines">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            <span className="text-5xl md:text-7xl text-orange-400 font-monoton font-extralight">
              N
            </span>
            ews
            <span className="text-5xl md:text-7xl text-orange-400 font-kings font-extralight">
              h
            </span>
            ub
          </h1>
        </NavLink>
        <nav className="flex items-center gap-6">
          <ul className="flex space-x-4 mt-3">
            <li className="hover:text-orange-400">
              <NavLink to="/headlines">Headlines</NavLink>
            </li>
            <li className="hover:text-orange-400 flex">
              <NavLink to="/about">Favourites</NavLink>
            </li>
          </ul>
          {user ? (
            <div className="flex items-center gap-3 mt-3">
              <div className="w-8 h-8 rounded-full bg-orange-400 flex items-center justify-center text-black font-extrabold text-sm">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-white">{user.name}</span>
              <button
                onClick={handleLogout}
                className="text-xs text-gray-400 hover:text-orange-400 border border-gray-600 px-3 py-1 rounded"
              >
                Logout
              </button>
            </div>
          ) : (
            <a href={`${import.meta.env.VITE_API_URL}/auth/google`} className="mt-3">
              <button className="text-sm bg-orange-400 text-black font-bold px-4 py-1.5 rounded hover:bg-orange-300 transition-colors">
                Sign in with Google
              </button>
            </a>
          )}
        </nav>
      </div>
    </>
  );
};

export default Header;
