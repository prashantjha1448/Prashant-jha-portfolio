import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const ReviewPromptToast = () => {
  const { user, openAuthModal } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if dismissed per session or if user is already logged in
    const isDismissed = sessionStorage.getItem("review_prompt_dismissed");
    if (isDismissed || user) {
      return;
    }

    const handleScroll = () => {
      const reviewsEl = document.getElementById("reviews");
      if (reviewsEl) {
        const rect = reviewsEl.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [user]);

  const handleDismiss = () => {
    sessionStorage.setItem("review_prompt_dismissed", "true");
    setIsVisible(false);
  };

  const handleAction = () => {
    sessionStorage.setItem("review_prompt_dismissed", "true");
    setIsVisible(false);
    openAuthModal("login");
  };

  if (!isVisible || user) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-6 right-6 z-50 max-w-sm w-[calc(100vw-3rem)] backdrop-blur-2xl bg-[#0e1322]/95 border border-purple-500/30 rounded-3xl p-5 shadow-2xl text-white overflow-hidden"
      >
        {/* Subtle accent top border */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

        {/* Dismiss Button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition cursor-pointer text-sm"
        >
          <i className="ri-close-line" />
        </button>

        {/* Content */}
        <div className="flex gap-3 items-start">
          <div className="w-9 h-9 rounded-2xl bg-purple-500/20 text-purple-300 border border-purple-500/30 flex items-center justify-center text-lg shrink-0 mt-0.5">
            <i className="ri-star-smile-line" />
          </div>
          <div className="flex-1 pr-4">
            <h4 className="text-xs font-bold font-serif mb-1 text-white">Share Your Feedback</h4>
            <p className="text-[11px] text-gray-300 leading-relaxed mb-4">
              Have we worked together or explored my apps? Sign in with a quick visitor account to leave a star rating and feedback on my projects or code.
            </p>
            <div className="flex gap-2">
              <button
                onClick={handleAction}
                className="px-4 py-1.5 rounded-full text-[11px] font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 transition cursor-pointer shadow-md"
              >
                Sign In & Rate →
              </button>
              <button
                onClick={handleDismiss}
                className="px-3 py-1.5 rounded-full text-[11px] font-medium text-gray-400 hover:text-white border border-white/10 transition cursor-pointer"
              >
                Maybe later
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReviewPromptToast;
