import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0b0f1a]/80 backdrop-blur-md border-b border-white/10">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1 className="text-xl font-semibold text-white tracking-wide">
          PJ
        </h1>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          <a href="#" className="hover:text-white transition">About</a>
          <a href="#" className="hover:text-white transition">Skills</a>
          <a href="#" className="hover:text-white transition">Projects</a>
          <a href="#" className="hover:text-white transition">Experience</a>
          <a href="#" className="hover:text-white transition">Contact</a>
        </div>

        {/* Button */}
        <button className="px-5 py-2 rounded-full text-white font-medium 
          bg-gradient-to-r from-blue-500 to-purple-500 
          hover:opacity-90 transition">
          Hire Me
        </button>

      </div>
    </nav>
  );
};

export default Navbar;