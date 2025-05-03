import React from 'react';
import Navbar from '../components/Navbar';

const Explore = () => {
  return (
    <div className="min-h-screen bg-black text-white pt-16 p-8">
      <Navbar />
      <h1 className="text-5xl font-bold mb-6">Explore</h1>
      <p className="text-lg text-gray-300 max-w-2xl">
        Dive into the structure of black holes, their types, and the mysterious physics around event horizons.
      </p>
    </div>
  );
};

export default Explore;
