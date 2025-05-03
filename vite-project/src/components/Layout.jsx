import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main className="pt-16 min-h-screen bg-black text-white">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
