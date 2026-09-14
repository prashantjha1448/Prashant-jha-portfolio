import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authAPI } from '../config/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    try {
      setLoading(true);
      const savedToken = await AsyncStorage.getItem('portfolio_token');
      const savedUser = await AsyncStorage.getItem('portfolio_user');

      if (savedToken) {
        setToken(savedToken);
        if (savedUser) {
          setUser(JSON.parse(savedUser));
        }
        try {
          const freshProfile = await authAPI.getProfile();
          if (freshProfile && freshProfile.user) {
            setUser(freshProfile.user);
            await AsyncStorage.setItem('portfolio_user', JSON.stringify(freshProfile.user));
          }
        } catch (e) {
          console.warn('[Auth Profile Refresh Warning]:', e.message);
        }
      }
    } catch (e) {
      console.warn('[Auth Load Error]:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await authAPI.login(email, password);
    const authToken = res.token;
    const userData = res.user || { name: email.split('@')[0], email };

    await AsyncStorage.setItem('portfolio_token', authToken);
    await AsyncStorage.setItem('portfolio_user', JSON.stringify(userData));

    setToken(authToken);
    setUser(userData);
    return res;
  };

  const register = async (name, email, password, city) => {
    const res = await authAPI.register(name, email, password, city);
    const authToken = res.token;
    const userData = res.user || { name, email, city };

    await AsyncStorage.setItem('portfolio_token', authToken);
    await AsyncStorage.setItem('portfolio_user', JSON.stringify(userData));

    setToken(authToken);
    setUser(userData);
    return res;
  };

  const logout = async () => {
    await AsyncStorage.removeItem('portfolio_token');
    await AsyncStorage.removeItem('portfolio_user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        isLoggedIn: !!user || !!token,
        login,
        register,
        logout,
        loadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
