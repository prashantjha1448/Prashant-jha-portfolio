import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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

        {/* Links (Desktop Only) */}
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

        {/* Hire Me Button (Desktop Only) */}
        <button
          onClick={() => {
            const el = document.getElementById("contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          className="hidden md:block px-5 py-2 rounded-full text-white font-medium 
            bg-gradient-to-r from-blue-500 to-purple-500 
            hover:opacity-90 transition cursor-pointer"
        >
          Hire Me
        </button>

        {/* Mobile Hamburger Icon (Mobile/Tablet Only) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white hover:text-purple-400 transition text-2xl focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
        >
          <i className={isOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
        </button>

      </div>

      {/* Mobile Slide-down Menu Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-white/10 bg-[#0b0f1a]/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-4 overflow-hidden"
          >
            {["About", "Projects", "Experience", "Contact"].map((l) => (
              <button
                key={l}
                onClick={() => {
                  setIsOpen(false);
                  const el = document.getElementById(l.toLowerCase());
                  if (el) el.scrollIntoView({ behavior: "smooth" });
                }}
                className="text-left text-gray-300 hover:text-white transition font-medium text-sm py-1.5 cursor-pointer"
              >
                {l}
              </button>
            ))}
            <button
              onClick={() => {
                setIsOpen(false);
                const el = document.getElementById("contact");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="w-full mt-2 text-center py-2.5 rounded-full text-white font-medium text-sm
                bg-gradient-to-r from-blue-500 to-purple-500 
                hover:opacity-90 transition cursor-pointer"
            >
              Hire Me
            </button>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;