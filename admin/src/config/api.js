const LIVE_API_URL = "https://prashant-jha-portfolio.onrender.com/api";
const LOCAL_API_URL = "http://localhost:5001/api";

const isLocalhost = typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

export const API_BASE_URL = import.meta.env.VITE_API_URL || (isLocalhost ? LOCAL_API_URL : LIVE_API_URL);

const getAuthHeaders = () => {
  const token = localStorage.getItem("admin_token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const request = async (endpoint, options = {}) => {
  const primaryUrl = `${API_BASE_URL}${endpoint}`;
  const secondaryUrl = `${API_BASE_URL === LOCAL_API_URL ? LIVE_API_URL : LOCAL_API_URL}${endpoint}`;

  try {
    const res = await fetch(primaryUrl, {
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
  } catch (primaryErr) {
    console.warn(`[Primary API Failed ${endpoint}]:`, primaryErr.message, "— trying secondary API endpoint...");
    try {
      const res = await fetch(secondaryUrl, {
        ...options,
        headers: {
          ...getAuthHeaders(),
          ...options.headers,
        },
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Secondary API error");
      }
      return data;
    } catch (secondaryErr) {
      throw primaryErr;
    }
  }
};

export const adminAPI = {
  // Auth & System
  login: (email, password) => request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  getProfile: () => request("/auth/me"),
  getStatus: () => request("/status"),

  // Reviews CRUD
  getReviews: () => request("/reviews"),
  deleteReview: (id) => request(`/reviews/${id}`, { method: "DELETE" }),

  // Projects CRUD
  getProjects: () => request("/projects"),
  createProject: (data) => request("/projects", { method: "POST", body: JSON.stringify(data) }),
  updateProject: (id, data) => request(`/projects/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteProject: (id) => request(`/projects/${id}`, { method: "DELETE" }),

  // Experiences CRUD
  getExperiences: () => request("/experience"),
  createExperience: (data) => request("/experience", { method: "POST", body: JSON.stringify(data) }),
  updateExperience: (id, data) => request(`/experience/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteExperience: (id) => request(`/experience/${id}`, { method: "DELETE" }),

  // Education CRUD
  getEducation: () => request("/education"),
  createEducation: (data) => request("/education", { method: "POST", body: JSON.stringify(data) }),
  updateEducation: (id, data) => request(`/education/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteEducation: (id) => request(`/education/${id}`, { method: "DELETE" }),

  // Skills CRUD
  getSkills: () => request("/skills"),
  createSkill: (data) => request("/skills", { method: "POST", body: JSON.stringify(data) }),
  updateSkill: (id, data) => request(`/skills/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteSkill: (id) => request(`/skills/${id}`, { method: "DELETE" }),

  // Blogs CRUD
  getBlogs: () => request("/blogs"),
  createBlog: (data) => request("/blogs", { method: "POST", body: JSON.stringify(data) }),
  updateBlog: (id, data) => request(`/blogs/${id}`, { method: "PUT", body: JSON.stringify(data) }),
  deleteBlog: (id) => request(`/blogs/${id}`, { method: "DELETE" }),

  // Resume CRUD
  getResume: () => request("/resume"),
  updateResume: (data) => request("/resume", { method: "PUT", body: JSON.stringify(data) }),
};
