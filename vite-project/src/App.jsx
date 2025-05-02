import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './pages/explore';
import Scale from './pages/scale';
import GravitationalLenser from './pages/gravitational-lenser';
import Home from './pages/Home';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/explore" element={<Explore />} />
      <Route path="/scale" element={<Scale />} />
      <Route path="/gravitational-lenser" element={<GravitationalLenser />} />
    </Routes>
  </Router>
);

export default App;
