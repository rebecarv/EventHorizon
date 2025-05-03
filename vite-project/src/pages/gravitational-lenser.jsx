import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, MoveHorizontal, Maximize2, Info, ChevronDown, ChevronUp } from 'lucide-react';

const GravitationalLensing = () => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [massValue, setMassValue] = useState(50);
  const [backgroundImage, setBackgroundImage] = useState('galaxy');
  const [showAdvancedInfo, setShowAdvancedInfo] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const canvasRef = useRef(null);
  const canvasContainerRef = useRef(null);
  const requestRef = useRef(null);
  const simulationTimeRef = useRef(0);

  const backgroundOptions = [
    { id: 'galaxy', name: 'Spiral Galaxy' },
    { id: 'stars', name: 'Star Field' },
    { id: 'grid', name: 'Grid Pattern' },
    { id: 'text', name: 'Text Pattern' }
  ];

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw background based on selection
    drawBackground(ctx, canvas.width, canvas.height, backgroundImage);
    
    // Draw gravitational lensing effect
    drawLensingEffect(ctx, centerX, centerY, massValue, simulationTimeRef.current);
    
    // Animation loop
    const animate = (time) => {
      if (isSimulating) {
        simulationTimeRef.current += 0.01;
        
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawBackground(ctx, canvas.width, canvas.height, backgroundImage);
        drawLensingEffect(ctx, centerX, centerY, massValue, simulationTimeRef.current);
      }
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [isSimulating, massValue, backgroundImage]);
  
  const drawBackground = (ctx, width, height, type) => {
    // This is a simplified placeholder - in a real implementation, 
    // you would have more detailed background images
    
    if (type === 'galaxy') {
      // Draw simplified spiral galaxy
      const centerX = width / 2;
      const centerY = height / 2;
      
      // Draw stars
      for (let i = 0; i < 1000; i++) {
        const distance = Math.random() * width / 2;
        const angle = Math.random() * Math.PI * 2;
        const spiralFactor = 0.1;
        
        const x = centerX + distance * Math.cos(angle + distance * spiralFactor);
        const y = centerY + distance * Math.sin(angle + distance * spiralFactor);
        
        const brightness = Math.random() * 200 + 55;
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness + 20})`;
        ctx.globalAlpha = Math.random() * 0.8 + 0.2;
        
        const size = Math.random() * 2 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
      
    } else if (type === 'stars') {
      // Draw random star field
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
      
      for (let i = 0; i < 2000; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const brightness = Math.random() * 200 + 55;
        
        ctx.fillStyle = `rgb(${brightness}, ${brightness}, ${brightness})`;
        ctx.globalAlpha = Math.random() * 0.8 + 0.2;
        
        const size = Math.random() * 2 + 0.5;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;
      
    } else if (type === 'grid') {
      // Draw grid pattern
      ctx.strokeStyle = '#4080ff';
      ctx.lineWidth = 1;
      
      // Vertical lines
      for (let x = 0; x < width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.globalAlpha = 0.3;
        ctx.stroke();
      }
      
      // Horizontal lines
      for (let y = 0; y < height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.globalAlpha = 0.3;
        ctx.stroke();
      }
      ctx.globalAlpha = 1.0;
      
    } else if (type === 'text') {
      // Draw text pattern
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, width, height);
      
      const texts = ['SPACE', 'TIME', 'GRAVITY', 'EINSTEIN', 'RELATIVITY', 'WORMHOLE'];
      ctx.font = '14px monospace';
      
      for (let y = 20; y < height; y += 24) {
        for (let x = 20; x < width; x += 100) {
          const text = texts[Math.floor(Math.random() * texts.length)];
          ctx.fillStyle = '#5080ff';
          ctx.globalAlpha = 0.7;
          ctx.fillText(text, x, y);
        }
      }
      ctx.globalAlpha = 1.0;
    }
  };
  
  const drawLensingEffect = (ctx, centerX, centerY, massValue, time) => {
    // This is a simplification of gravitational lensing
    // A real implementation would use more advanced physics calculations
    
    const radius = 30 + massValue / 2;
    const distortionStrength = massValue / 50;
    
    // Draw black hole
    ctx.fillStyle = 'black';
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fill();
    
    // Add blue glow around the black hole
    const gradient = ctx.createRadialGradient(
      centerX, centerY, radius,
      centerX, centerY, radius * 2
    );
    gradient.addColorStop(0, 'rgba(0, 30, 60, 0.5)');
    gradient.addColorStop(1, 'rgba(0, 30, 60, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
    ctx.fill();
    
    // Draw Einstein ring
    ctx.strokeStyle = 'rgba(100, 200, 255, 0.7)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 1.8, 0, Math.PI * 2);
    ctx.stroke();
    
    // Draw light rays being bent
    const rayCount = 36;
    for (let i = 0; i < rayCount; i++) {
      const angle = (i / rayCount) * Math.PI * 2 + time;
      
      // Starting position far away
      const startDist = 400;
      const startX = centerX + Math.cos(angle) * startDist;
      const startY = centerY + Math.sin(angle) * startDist;
      
      // Draw path of light
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      
      // Create bend effect with bezier curve
      const controlDist = radius * (5 - distortionStrength);
      const controlX = centerX + Math.cos(angle) * controlDist;
      const controlY = centerY + Math.sin(angle) * controlDist;
      
      // End point (slightly bent around black hole)
      const bendAngle = 0.4 * distortionStrength;
      const endAngle = angle + Math.PI + bendAngle;
      const endDist = 400;
      const endX = centerX + Math.cos(endAngle) * endDist;
      const endY = centerY + Math.sin(endAngle) * endDist;
      
      ctx.quadraticCurveTo(controlX, controlY, endX, endY);
      
      ctx.strokeStyle = 'rgba(100, 180, 255, 0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
    
    // Visual indicators for gravitational strength
    for (let r = 1; r <= 3; r++) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * (r * 1.2), 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(100, 150, 255, ${0.2 / r})`;
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  };
  
  const resetSimulation = () => {
    simulationTimeRef.current = 0;
    setIsSimulating(false);
  };
  
  const toggleFullscreen = () => {
    const container = canvasContainerRef.current;
    
    if (!fullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    
    setFullscreen(!fullscreen);
  };
  
  useEffect(() => {
    const handleFullscreenChange = () => {
      setFullscreen(!!document.fullscreenElement);
    };
    
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);
  
  // Added effect to resize canvas when container changes (like when entering fullscreen)
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current || !canvasContainerRef.current) return;
      
      const container = canvasContainerRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      
      // Redraw immediately after resize
      const ctx = canvas.getContext('2d');
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBackground(ctx, canvas.width, canvas.height, backgroundImage);
      drawLensingEffect(ctx, centerX, centerY, massValue, simulationTimeRef.current);
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial sizing
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [backgroundImage, massValue]);
  
  return (
    <div className="min-h-screen bg-black text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-2">Gravitational Lensing Visualizer</h2>
        <p className="text-gray-300 mb-6">Explore how massive objects like black holes bend light through the fabric of spacetime, creating cosmic magnifying lenses.</p>
        
        <div className="bg-gray-900 rounded-xl overflow-hidden shadow-lg">
          {/* Canvas container */}
          <div 
            ref={canvasContainerRef}
            className={`relative ${fullscreen ? 'fixed inset-0 z-50 bg-black' : 'h-96'}`}
          >
            <canvas 
              ref={canvasRef} 
              className="w-full h-full object-cover"
            />
            
            {/* Fullscreen button */}
            <button
              onClick={toggleFullscreen}
              className="absolute top-4 right-4 bg-gray-800 bg-opacity-70 p-2 rounded-full hover:bg-opacity-100 transition-opacity"
            >
              <Maximize2 size={20} />
            </button>
            
            {/* Mass indicator */}
            <div className="absolute bottom-4 left-4 bg-gray-900 bg-opacity-70 px-3 py-1 rounded-md text-sm">
              Black Hole: {massValue} Solar Masses
            </div>
          </div>
        
          {/* Controls */}
          <div className="bg-gray-800 p-4">
            <div className="flex flex-wrap items-center gap-6">
              {/* Play/Pause control */}
              <div>
                <button 
                  onClick={() => setIsSimulating(!isSimulating)}
                  className="bg-blue-600 hover:bg-blue-700 rounded-full w-12 h-12 flex items-center justify-center"
                >
                  {isSimulating ? <Pause size={24} /> : <Play size={24} />}
                </button>
              </div>
              
              {/* Mass slider */}
              <div className="flex-1">
                <div className="flex justify-between text-sm mb-1">
                  <label>Mass</label>
                  <span>{massValue} Solar Masses</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="100" 
                  value={massValue}
                  onChange={(e) => setMassValue(parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-gray-700"
                />
                <div className="text-xs text-gray-400 mt-1">
                  Observe how increasing mass creates stronger gravitational lensing effects
                </div>
              </div>
              
              {/* Background selector */}
              <div className="flex-none">
                <label className="block text-sm mb-1">Background</label>
                <select 
                  value={backgroundImage}
                  onChange={(e) => setBackgroundImage(e.target.value)}
                  className="bg-gray-700 rounded px-3 py-1 text-sm"
                >
                  {backgroundOptions.map(option => (
                    <option key={option.id} value={option.id}>{option.name}</option>
                  ))}
                </select>
              </div>
              
              {/* Reset button */}
              <div>
                <button 
                  onClick={resetSimulation}
                  className="flex items-center bg-gray-700 hover:bg-gray-600 rounded px-3 py-1"
                >
                  <RotateCcw size={16} className="mr-2" />
                  Reset
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Information panel */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">What is Gravitational Lensing?</h3>
            <p className="text-gray-300">
              Gravitational lensing occurs when a massive object (like a black hole or galaxy) warps spacetime, 
              causing light from distant objects to bend around it. This creates multiple images, rings, or arcs 
              of the background object.
            </p>
            <p className="text-gray-300 mt-3">
              Einstein predicted this effect in his Theory of General Relativity. The first observation of 
              gravitational lensing was during a solar eclipse in 1919, which helped confirm Einstein's theory.
            </p>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Types of Lensing</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <div className="bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">1</div>
                <div>
                  <h4 className="font-medium">Strong Lensing</h4>
                  <p className="text-sm text-gray-400">Creates arcs, rings, and multiple images when light passes very close to massive objects.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">2</div>
                <div>
                  <h4 className="font-medium">Weak Lensing</h4>
                  <p className="text-sm text-gray-400">Subtle distortions in galaxy shapes, used to map dark matter distribution.</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-900 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3 mt-1">3</div>
                <div>
                  <h4 className="font-medium">Microlensing</h4>
                  <p className="text-sm text-gray-400">Temporary brightening of stars when another object passes in front of them.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Additional info sections */}
          <div className="bg-gray-900 rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">Scientific Applications</h3>
            <div className="space-y-3">
              <p className="text-gray-300">
                Gravitational lensing is a powerful tool in modern astronomy. Scientists use it to:
              </p>
              <ul className="list-disc pl-5 text-gray-300 space-y-2">
                <li>Map the distribution of dark matter in the universe</li>
                <li>Detect exoplanets through microlensing events</li>
                <li>Observe very distant galaxies magnified by lensing effects</li>
                <li>Test theories of gravity and measure the expansion rate of the universe</li>
              </ul>
            </div>
          </div>
          
          <div className="bg-gray-900 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">The Mathematics Behind It</h3>
              <button 
                onClick={() => setShowAdvancedInfo(!showAdvancedInfo)}
                className="text-blue-400 hover:text-blue-300 flex items-center"
              >
                {showAdvancedInfo ? (
                  <>Less <ChevronUp size={16} className="ml-1" /></>
                ) : (
                  <>More <ChevronDown size={16} className="ml-1" /></>
                )}
              </button>
            </div>
            
            <p className="text-gray-300">
              According to Einstein's General Relativity, mass curves spacetime. Light follows this curvature, 
              creating the lensing effect we observe.
            </p>
            
            {showAdvancedInfo && (
              <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                <p className="text-sm text-gray-300">
                  The basic equation for gravitational lensing relates the deflection angle α to the mass M:
                </p>
                <div className="bg-gray-700 p-3 rounded my-2 font-mono text-blue-300 text-center">
                  α = 4GM/c²r
                </div>
                <p className="text-sm text-gray-400">
                  Where G is the gravitational constant, c is the speed of light, 
                  and r is the impact parameter (closest approach distance).
                </p>
                <p className="text-sm text-gray-300 mt-3">
                  For a point mass lens, the Einstein radius θₑ (angular radius of the Einstein ring) is:
                </p>
                <div className="bg-gray-700 p-3 rounded my-2 font-mono text-blue-300 text-center">
                  θₑ = √(4GM/c² · (Dls/Ds·Dl))
                </div>
                <p className="text-sm text-gray-400">
                  Where Dls is the distance between lens and source, Ds is the distance to the source, 
                  and Dl is the distance to the lens.
                </p>
              </div>
            )}
          </div>
        </div>
        
        {/* Famous examples section */}
        <div className="mt-8 bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-4">Famous Examples of Gravitational Lensing</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 bg-gray-800 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">Einstein Cross</h4>
              <p className="text-sm text-gray-300">
                A quasar that appears as four separate images due to a galaxy directly in our line of sight.
                This cross-shaped arrangement was one of the first strong lensing examples discovered.
              </p>
            </div>
            
            <div className="p-4 bg-gray-800 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">Cosmic Horseshoe</h4>
              <p className="text-sm text-gray-300">
                A nearly complete Einstein ring formed when a massive galaxy bends light from a more
                distant blue galaxy, creating a horseshoe shape almost 10 arcseconds across.
              </p>
            </div>
            
            <div className="p-4 bg-gray-800 rounded-lg">
              <h4 className="font-medium text-blue-400 mb-2">Bullet Cluster</h4>
              <p className="text-sm text-gray-300">
                A collision of galaxy clusters that provided evidence for dark matter. Gravitational lensing
                reveals mass distribution that doesn't match the visible matter.
              </p>
            </div>
          </div>
        </div>
        
        {/* Educational resources */}
        <div className="mt-8 bg-gray-900 rounded-lg p-6">
          <h3 className="text-xl font-semibold mb-6">Learn More About Gravitational Lensing</h3>
          
          <div className="flex flex-col md:flex-row gap-6">
            <div className="bg-gray-800 rounded-lg p-4 flex-1">
              <h4 className="flex items-center text-lg font-medium mb-3">
                <Info size={20} className="mr-2 text-blue-400" />
                Educational Resources
              </h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  <a href="https://science.nasa.gov/mission/webb/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  NASA's Webb Telescope: Lensing Studies
                  </a>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  <a href="https://esahubble.org/" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  ESA Hubble Space Telescope: Lensing Gallery
                  </a>
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                  <a href="https://phet.colorado.edu/en/simulations/gravity-force-lab" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  Interactive Simulations: PHET Gravity Lab
                  </a>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 flex-1">
              <h4 className="text-lg font-medium mb-3">Fun Facts</h4>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 mt-2"></div>
                  <span>The largest Einstein rings discovered are several arcseconds across, which is tiny compared to the moon's apparent size of 1800 arcseconds.</span>
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-2 mt-2"></div>
                  <span>Gravitational lensing can magnify distant galaxies by factors of 20-50x, acting like a natural telescope.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GravitationalLensing;