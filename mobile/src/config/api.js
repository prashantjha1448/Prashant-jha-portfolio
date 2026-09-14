import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import Constants from 'expo-constants';

// Dynamic API URL reading from app.json extra.apiUrl with Render backend fallback
const LIVE_API_URL =
  Constants.expoConfig?.extra?.apiUrl ||
  Constants.manifest?.extra?.apiUrl ||
  "https://prashant-jha-portfolio.onrender.com/api";

const getLocalFallbackURL = () => {
  if (Platform.OS === 'android') {
    return "http://10.0.2.2:5000/api";
  }
  return "http://localhost:5000/api";
};

export const API_BASE_URL = LIVE_API_URL;

// Generic Request Helper
const request = async (endpoint, options = {}) => {
  let token = null;
  try {
    token = await AsyncStorage.getItem('portfolio_token');
  } catch (e) {
    console.warn("[Storage Error]:", e);
  }

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const tryFetch = async (url) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 7000);

    const response = await fetch(`${url}${endpoint}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'An API error occurred');
    }
    return data;
  };

  try {
    return await tryFetch(LIVE_API_URL);
  } catch (primaryError) {
    if (__DEV__) {
      console.warn(`[Primary API Failed ${endpoint}]:`, primaryError.message, "- Trying local fallback...");
      try {
        return await tryFetch(getLocalFallbackURL());
      } catch (fallbackError) {
        console.warn(`[Fallback API Failed ${endpoint}]:`, fallbackError.message);
        throw primaryError;
      }
    }
    console.warn(`[API Error ${endpoint}]:`, primaryError.message);
    throw primaryError;
  }
};

export const authAPI = {
  login: (email, password) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (name, email, password, city) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password, city }),
    }),

  googleLogin: (token, name, email) =>
    request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ token, name, email }),
    }),

  getProfile: () => request('/auth/me'),

  requestAccountDeletion: (email, reason) =>
    request('/auth/request-deletion', {
      method: 'POST',
      body: JSON.stringify({ email, reason }),
    }),
};

export const reviewsAPI = {
  getReviews: () => request('/reviews'),

  createReview: (rating, comment, project, city) =>
    request('/reviews', {
      method: 'POST',
      body: JSON.stringify({ rating, comment, project, city }),
    }),
};

export const statusAPI = {
  getStatus: () => request('/status'),
};
