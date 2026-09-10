import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const AuthModal = () => {
  const { isAuthModalOpen, authMode, setAuthMode, closeAuthModal, login, register } = useAuth();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    avatar: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (authMode === "login") {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password, formData.avatar);
      }
      setFormData({ name: "", email: "", password: "", avatar: "" });
    } catch (err) {
      setError(err.message || "Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="w-full max-w-md bg-[#0e1322] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden text-white"
        >
          {/* Close button */}
          <button
            onClick={closeAuthModal}
            className="absolute top-5 right-5 text-gray-400 hover:text-white transition cursor-pointer text-lg"
          >
            <i className="ri-close-line" />
          </button>

          {/* Header */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold font-serif mb-1">
              {authMode === "login" ? "Welcome Back" : "Create Visitor Account"}
            </h2>
            <p className="text-xs text-gray-400">
              {authMode === "login"
                ? "Sign in to leave reviews and interact with portfolio projects."
                : "Sign up to post testimonials, rate projects, and connect."}
            </p>
          </div>

          {/* Error alert */}
          {error && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono">
              ⚠️ {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {authMode === "register" && (
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g. Sarah Jenkins"
                  required
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm outline-none focus:border-purple-500 transition-all text-white placeholder:text-gray-600"
                />
              </div>
            )}

            <div>
              <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@domain.com"
                required
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm outline-none focus:border-purple-500 transition-all text-white placeholder:text-gray-600"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm outline-none focus:border-purple-500 transition-all text-white placeholder:text-gray-600"
              />
            </div>

            {authMode === "register" && (
              <div>
                <label className="text-[10px] uppercase font-mono tracking-widest text-gray-400">Avatar Image URL (Optional)</label>
                <input
                  type="url"
                  name="avatar"
                  value={formData.avatar}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full mt-1.5 px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-sm outline-none focus:border-purple-500 transition-all text-white placeholder:text-gray-600"
                />
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-full mt-2 font-medium text-sm text-white transition-all cursor-pointer shadow-lg"
              style={{
                background: "linear-gradient(to right, #3b82f6, #a855f7)",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading
                ? "Processing..."
                : authMode === "login"
                ? "Sign In →"
                : "Create Account →"}
            </button>
          </form>

          {/* Toggle mode */}
          <div className="mt-6 pt-4 border-t border-white/5 text-center text-xs text-gray-400">
            {authMode === "login" ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={() => setAuthMode("register")}
                  className="text-purple-400 font-semibold hover:underline cursor-pointer ml-1"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={() => setAuthMode("login")}
                  className="text-purple-400 font-semibold hover:underline cursor-pointer ml-1"
                >
                  Sign In
                </button>
              </p>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
