import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Scale from "./pages/Scale";
import GravitationalLenser from "./pages/gravitational-lenser";

const App = () => {
  return (
    <Router basename='/EventHorizon'>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/scale" element={<Scale />} />
          <Route path="/gravitational-lenser" element={<GravitationalLenser />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
