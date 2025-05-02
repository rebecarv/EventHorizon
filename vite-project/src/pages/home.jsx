import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Camera, Info, ArrowDown, Menu, Maximize, Minimize, Star, Database } from 'lucide-react';

const Home = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isFullInfoVisible, setIsFullInfoVisible] = useState(false);
  const maxScroll = 3000;

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getDistortionLevel = () => {
    return Math.min(scrollPosition / (maxScroll * 0.7), 1);
  };

  const generateStars = (count) => {
    const stars = [];
    for (let i = 0; i < count; i++) {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const size = Math.random() * 2 + 1;
      const opacity = Math.random() * 0.  + 0.2;

      const centerX = 50;
      const centerY = 50;
      const distanceFromCenter = Math.sqrt(Math.pow(x - centerX, 2) + Math.pow(y - centerY, 2));
      const maxDistance = Math.sqrt(Math.pow(50, 2) + Math.pow(50, 2));
      const normalizedDistance = distanceFromCenter / maxDistance;

      const distortion = getDistortionLevel() * (1 - normalizedDistance) * 20;
      const angle = Math.atan2(y - centerY, x - centerX);
      const pullX = distortion * Math.cos(angle);
      const pullY = distortion * Math.sin(angle);
      const newX = x - pullX;
      const newY = y - pullY;

      stars.push({
        x: newX,
        y: newY,
        size,
        opacity,
        distortion,
        originalX: x,
        originalY: y
      });
    }
    return stars;
  };

  const stars = generateStars(200);
  const blackHoleRadius = 60 + (getDistortionLevel() * 20);
  const accretionDiskRadius = blackHoleRadius + 20;

  return (
    <div className="relative w-full bg-black min-h-screen text-white overflow-x-hidden">
      <div className="fixed inset-0 overflow-hidden">
        {stars.map((star, index) => (
          <div 
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              opacity: star.opacity,
              transform: `scale(${1 + star.distortion * 0.05})`,
              filter: `blur(${star.distortion * 0.3}px)`
            }}
          />
        ))}
      </div>

      <div className="fixed inset-0 flex items-center justify-center">
        <div 
          className="absolute rounded-full"
          style={{
            width: `${accretionDiskRadius * 2}px`,
            height: `${accretionDiskRadius * 0.4}px`,
            background: `conic-gradient(
              from 180deg,
              rgba(255,100,50,0.8),
              rgba(255,200,100,0.8),
              rgba(200,100,255,0.8),
              rgba(100,50,255,0.8),
              rgba(50,50,200,0.8),
              rgba(255,100,50,0.8)
            )`,
            transform: `rotateX(75deg) rotate(${scrollPosition * 0.02}deg)`,
            boxShadow: `0 0 40px 5px rgba(255,150,100,0.6)`,
            filter: `blur(5px)`
          }}
        />

        <div 
          className="absolute rounded-full bg-black"
          style={{
            width: `${blackHoleRadius * 2}px`,
            height: `${blackHoleRadius * 2}px`,
            boxShadow: `0 0 80px 10px rgba(0,0,0,0.8)`,
          }}
        />
      </div>

      <div className="fixed top-0 left-0 right-0 z-10 bg-black bg-opacity-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">Event Horizon</div>
          <div className="flex space-x-6">
            <Link to="/explore" className="flex items-center space-x-2">
              <Star size={18} />
              <span>Explore</span>
            </Link>
            <Link to="/scale" className="flex items-center space-x-2">
              <Database size={18} />
              <span>Scale</span>
            </Link>
            <Link to="/gravitational-lenser" className="flex items-center space-x-2">
              <Camera size={18} />
              <span>Gravitational Lenser</span>
            </Link>
          </div>
          <button className="md:hidden">
            <Menu size={24} />
          </button>
        </div>
      </div>

      <div className="relative">
        <section className="min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Journey to the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500">Event Horizon</span>
            </h1>
            <p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 text-gray-300">
              Explore the mysteries of black holes through interactive visualizations and real astronomical data
            </p>
          </div>
        </section>

          {/* arrow */}
        <div className={`fixed bottom-10 left-1/2 transform -translate-x-1/2 z-10 transition-opacity duration-500 ${scrollPosition > 100 ? 'opacity-0' : 'opacity-100'}`}>
          <div className="flex flex-col items-center animate-bounce text-white">
            <ArrowDown size={32} />
            <span className="block text-sm mt-2">Scroll to begin</span>
          </div>
        </div>

        <div 
          className="fixed bottom-8 right-8 bg-gray-900 bg-opacity-80 backdrop-blur-md rounded-lg p-4 w-80 z-20 transition-all duration-300"
          style={{
            opacity: Math.min(scrollPosition / 500, 1),
            transform: `translateY(${Math.max(0, 100 - scrollPosition / 5)}px)`
          }}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">Black Hole Facts</h3>
            <button 
              className="text-gray-400 hover:text-white"
              onClick={() => setIsFullInfoVisible(!isFullInfoVisible)}
            >
              {isFullInfoVisible ? <Minimize size={18} /> : <Maximize size={18} />}
            </button>
          </div>

          <div className={`transition-all duration-300 overflow-hidden ${isFullInfoVisible ? 'max-h-96' : 'max-h-20'}`}>
            <p className="text-sm text-gray-300 mb-3">
              A black hole's event horizon is the point of no return. Nothing, not even light, can escape once it crosses this threshold.
            </p>
            {isFullInfoVisible && (
              <>
                <p className="text-sm text-gray-300 mb-3">
                  The nearest black hole to Earth is thought to be about 1,500 light-years away.
                </p>
                <p className="text-sm text-gray-300 mb-3">
                  Time appears to slow down near a black hole due to extreme gravitational effects.
                </p>
                <div className="bg-blue-900 bg-opacity-40 rounded p-2 mt-2">
                  <div className="text-xs font-semibold mb-1">Distortion Level</div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${getDistortionLevel() * 100}%` }}
                    ></div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        <div className="h-[3000px]"></div>
      </div>
    </div>
  );
};

export default Home;
