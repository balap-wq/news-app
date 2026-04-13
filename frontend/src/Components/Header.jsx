import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <div className="bg-black text-white p-4 sticky top-0 z-10 mx-auto flex items-center justify-between">
        <NavLink to="/headlines">
          <h1 className="text-5xl font-extrabold">NewsHub</h1>
        </NavLink>
        <nav>
          <ul className="flex space-x-4 mt-2 md:block">
            <li>
              <NavLink to="/headlines" className={"hover:underline "}>Headlines</NavLink>
            </li>
            <li>
              <NavLink to="/about" className={"hover:underline "}>
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
