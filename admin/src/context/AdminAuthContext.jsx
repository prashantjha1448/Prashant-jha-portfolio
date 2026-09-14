import React, { createContext, useContext, useState, useEffect } from "react";
import { adminAPI } from "../config/api";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [adminUser, setAdminUser] = useState(null);
  const [adminToken, setAdminToken] = useState(localStorage.getItem("admin_token") || null);
  const [loading, setLoading] = useState(true);

  const loadAdmin = async () => {
    const savedToken = localStorage.getItem("admin_token");
    if (!savedToken) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const user = await adminAPI.getProfile();
      setAdminUser(user);
      setAdminToken(savedToken);
    } catch (e) {
      console.warn("[Admin Auth Verify Warning]:", e.message);
      // If token expired or invalid, clear local storage
      localStorage.removeItem("admin_token");
      localStorage.removeItem("admin_user");
      setAdminUser(null);
      setAdminToken(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmin();
  }, []);

  const loginAdmin = async (email, password) => {
    const data = await adminAPI.login(email, password);
    const token = data.token;
    const user = data.user || { name: data.name, email: data.email, role: data.role };

    localStorage.setItem("admin_token", token);
    localStorage.setItem("admin_user", JSON.stringify(user));

    setAdminToken(token);
    setAdminUser(user);
    return data;
  };

  const logoutAdmin = () => {
    localStorage.removeItem("admin_token");
    localStorage.removeItem("admin_user");
    setAdminToken(null);
    setAdminUser(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{
        adminUser,
        adminToken,
        loading,
        isAuthenticated: !!adminToken,
        loginAdmin,
        logoutAdmin,
        loadAdmin,
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within AdminAuthProvider");
  }
  return context;
};
