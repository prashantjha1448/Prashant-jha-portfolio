import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, openAuthModal, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="w-full fixed top-0 left-0 z-50 bg-[#0b0f1a]/80 backdrop-blur-md border-b border-white/10">
      
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-xl font-semibold text-white tracking-wide cursor-pointer flex items-center gap-2"
        >
          <span>PJ</span>
          <span className="text-[10px] font-mono font-normal px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20">
            Portfolio
          </span>
        </Link>

        {/* Links (Desktop Only) */}
        <div className="hidden md:flex items-center gap-7 text-gray-300 text-sm font-medium">
          <button onClick={() => handleNavClick("about")} className="hover:text-white transition cursor-pointer">
            About
          </button>
          <button onClick={() => handleNavClick("projects")} className="hover:text-white transition cursor-pointer">
            Projects
          </button>
          <button onClick={() => handleNavClick("experience")} className="hover:text-white transition cursor-pointer">
            Experience
          </button>
          <Link to="/resume" className="hover:text-white transition cursor-pointer">
            Resume
          </Link>
          <Link to="/blog" className="hover:text-white transition cursor-pointer">
            Blog
          </Link>
          <button onClick={() => handleNavClick("contact")} className="hover:text-white transition cursor-pointer">
            Contact
          </button>
        </div>

        {/* Action Buttons (Auth, Theme & Hire Me) */}
        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-gray-300 hover:text-white hover:bg-white/10 transition cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle theme"
          >
            <i className={theme === "dark" ? "ri-sun-line text-amber-400" : "ri-moon-line text-indigo-400"} />
          </button>

          {user ? (
            <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-full py-1.5 px-3.5 text-xs text-white">
              <span className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-300 font-bold flex items-center justify-center font-mono border border-purple-500/30">
                {user.name[0].toUpperCase()}
              </span>
              <span className="font-medium max-w-[100px] truncate">{user.name}</span>
              <button
                onClick={logout}
                className="text-gray-400 hover:text-rose-400 transition ml-1 cursor-pointer"
                title="Log Out"
              >
                <i className="ri-logout-box-r-line" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => openAuthModal("login")}
              className="px-4 py-2 rounded-full text-xs font-medium text-gray-300 border border-white/15 hover:text-white hover:bg-white/10 transition cursor-pointer"
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => handleNavClick("contact")}
            className="px-5 py-2 rounded-full text-white font-medium text-sm
              bg-gradient-to-r from-blue-500 to-purple-500 
              hover:opacity-90 transition cursor-pointer"
          >
            Hire Me
          </button>
        </div>

        {/* Mobile Controls (Theme Toggle & Hamburger) */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-white/15 bg-white/5 flex items-center justify-center text-gray-300 hover:text-white transition cursor-pointer"
            title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
            aria-label="Toggle theme"
          >
            <i className={theme === "dark" ? "ri-sun-line text-amber-400" : "ri-moon-line text-indigo-400"} />
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-purple-400 transition text-2xl focus:outline-none cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <i className={isOpen ? "ri-close-line" : "ri-menu-3-line"}></i>
          </button>
        </div>

      </div>

      {/* Mobile Slide-down Menu Container */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden border-t border-white/10 bg-[#0b0f1a]/95 backdrop-blur-xl px-6 py-6 flex flex-col gap-3 overflow-hidden text-sm"
          >
            <button onClick={() => handleNavClick("about")} className="text-left text-gray-300 hover:text-white py-1">
              About
            </button>
            <button onClick={() => handleNavClick("projects")} className="text-left text-gray-300 hover:text-white py-1">
              Projects
            </button>
            <button onClick={() => handleNavClick("experience")} className="text-left text-gray-300 hover:text-white py-1">
              Experience
            </button>
            <Link to="/resume" onClick={() => setIsOpen(false)} className="text-left text-gray-300 hover:text-white py-1">
              Resume
            </Link>
            <Link to="/blog" onClick={() => setIsOpen(false)} className="text-left text-gray-300 hover:text-white py-1">
              Blog
            </Link>
            <button onClick={() => handleNavClick("contact")} className="text-left text-gray-300 hover:text-white py-1">
              Contact
            </button>

            {/* Mobile Auth options */}
            <div className="pt-3 border-t border-white/10 flex flex-col gap-3">
              {user ? (
                <div className="flex items-center justify-between text-xs text-gray-300 py-1">
                  <span>Signed in as <strong className="text-white">{user.name}</strong></span>
                  <button
                    onClick={() => {
                      logout();
                      setIsOpen(false);
                    }}
                    className="text-rose-400 hover:underline font-semibold"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    setIsOpen(false);
                    openAuthModal("login");
                  }}
                  className="w-full py-2.5 rounded-full text-center text-xs font-semibold text-gray-200 border border-white/20 hover:bg-white/10 transition"
                >
                  Sign In / Register
                </button>
              )}

              <button
                onClick={() => handleNavClick("contact")}
                className="w-full text-center py-2.5 rounded-full text-white font-medium text-sm
                  bg-gradient-to-r from-blue-500 to-purple-500 
                  hover:opacity-90 transition cursor-pointer"
              >
                Hire Me
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};

export default Navbar;