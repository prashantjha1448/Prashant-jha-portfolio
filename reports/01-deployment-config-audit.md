# 01 - Deployment & Configuration Audit Report

This report documents configuration, deployment structure, Vercel routing rules, environment variables, and URL hardcoding findings across the root frontend, admin dashboard, backend API, and mobile applications.

---

### [CRITICAL] Mismatched API Port Default in Frontend Services
- **File:** src/services/api.js:3
- **Issue:** The root web frontend fallback API URL defaults to `http://localhost:5000/api`, whereas the Express backend in `backend/src/server.js:78` defaults to port `5001`. This causes connection refused errors during local development when `VITE_API_URL` is unset.
- **Recommendation:** Align the default local API fallback URL to `http://localhost:5001/api` in `src/services/api.js`.

---

### [HIGH] Mismatched API Port Defaults in Mobile Configuration
- **File:** mobile/src/config/api.js:13
- **Issue:** The mobile app local development fallback functions use port `5000` (`http://10.0.2.2:5000/api` and `http://localhost:5000/api`), conflicting with the backend default port `5001`.
- **Recommendation:** Update mobile local fallback helper URLs to target port `5001`.

---

### [HIGH] Incomplete CORS Allowed Origins for Admin Deployment
- **File:** backend/src/server.js:25
- **Issue:** The backend `allowedOrigins` array includes `http://localhost:5173`, `http://localhost:5174`, `http://localhost:3000`, and `https://prashant-jha-portfolio.vercel.app`, but lacks dedicated production deployment domains for the admin portal.
- **Recommendation:** Explicitly register the deployed admin portal origin in `allowedOrigins`.

---

### [MEDIUM] Multi-Folder Repository Structure Lacks Root Deployment Declaration
- **File:** package.json:1
- **Issue:** The repository root contains frontend code alongside `admin/`, `backend/`, and `mobile/` subdirectories. Deploying the root project without setting Vercel/Render Root Directory options risks improper framework auto-detection.
- **Recommendation:** Document explicit Vercel and Render Root Directory configuration guidelines in the repository README.

---

### [LOW] Identical vercel.json Rewrite Rules Across Sub-Projects
- **File:** vercel.json:1
- **Issue:** Both root `vercel.json` and `admin/vercel.json` specify identical wildcard SPA rewrites (`/.*` -> `/index.html`). While valid for SPAs, deploying nested directories without build directory isolation can cause routing ambiguities.
- **Recommendation:** Ensure Vercel projects designate distinct Root Directories (`/` for main frontend, `admin` for admin dashboard).
