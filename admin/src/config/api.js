const LIVE_API_URL = "https://prashant-jha-portfolio.onrender.com/api";
const LOCAL_API_URL = "http://localhost:5001/api";

export const API_BASE_URL = LIVE_API_URL;

const getAuthHeaders = () => {
  const token = localStorage.getItem("admin_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const request = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "API request failed");
    }
    return data;
  } catch (err) {
    // If live API fails in local dev, attempt local fallback
    if (window.location.hostname === "localhost") {
      try {
        const fallbackRes = await fetch(`${LOCAL_API_URL}${endpoint}`, {
          ...options,
          headers: {
            ...getAuthHeaders(),
            ...options.headers,
          },
        });
        const fallbackData = await fallbackRes.json();
        if (!fallbackRes.ok) throw new Error(fallbackData.message || "Local fallback API error");
        return fallbackData;
      } catch (fallbackErr) {
        throw err;
      }
    }
    throw err;
  }
};

export const adminAPI = {
  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  getProfile: () => request("/auth/me"),

  getReviews: () => request("/reviews"),

  deleteReview: (id) =>
    request(`/reviews/${id}`, {
      method: "DELETE",
    }),

  getStatus: () => request("/status"),
};
