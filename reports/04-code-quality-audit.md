# 04 - Code Quality Audit Report

This report documents findings across frontend components, admin dashboard pages, mobile screens, backend controllers, input validation, error handling, and code duplication.

---

### [HIGH] Missing Input Validation Schemas on POST/PUT Routes
- **File:** backend/src/controllers/projectController.js:15
- **Issue:** Backend controllers for Projects, Experiences, Education, Skills, and Blogs perform manual field presence checks instead of using a structured schema validation library like Zod or Joi. Invalid data types or malformed payloads can bypass validation.
- **Recommendation:** Implement Zod or Joi validation middleware for all incoming request bodies.

---

### [MEDIUM] Direct Business Logic inside Express Controllers
- **File:** backend/src/controllers/authController.js:87
- **Issue:** Controllers perform user creation, token generation, credential verification, and hardcoded user checks directly inside Express request handler functions rather than delegating to a dedicated service layer.
- **Recommendation:** Refactor controller logic into decoupled service modules (e.g. `authService.js`, `projectService.js`).

---

### [MEDIUM] Inconsistent Error Response Shapes Across Endpoints
- **File:** backend/src/controllers/reviewController.js:23
- **Issue:** Error response objects vary between `{ message: "..." }`, `{ message: "...", error: "..." }`, and raw string errors across different controllers.
- **Recommendation:** Create a centralized error-handling utility to normalize API error responses across all endpoints.

---

### [MEDIUM] Mixing Data Fetching Logic and Presentation in Frontend Components
- **File:** src/Pages/Projects.jsx:130
- **Issue:** Frontend pages (`Projects.jsx`, `Experience.jsx`, `TechStack.jsx`, `BlogPage.jsx`) combine UI rendering with imperative `useEffect` data fetching and fallback arrays in single component files.
- **Recommendation:** Extract data fetching logic into custom React hooks (e.g. `useProjects`, `useSkills`).

---

### [LOW] Leftover console.warn and console.error Statements in Production Bundles
- **File:** src/services/api.js:29
- **Issue:** Numerous `console.warn` and `console.error` calls are executed in client-side code during network failures, cluttering browser developer tools in production.
- **Recommendation:** Replace direct `console` logs with a configurable logger or error monitoring integration (e.g. Sentry).

---

### [LOW] Duplicated API Request Failover Logic Across Projects
- **File:** admin/src/config/api.js:16
- **Issue:** Both `src/services/api.js`, `admin/src/config/api.js`, and `mobile/src/config/api.js` re-implement custom `fetch` wrapper logic with duplicate header parsing and failover loops.
- **Recommendation:** Consolidate API HTTP request configuration into a shared API client utility package or module.
