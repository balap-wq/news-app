import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <>
        <div className="bg-black text-white p-4 sticky top-0 z-10 mx-auto">
            <NavLink to="/headlines"><h1 className='text-5xl font-extrabold'>NewsHub</h1></NavLink>
        </div>
    </>
  )
}

export default Header
