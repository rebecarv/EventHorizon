import React, { useState, useEffect, useRef } from 'react';
import { Sliders, Info, RefreshCw, Camera, Download } from 'lucide-react';

const Explore = () => {
  const [parameters, setParameters] = useState({
    mass: 50, // Solar masses
    spin: 30, // Percentage of maximum spin
    distance: 40, // Observer distance
    accretionRate: 60, // Rate of matter falling in
  });
  
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [activeFact, setActiveFact] = useState(0);
  
  // Facts that appear based on current parameters
  const facts = [
    "A black hole with this mass would have an event horizon about 300 km in diameter.",
    "At this spin rate, the black hole creates a significant ergosphere where space itself is dragged along.",
    "The gravitational lensing effect would be visible from this observation distance.",
    "This accretion rate would generate X-rays detectable by space telescopes."
  ];
  
  // Calculate visualization parameters based on user inputs
  const eventHorizonSize = 100 + (parameters.mass / 2);
  const ergosphereSize = eventHorizonSize * (1 + (parameters.spin / 100));
  const diskBrightness = 50 + parameters.accretionRate;
  const diskSize = eventHorizonSize * 3;
  const distortionFactor = (100 - parameters.distance) / 25;
  
  // Rotate through facts every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFact((prev) => (prev + 1) % facts.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [facts.length]);
  
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Visualization Area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden">
          {/* Star field background */}
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
                  filter: `blur(${Math.random() > 0.8 ? '1px' : '0px'})`,
                  transform: `scale(${1 + Math.random() * 0.5})`
                }}
              />
            ))}
          </div>
          
          {/* Gravitational lensing effect (light bending) */}
          <div className="absolute inset-0 z-0">
            {[...Array(10)].map((_, i) => {
              const angle = (i / 10) * Math.PI * 2;
              const distance = 160 - (i * 8); // Decreasing distance
              const xPos = Math.cos(angle) * distance + 50;
              const yPos = Math.sin(angle) * distance + 50;
              const distortion = distortionFactor * (1 - i/10);
              
              return (
                <div
                  key={`lens-${i}`}
                  className="absolute"
                  style={{
                    left: `calc(50% - ${distance/2}px)`,
                    top: `calc(50% - ${distance/5}px)`,
                    width: `${distance}px`,
                    height: `${distance/10}px`,
                    transform: `rotate(${angle * 180 / Math.PI}deg) scaleX(${1 + distortion}) scaleY(${0.8 - distortion/10})`,
                    opacity: 0.3 - (i / 30),
                    background: 'linear-gradient(to right, transparent, rgba(100, 150, 255, 0.3), transparent)',
                    borderRadius: '50%',
                    filter: `blur(${2 + distortion}px)`
                  }}
                />
              );
            })}
          </div>
          
          {/* Ergosphere (spinning effect zone) */}
          {parameters.spin > 0 && (
            <div 
              className="absolute rounded-full"
              style={{
                width: `${ergosphereSize * 2}px`,
                height: `${ergosphereSize * 2}px`,
                background: 'radial-gradient(circle, rgba(30,30,70,0.4) 0%, rgba(20,20,60,0) 70%)',
                boxShadow: `0 0 ${ergosphereSize/2}px rgba(50,50,200,0.1)`,
              }}
            />
          )}
          
          {/* Accretion disk */}
          <div 
            className="absolute"
            style={{
              width: `${diskSize * 2}px`,
              height: `${diskSize * 0.4}px`,
              borderRadius: '50%',
              background: `conic-gradient(
                from ${parameters.spin / 2}deg,
                rgba(${diskBrightness + 100},50,50,0.9),
                rgba(${diskBrightness + 150},${diskBrightness + 100},50,0.8),
                rgba(${diskBrightness + 180},${diskBrightness + 150},${diskBrightness},0.8),
                rgba(${diskBrightness + 100},${diskBrightness + 50},${diskBrightness + 150},0.9),
                rgba(${diskBrightness + 50},50,${diskBrightness + 100},0.8),
                rgba(${diskBrightness + 100},50,50,0.9)
              )`,
              transform: `rotateX(75deg)`,
              boxShadow: `0 0 ${parameters.accretionRate}px ${parameters.accretionRate/5}px rgba(255,${diskBrightness + 100},100,0.5)`,
              animation: `spin ${30 - (parameters.spin / 5)}s linear infinite`,
              opacity: parameters.accretionRate / 100
            }}
          />
          
          {/* Black hole event horizon */}
          <div 
            className="absolute rounded-full bg-black z-10"
            style={{
              width: `${eventHorizonSize * 2}px`,
              height: `${eventHorizonSize * 2}px`,
              boxShadow: `0 0 50px 10px rgba(0,0,0,0.9)`,
            }}
          />
          
          {/* Measurement grid (togglable) */}
          <div className="absolute inset-0 grid grid-cols-10 grid-rows-10 opacity-20 pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <React.Fragment key={`grid-${i}`}>
                <div className="absolute left-0 right-0" style={{ top: `${i * 10}%`, height: '1px', background: 'rgba(100,100,255,0.3)' }} />
                <div className="absolute top-0 bottom-0" style={{ left: `${i * 10}%`, width: '1px', background: 'rgba(100,100,255,0.3)' }} />
              </React.Fragment>
            ))}
          </div>
          
          {/* Scale indicator */}
          <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-900 bg-opacity-60 backdrop-blur-sm px-4 py-2 rounded-full">
            <div className="flex items-center space-x-2">
              <div className="h-1 w-20 bg-blue-400" />
              <span className="text-sm">10,000 km</span>
            </div>
          </div>
          
          {/* Fact display */}
          <div className="absolute top-6 left-6 max-w-md bg-gray-900 bg-opacity-50 backdrop-blur-sm p-4 rounded-lg border border-gray-700">
            <h3 className="text-blue-300 text-sm font-medium flex items-center">
              <Info size={16} className="mr-2" />
              DID YOU KNOW?
            </h3>
            <p className="text-sm mt-1 text-gray-200">{facts[activeFact]}</p>
          </div>
        </div>
        
        {/* Control Panel (toggle open/closed) */}
        <div 
          className={`bg-black/60 backdrop-blur-sm shadow-lg shadow-white/10 rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${isControlsOpen ? 'w-80' : 'w-12'}`}
        >
          <button 
            className="h-12 w-12 flex items-center justify-center"
            onClick={() => setIsControlsOpen(!isControlsOpen)}
          >
            <Sliders size={24} className={`transition-transform duration-300 ${isControlsOpen ? 'rotate-90' : ''} `} />
          </button>
          
          {isControlsOpen && (
            <div className="p-4">
              <h2 className="text-xl font-bold mb-4">Black Hole Parameters</h2>
              
              {/* Mass slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <label className="text-sm">Mass (Solar Masses)</label>
                  <span className="text-sm font-mono">{parameters.mass}</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={parameters.mass}
                  onChange={(e) => setParameters({...parameters, mass: parseInt(e.target.value)})}
                  className="w-full h-2 rounded-full appearance-none bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Stellar</span>
                  <span>Supermassive</span>
                </div>
              </div>
              
              {/* Spin slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <label className="text-sm">Spin Rate (%)</label>
                  <span className="text-sm font-mono">{parameters.spin}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={parameters.spin}
                  onChange={(e) => setParameters({...parameters, spin: parseInt(e.target.value)})}
                  className="w-full h-2 rounded-full appearance-none bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>None</span>
                  <span>Maximum</span>
                </div>
              </div>
              
              {/* Distance slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <label className="text-sm">Observation Distance</label>
                  <span className="text-sm font-mono">{parameters.distance}</span>
                </div>
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  value={parameters.distance}
                  onChange={(e) => setParameters({...parameters, distance: parseInt(e.target.value)})}
                  className="w-full h-2 rounded-full appearance-none bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Close</span>
                  <span>Far</span>
                </div>
              </div>
              
              {/* Accretion disk slider */}
              <div className="mb-6">
                <div className="flex justify-between mb-1">
                  <label className="text-sm">Accretion Rate</label>
                  <span className="text-sm font-mono">{parameters.accretionRate}</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={parameters.accretionRate}
                  onChange={(e) => setParameters({...parameters, accretionRate: parseInt(e.target.value)})}
                  className="w-full h-2 rounded-full appearance-none bg-gray-700"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
              
              {/* Reset button */}
              <button className="flex items-center justify-center w-full py-2 bg-blue-900 hover:bg-blue-800 rounded-md text-sm"
              onClick={() => setParameters({ mass: 50, spin: 30, distance: 40, accretionRate: 60 })}>
                <RefreshCw size={16} className="mr-2" />
                Reset to Defaults
              </button>
              
              {/* Advanced options (collapsible) */}
              <div className="mt-6 pt-4 border-t border-gray-800">
                <h3 className="text-sm font-semibold mb-2">View Presets</h3>
                <div className="grid grid-cols-2 gap-2">
                  <button className="px-2 py-1 text-xs bg-gray-800 rounded">Sagittarius A*</button>
                  <button className="px-2 py-1 text-xs bg-gray-800 rounded">M87</button>
                  <button className="px-2 py-1 text-xs bg-gray-800 rounded">Cygnus X-1</button>
                  <button className="px-2 py-1 text-xs bg-gray-800 rounded">TON 618</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Information panel at bottom */}
      <div className="bg-black/60 backdrop-blur-sm shadow-lg shadow-white/10 rounded-lg p-4">
        <div className="flex justify-between text-sm">
          <div>
            <span className="text-gray-400">Event Horizon Radius:</span> 
            <span className="ml-2 font-mono">{(parameters.mass * 3).toLocaleString()} km</span>
          </div>
          <div>
            <span className="text-gray-400">Temperature:</span> 
            <span className="ml-2 font-mono">{Math.round(1000000 / parameters.mass).toLocaleString()} K</span>
          </div>
          <div>
            <span className="text-gray-400">Gravitational Force:</span> 
            <span className="ml-2 font-mono">{(parameters.mass * 1000 / Math.pow(parameters.distance, 2)).toFixed(2)} G</span>
          </div>
        </div>
      </div>
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes spin {
          from { transform: rotateX(75deg) rotate(0deg); }
          to { transform: rotateX(75deg) rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Explore;
