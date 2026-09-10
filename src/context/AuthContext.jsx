import React, { createContext, useContext, useState, useEffect } from "react";
import { authAPI } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("portfolio_user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login"); // 'login' | 'register'

  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem("portfolio_token");
      if (token) {
        try {
          const profile = await authAPI.getProfile();
          setUser(profile);
          localStorage.setItem("portfolio_user", JSON.stringify(profile));
        } catch {
          // Token expired or invalid
          logout();
        }
      }
    };
    checkAuthStatus();
  }, []);

  const login = async (email, password) => {
    const data = await authAPI.login(email, password);
    localStorage.setItem("portfolio_token", data.token);
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      city: data.city || "India",
      authProvider: data.authProvider || "email",
      role: data.role,
      kycStatus: data.kycStatus,
    };
    localStorage.setItem("portfolio_user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthModalOpen(false);
    return userData;
  };

  const register = async (name, email, password, avatar, city, location) => {
    const data = await authAPI.register(name, email, password, avatar, city, location);
    localStorage.setItem("portfolio_token", data.token);
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      city: data.city || city || "India",
      authProvider: data.authProvider || "email",
      role: data.role,
      kycStatus: data.kycStatus,
    };
    localStorage.setItem("portfolio_user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthModalOpen(false);
    return userData;
  };

  const googleLogin = async (googleUser) => {
    try {
      const data = await authAPI.googleLogin(
        googleUser.token || "google_dummy_token",
        googleUser.city || "India",
        googleUser.location || null
      );
      localStorage.setItem("portfolio_token", data.token);
      const userData = {
        _id: data._id,
        name: data.name || googleUser.name,
        email: data.email || googleUser.email,
        avatar: data.avatar || googleUser.avatar || "",
        city: data.city || googleUser.city || "India",
        authProvider: "google",
        role: data.role || "visitor",
        kycStatus: "verified",
      };
      localStorage.setItem("portfolio_user", JSON.stringify(userData));
      setUser(userData);
      setIsAuthModalOpen(false);
      return userData;
    } catch {
      // Fallback local Google OAuth user state if backend offline
      const fallbackUser = {
        _id: "google_" + Date.now(),
        name: googleUser.name || "Google User",
        email: googleUser.email || "user@gmail.com",
        avatar: googleUser.avatar || "https://lh3.googleusercontent.com/a/default-user",
        city: googleUser.city || "India",
        authProvider: "google",
        role: "visitor",
        kycStatus: "verified",
      };
      localStorage.setItem("portfolio_token", "google_fallback_jwt_token");
      localStorage.setItem("portfolio_user", JSON.stringify(fallbackUser));
      setUser(fallbackUser);
      setIsAuthModalOpen(false);
      return fallbackUser;
    }
  };

  const logout = () => {
    localStorage.removeItem("portfolio_token");
    localStorage.removeItem("portfolio_user");
    setUser(null);
  };

  const openAuthModal = (mode = "login") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        googleLogin,
        logout,
        isAuthModalOpen,
        authMode,
        setAuthMode,
        openAuthModal,
        closeAuthModal,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
