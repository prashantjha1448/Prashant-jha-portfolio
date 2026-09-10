import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen bg-[#0b0f1a] text-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Background glow blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />
      
      {/* 404 Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-md w-full backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-3xl p-8 md:p-10 text-center shadow-2xl relative z-10"
      >
        <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 font-mono mb-4">
          404
        </div>

        <h1
          className="text-2xl md:text-3xl font-bold text-white mb-3"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          Page Not Found
        </h1>

        <p className="text-gray-400 text-xs md:text-sm leading-relaxed mb-8">
          The requested route doesn't exist or has been moved. Let's get you back to building products!
        </p>

        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition shadow-lg cursor-pointer"
        >
          <i className="ri-arrow-left-line" />
          Back to Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
