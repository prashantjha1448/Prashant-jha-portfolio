import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [theme, setTheme] = useState('dark'); // Default dark mode to match developer portfolio

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem('app_theme');
        if (savedTheme) {
          setTheme(savedTheme);
        } else if (systemColorScheme) {
          setTheme(systemColorScheme);
        }
      } catch (e) {
        console.warn('Failed to load theme preference', e);
      }
    };
    loadTheme();
  }, [systemColorScheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    try {
      await AsyncStorage.setItem('app_theme', newTheme);
    } catch (e) {
      console.warn('Failed to save theme preference', e);
    }
  };

  const isLight = theme === 'light';

  const colors = {
    bg: isLight ? '#f8fafc' : '#0b0f19',
    cardBg: isLight ? '#ffffff' : '#111827',
    cardBorder: isLight ? '#e2e8f0' : 'rgba(255, 255, 255, 0.1)',
    text: isLight ? '#0f172a' : '#ffffff',
    textSecondary: isLight ? '#475569' : '#94a3b8',
    textMuted: isLight ? '#64748b' : '#64748b',
    primary: '#3b82f6',
    primaryGradient: ['#3b82f6', '#8b5cf6'],
    accent: '#8b5cf6',
    emerald: '#10b981',
    amber: '#f59e0b',
    rose: '#ef4444',
  };

  return (
    <ThemeContext.Provider value={{ theme, isLight, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
