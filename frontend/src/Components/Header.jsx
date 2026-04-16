import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotebookTabs } from 'lucide-react';
import { Store } from 'lucide-react';

const Header = () => {
  return (
    <>
      <div className="bg-black text-white p-4 sticky top-0 z-10 mx-auto md:flex items-center justify-between">
        <NavLink to="/headlines">
          <h1 className="text-4xl md:text-5xl font-extrabold">
            <span className="text-7xl text-orange-400 font-monoton font-extralight">N</span>ews
            <span className="text-7xl text-orange-400 font-kings font-extralight">h</span>ub
          </h1>
        </NavLink>
        <nav>
          <ul className="flex space-x-4 mt-3">
            <li className="hover:text-orange-400">
              <NavLink to="/headlines">Headlines</NavLink>
            </li>
            <li className="hover:text-orange-400">
              <NavLink to="/about">About</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
