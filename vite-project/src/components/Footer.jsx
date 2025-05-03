import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-80 text-gray-400 text-sm text-center py-4 mt-12">
      <p>&copy; {new Date().getFullYear()} Event Horizon. All rights reserved.</p>
      <p className="mt-1">
        Made with curiosity by Rebeca Carvalho
      </p>
    </footer>
  );
};

export default Footer;
