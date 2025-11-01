import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Error() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <section className="text-center space-y-6">
        <div>
          <h2 className="text-6xl font-bold text-indigo-500">404</h2>
          <h4 className="text-2xl font-semibold mt-4">Sorry! Page not found</h4>
          <p className="text-gray-400 mt-2">Oops! Something went wrong</p>
        </div>
        <div className="flex justify-center gap-4">
          <NavLink
            to="/"
            className="bg-indigo-600 hover:bg-indigo-700 px-5 py-2 rounded-md transition"
          >
            Return Home
          </NavLink>
         
        </div>
      </section>
    </div>
  )
}
