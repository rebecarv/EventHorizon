import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Info } from 'lucide-react';

const Scale = () => {
  const [activeIndex, setActiveIndex] = useState(3);
  const [showInfo, setShowInfo] = useState(null);
  
  // Celestial objects in order of size (smallest to largest)
  const objects = [
    {
      id: 0,
      name: "Manhattan Island",
      type: "Reference",
      diameter: "21.6 km",
      diameterValue: 21.6,
      description: "Manhattan Island in New York City, shown for scale comparison with cosmic objects.",
      color: "#70A0AF"
    },
    {
      id: 1,
      name: "Neutron Star",
      type: "Stellar Remnant",
      diameter: "20 km",
      diameterValue: 20,
      description: "Incredibly dense star composed mostly of neutrons. A teaspoon would weigh billions of tons.",
      color: "#80CCFF"
    },
    {
      id: 2,
      name: "Stellar Black Hole",
      type: "Black Hole",
      diameter: "30 km",
      diameterValue: 30,
      description: "Formed from the collapse of a single massive star. The most common type of black hole.",
      color: "#101020"
    },
    {
      id: 3,
      name: "Sagittarius A*",
      type: "Supermassive Black Hole",
      diameter: "44 million km",
      diameterValue: 44000000,
      description: "The supermassive black hole at the center of our Milky Way galaxy, about 4.3 million times the mass of our Sun.",
      color: "#000000"
    },
    {
      id: 4,
      name: "M87's Black Hole",
      type: "Supermassive Black Hole",
      diameter: "120 billion km",
      diameterValue: 120000000000,
      description: "The first black hole ever imaged. Located in the M87 galaxy, it's 6.5 billion times the mass of our Sun.",
      color: "#000000"
    },
    {
      id: 5,
      name: "TON 618",
      type: "Ultramassive Black Hole",
      diameter: "390 billion km",
      diameterValue: 390000000000,
      description: "One of the most massive known black holes, about 66 billion times the mass of our Sun.",
      color: "#000000"
    }
  ];
  
  const activeObject = objects[activeIndex];
  
  // Calculate relative sizes for visualization
  const getRelativeSize = (object) => {
    // Logarithmic scale to handle the vast size differences
    const maxSize = 85; // maximum size percentage
    const minSize = 1; // minimum size percentage
    
    if (object.id === activeIndex) {
      return maxSize;
    }
    
    const ratio = object.diameterValue / activeObject.diameterValue;
    
    if (ratio > 1) {
      // Object is larger than active object
      return Math.min(maxSize, maxSize * Math.log10(ratio) / 2 + maxSize);
    } else {
      // Object is smaller than active object
      return Math.max(minSize, maxSize * (1 + Math.log10(ratio) / 2));
    }
  };
  
  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, objects.length - 1));
    setShowInfo(null);
  };
  
  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
    setShowInfo(null);
  };
  
  const renderAccretionDisk = (object) => {
    if (object.type.includes("Black Hole")) {
      const size = getRelativeSize(object);
      return (
        <div 
          className="absolute rounded-full"
          style={{
            width: `${size * 2}%`,
            height: `${size * 0.3}%`,
            transform: 'rotateX(75deg)',
            background: 'linear-gradient(90deg, rgba(255,100,50,0.8), rgba(255,150,100,0.8), rgba(255,200,150,0.8))',
            boxShadow: '0 0 20px rgba(255,150,100,0.6)',
            filter: 'blur(2px)',
            zIndex: 1
          }}
        />
      );
    }
    return null;
  };
  
  // Format large numbers with scientific notation
  const formatLargeNumber = (num) => {
    if (num >= 1_000_000) {
      const exponent = Math.floor(Math.log10(num));
      const mantissa = num / Math.pow(10, exponent);
      return `${mantissa.toFixed(2)} × 10^${exponent}`;
    }
    return num.toLocaleString();
  };
  
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-6xl mx-auto p-4">
        <h2 className="text-3xl font-bold mb-6">Cosmic Scale Comparison</h2>
        
        <div className="bg-gradient-to-b from-gray-900 to-gray-950 rounded-xl shadow-2xl overflow-hidden">
          {/* Main visualization area */}
          <div className="h-96 relative flex items-center justify-center overflow-hidden">
            {/* Star background */}
            <div className="absolute inset-0">
              {[...Array(100)].map((_, i) => (
                <div
                  key={i}
                  className="absolute rounded-full bg-white"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: `${Math.random() * 2 + 1}px`,
                    height: `${Math.random() * 2 + 1}px`,
                    opacity: Math.random() * 0.8 + 0.2,
                  }}
                />
              ))}
            </div>
            
            {/* Object visualization */}
            <div className="relative flex items-center justify-center w-full h-full">
              {/* Render all objects */}
              {objects.map((object) => {
                const size = getRelativeSize(object);
                return (
                  <div key={object.id} className="absolute">
                    {renderAccretionDisk(object)}
                    <div
                      className="rounded-full relative"
                      style={{
                        width: `${size}%`,
                        height: `${size}%`,
                        backgroundColor: object.color,
                        boxShadow: object.type.includes("Black Hole") ? '0 0 40px 5px rgba(0,0,0,0.8)' : 'none',
                        opacity: object.id === activeIndex ? 1 : 0.5,
                        transition: 'all 0.5s ease-in-out',
                        zIndex: 2
                      }}
                    >
                      {/* Label for active object */}
                      {object.id === activeIndex && (
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 text-center">
                          <div className="text-xl font-bold text-blue-300">{object.name}</div>
                          <div className="text-sm text-gray-400">{object.type}</div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Information popup */}
              {showInfo !== null && (
                <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 bg-opacity-90 backdrop-blur-sm p-4 rounded-lg shadow-lg w-80">
                  <h3 className="text-lg font-semibold mb-2">{objects[showInfo].name}</h3>
                  <p className="text-sm text-gray-300">{objects[showInfo].description}</p>
                  <button 
                    className="absolute top-2 right-2 text-gray-400 hover:text-white"
                    onClick={() => setShowInfo(null)}
                  >
                    ×
                  </button>
                </div>
              )}
            </div>
          </div>
          
          {/* Controls and info */}
          <div className="bg-gray-800 p-4">
            <div className="flex items-center justify-between">
              {/* Navigation controls */}
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handlePrev} 
                  disabled={activeIndex === 0}
                  className={`rounded-full w-10 h-10 flex items-center justify-center ${activeIndex === 0 ? 'bg-gray-700 text-gray-500' : 'bg-blue-900 hover:bg-blue-800'}`}
                >
                  <ChevronLeft size={24} />
                </button>
                
                <button 
                  onClick={handleNext}
                  disabled={activeIndex === objects.length - 1}
                  className={`rounded-full w-10 h-10 flex items-center justify-center ${activeIndex === objects.length - 1 ? 'bg-gray-700 text-gray-500' : 'bg-blue-900 hover:bg-blue-800'}`}
                >
                  <ChevronRight size={24} />
                </button>
              </div>
              
              {/* Object information */}
              <div className="text-center flex-1">
                <div className="text-xl font-bold">{activeObject.name}</div>
                <div className="text-sm text-gray-400">Diameter: {activeObject.diameter}</div>
              </div>
              
              {/* Info button */}
              <button 
                onClick={() => setShowInfo(activeIndex)}
                className="rounded-full w-10 h-10 flex items-center justify-center bg-gray-700 hover:bg-gray-600"
              >
                <Info size={20} />
              </button>
            </div>
          </div>
          
          {/* Object selection strip */}
          <div className="bg-gray-900 p-4 overflow-x-auto">
            <div className="flex space-x-4 min-w-max">
              {objects.map((object) => (
                <button
                  key={object.id}
                  className={`flex-none rounded-lg p-3 transition ${activeIndex === object.id ? 'bg-blue-900' : 'bg-gray-800 hover:bg-gray-700'}`}
                  onClick={() => {
                    setActiveIndex(object.id);
                    setShowInfo(null);
                  }}
                >
                  <div className="w-32 text-center">
                    <div className="font-medium truncate">{object.name}</div>
                    <div className="text-xs text-gray-400 mt-1">{object.type}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Data tables and additional information */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Properties of {activeObject.name}</h3>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-400">Diameter</td>
                  <td className="py-2 text-right">{activeObject.diameter}</td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-400">Mass</td>
                  <td className="py-2 text-right">
                    {activeObject.type.includes("Black Hole") 
                      ? activeObject.id === 2 
                        ? "~10 solar masses" 
                        : `~${formatLargeNumber(activeObject.diameterValue * 100)} solar masses`
                      : "N/A"}
                  </td>
                </tr>
                <tr className="border-b border-gray-800">
                  <td className="py-2 text-gray-400">Event Horizon</td>
                  <td className="py-2 text-right">
                    {activeObject.type.includes("Black Hole") ? activeObject.diameter : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-400">Location</td>
                  <td className="py-2 text-right">
                    {activeObject.id === 0 ? "Earth" :
                     activeObject.id === 3 ? "Center of Milky Way" :
                     activeObject.id === 4 ? "M87 Galaxy" :
                     activeObject.id === 5 ? "Quasar TON 618" : "Various"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Interesting Facts</h3>
            <ul className="space-y-3 text-sm">
              {activeObject.id === 0 && (
                <>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Manhattan is approximately 21.6 km long, providing a relatable scale reference.</span>
                  </li>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>This familiar location helps visualize the scale of cosmic objects.</span>
                  </li>
                </>
              )}
              
              {activeObject.id === 1 && (
                <>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>The gravity on a neutron star's surface is 2 billion times stronger than Earth's.</span>
                  </li>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>They can spin up to 600 times per second, faster than a kitchen blender.</span>
                  </li>
                </>
              )}
              
              {activeObject.id === 2 && (
                <>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Stellar black holes form when massive stars collapse at the end of their life cycle.</span>
                  </li>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Despite their small size, they have gravitational pulls so strong that not even light can escape.</span>
                  </li>
                </>
              )}
              
              {activeObject.id === 3 && (
                <>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Sagittarius A* is located about 26,000 light-years from Earth.</span>
                  </li>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>In 2022, the Event Horizon Telescope captured the first image of this black hole.</span>
                  </li>
                </>
              )}
              
              {activeObject.id === 4 && (
                <>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>The first black hole ever imaged by the Event Horizon Telescope in 2019.</span>
                  </li>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>Located 55 million light-years from Earth in the Messier 87 galaxy.</span>
                  </li>
                </>
              )}
              
              {activeObject.id === 5 && (
                <>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>TON 618 is one of the most massive known black holes in the universe.</span>
                  </li>
                  <li className="flex">
                    <span className="text-blue-400 mr-2">•</span>
                    <span>It's located approximately 10.4 billion light-years from Earth.</span>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scale;