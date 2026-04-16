import React from 'react';
import { NavLink } from 'react-router-dom';
import { NotebookTabs } from 'lucide-react';
import { Store } from 'lucide-react';

const Header = () => {
  return (
    <>
      <div className="bg-black text-white p-4 sticky top-0 z-10 mx-auto flex items-center justify-between">
        <NavLink to="/headlines">
          <h1 className="text-5xl font-extrabold">NewsHub</h1>
        </NavLink>
        <nav>
          <ul className="flex items-center gap-6 text-lg">
            <li>
              <NavLink to="/headlines" className={'hover:underline '}>
                <NotebookTabs size={20} className="inline-block mr-1 pb-1" />
                Headlines
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={'hover:underline '}>
                <Store size={20} className="inline-block mr-1 pb-1" />
                About
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Header;
