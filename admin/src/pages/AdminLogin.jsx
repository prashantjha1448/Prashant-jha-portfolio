import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../context/AdminAuthContext";
import { motion } from "framer-motion";

const AdminLogin = () => {
  const { loginAdmin } = useAdminAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await loginAdmin(email.trim(), password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Invalid admin credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickTestLogin = async () => {
    try {
      setLoading(true);
      setError("");
      await loginAdmin("playstore-reviewer@prashantjha.com", "PlayStoreTest2026!");
      navigate("/");
    } catch (err) {
      setError(err.message || "Test login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#0b0f1a] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-md w-full bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl relative z-10"
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-500 flex items-center justify-center text-white font-black text-2xl shadow-lg mb-4">
            PJ
          </div>
          <h1 className="text-2xl font-black text-white mb-1 tracking-tight">Admin Console</h1>
          <p className="text-xs text-gray-400">Prashant Jha Portfolio Control System</p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center gap-2">
            <i className="ri-error-warning-line text-base" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-2">Admin Email</label>
            <div className="relative">
              <i className="ri-mail-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
              <input
                type="email"
                placeholder="admin@prashantjha.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-2">Password</label>
            <div className="relative">
              <i className="ri-lock-line absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-purple-500 transition"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:opacity-90 transition shadow-lg cursor-pointer flex items-center justify-center gap-2"
          >
            {loading ? (
              <i className="ri-loader-4-line animate-spin text-lg" />
            ) : (
              <>
                <i className="ri-login-circle-line text-lg" />
                Sign In to Admin Portal
              </>
            )}
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-white/10 text-center">
          <button
            onClick={handleQuickTestLogin}
            type="button"
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold cursor-pointer transition inline-flex items-center gap-1"
          >
            <i className="ri-flashlight-line" /> Quick Fill Demo Admin Credentials
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
