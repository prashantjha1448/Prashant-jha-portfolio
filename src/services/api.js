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
  register: (name, email, password, avatar, city, location) =>
    request("/auth/register", {
      method: "POST",
      body: JSON.stringify({ name, email, password, avatar, city, location }),
    }),

  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),

  googleLogin: (token, city, location) =>
    request("/auth/google", {
      method: "POST",
      body: JSON.stringify({ token, city, location }),
    }),

  getProfile: () => request("/auth/me"),
};

// Reviews API Methods
export const reviewsAPI = {
  getReviews: () => request("/reviews"),

  createReview: (rating, comment, project, city) =>
    request("/reviews", {
      method: "POST",
      body: JSON.stringify({ rating, comment, project, city }),
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

// Projects API Methods
export const projectsAPI = {
  getProjects: () => request("/projects"),
  getProjectBySlug: (slug) => request(`/projects/${slug}`),
};

// Experience API Methods
export const experienceAPI = {
  getExperience: () => request("/experience"),
};

// Education API Methods
export const educationAPI = {
  getEducation: () => request("/education"),
};

// Skills API Methods
export const skillsAPI = {
  getSkills: () => request("/skills"),
};

// Blog API Methods
export const blogAPI = {
  getBlogs: () => request("/blogs"),
  getBlogBySlug: (slug) => request(`/blogs/${slug}`),
};

// Resume API Methods
export const resumeAPI = {
  getResume: () => request("/resume"),
};

