import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0b0f1a]/80 backdrop-blur-md border-b border-white/10">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <h1
          onClick={() => {
            const el = document.getElementById("hero");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="text-xl font-semibold text-white tracking-wide cursor-pointer"
        >
          PJ
        </h1>

        {/* Links */}
        <div className="hidden md:flex items-center gap-8 text-gray-300">
          {["About", "Projects", "Experience", "Contact"].map((l) => (
            <button
              key={l}
              onClick={() => {
                const el = document.getElementById(l.toLowerCase());
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="hover:text-white transition cursor-pointer text-sm font-medium"
            >
              {l}
            </button>
          ))}
        </div>

        {/* Button */}
        <button
          onClick={() => {
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="px-5 py-2 rounded-full text-white font-medium 
            bg-gradient-to-r from-blue-500 to-purple-500 
            hover:opacity-90 transition cursor-pointer"
        >
          Hire Me
        </button>

      </div>
    </nav>
  );
};

export default Navbar;