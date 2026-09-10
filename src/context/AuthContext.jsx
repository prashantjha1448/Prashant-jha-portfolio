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
      role: data.role,
      kycStatus: data.kycStatus,
    };
    localStorage.setItem("portfolio_user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthModalOpen(false);
    return userData;
  };

  const register = async (name, email, password, avatar) => {
    const data = await authAPI.register(name, email, password, avatar);
    localStorage.setItem("portfolio_token", data.token);
    const userData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      avatar: data.avatar,
      role: data.role,
      kycStatus: data.kycStatus,
    };
    localStorage.setItem("portfolio_user", JSON.stringify(userData));
    setUser(userData);
    setIsAuthModalOpen(false);
    return userData;
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
