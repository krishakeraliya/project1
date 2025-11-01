import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../store/auth'

export default function Navbar() {
  const { isloggedin } = useAuth();

  return (
    <header className="bg-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        
        {/* Logo / Brand */}
        <div className="text-2xl font-bold text-purple-400 tracking-wide">
          <NavLink to="/">CareerPrep</NavLink>
        </div>

        {/* Nav Items */}
        <nav>
          <ul className="flex gap-6 text-lg items-center">
            <li>
              <NavLink 
                to="/" 
                className="hover:text-purple-400 transition"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink 
                to="/about" 
                className="hover:text-purple-400 transition"
              >
                About
              </NavLink>
            </li>

            {isloggedin ? (
              <li>
                <NavLink 
                  to="/logout" 
                  className="bg-purple-500 px-4 py-2 rounded-lg text-black font-semibold hover:bg-purple-400 transition"
                >
                  Logout
                </NavLink>
              </li>
            ) : null}
          </ul>
        </nav>
      </div>
    </header>
  )
}
