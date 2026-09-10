// Frontend API Service Client for Portfolio Backend

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Helper for HTTP requests
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem("portfolio_token");
  
  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "An unexpected API error occurred.");
    }

    return data;
  } catch (error) {
    console.warn(`[API Client Warning] Request to ${endpoint} failed:`, error.message);
    throw error;
  }
};

// Auth API Methods
export const authAPI = {
  register: (name, email, password, avatar) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, avatar }),
    }),

  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getProfile: () => request("/auth/me"),
};

// Reviews API Methods
export const reviewsAPI = {
  getReviews: () => request("/reviews"),

  createReview: (rating, comment) =>
    request("/reviews", {
      method: "POST",
      body: JSON.stringify({ rating, comment }),
    }),

  deleteReview: (id) =>
    request("/reviews/" + id, {
      method: "DELETE",
    }),
};

// Status API Methods
export const statusAPI = {
  getStatus: () => request("/status"),

  updateStatus: (title, subtitle, link, active) =>
    request("/status", {
      method: "PUT",
      body: JSON.stringify({ title, subtitle, link, active }),
    }),
};
