import { Star, Database, Camera, Menu, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-black bg-opacity-70 text-white p-5 flex justify-between items-center fixed top-0 left-0 right-0 z-50 backdrop-blur-md">
      <div className="text-xl font-bold px-2">Event Horizon</div>
      <div className="flex space-x-6">
        <Link to="/" className="flex items-center space-x-2 hover:text-purple-400">
          <Home size={18} />
          <span>Home</span>
        </Link>
        <Link to="/explore" className="flex items-center space-x-2 hover:text-purple-400">
          <Star size={18} />
          <span>Explore</span>
        </Link>
        <Link to="/scale" className="flex items-center space-x-2 hover:text-purple-400">
          <Database size={18} />
          <span>Scale</span>
        </Link>
        <Link to="/gravitational-lenser" className="flex items-center space-x-2 hover:text-purple-400">
          <Camera size={18} />
          <span>Gravitational Lenser</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
