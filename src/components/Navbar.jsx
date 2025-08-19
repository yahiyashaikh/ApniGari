import React from 'react';
import { Link } from "react-router-dom"; // Import Link for navigation

const Navbar = ({ viewMode, setViewMode, setSignInOpen, setRegisterOpen }) => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 shadow bg-white">
      <h1 className="text-2xl font-bold text-red-600">APNIGARI</h1>
      <ul className="hidden md:flex gap-6 font-medium text-gray-800 items-center">
        <li>
          <Link to="/" className="hover:text-red-600">Home</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-red-600">About</Link>
        </li>
        <li>
          <Link to="/contact" className="hover:text-red-600">Contact Us</Link>
        </li>

        {/* Dropdown for Car/Bike */}
        <li>
          <select
            value={viewMode}
            onChange={(e) => setViewMode(e.target.value)}
            className="px-3 py-2 border rounded-lg text-gray-700 focus:ring-2 focus:ring-red-600"
          >
            <option value="car">Cars</option>
            <option value="bike">Bikes</option>
          </select>
        </li>
      </ul>
      <div className="flex gap-4">
        <button
          onClick={() => setSignInOpen(true)}
          className="px-4 py-2 text-gray-700 font-medium hover:text-red-600"
        >
          Sign In
        </button>
        <button
          onClick={() => setRegisterOpen(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Register Now
        </button>
      </div>
    </nav>
  );
};

export default Navbar;