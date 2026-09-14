# 02 - Security Audit Report

This report documents findings regarding exposed credentials, environment files, authentication bypasses, password hashing, CORS permissions, and authorization controls.

---

### [CRITICAL] Live Production Database URI and Password Committed in Repository
- **File:** backend/.env.example:3
- **Issue:** The committed `backend/.env.example` file contains a live MongoDB Atlas connection string with embedded database credentials (`prashantJHA:1Prashant%23`). Anyone with read access to the repository can access and mutate the database.
- **Recommendation:** Revoke the exposed MongoDB cluster credentials immediately and replace `backend/.env.example` values with placeholder strings.

---

### [CRITICAL] Hardcoded Database Connection String Fallbacks in Source Files
- **File:** backend/src/config/db.js:6
- **Issue:** `db.js` and `seed.js:12` contain hardcoded fallback connection strings with live MongoDB database credentials when `process.env.MONGO_URI` is undefined.
- **Recommendation:** Remove hardcoded MongoDB connection strings from source code and require `process.env.MONGO_URI` at runtime.

---

### [HIGH] Permissive CORS Wildcard Fallback in Backend Server
- **File:** backend/src/server.js:37
- **Issue:** The CORS middleware callback returns `callback(null, true)` inside its `else` branch for unlisted origins. This allows any external domain to make authenticated cross-origin requests.
- **Recommendation:** Reject unlisted origins by passing `callback(new Error("Not allowed by CORS"))` in the `else` block.

---

### [HIGH] Hardcoded Secret Keys in Source Code
- **File:** backend/src/controllers/authController.js:8
- **Issue:** `authController.js` falls back to a hardcoded JWT secret `"portfolio_jwt_secret_key_123"` if `process.env.JWT_SECRET` is missing.
- **Recommendation:** Enforce `process.env.JWT_SECRET` existence and throw an explicit error on server initialization if missing.

---

### [HIGH] Plaintext Password Comparison and Storage for Test/Admin Accounts
- **File:** backend/src/controllers/authController.js:87
- **Issue:** Test reviewer and admin account logins compare incoming passwords directly against plaintext strings (`TEST_PASSWORD` and `ADMIN_PASSWORD`), bypassing bcrypt hashing. Additionally, newly auto-created admin users store plaintext passwords in MongoDB.
- **Recommendation:** Use standard bcrypt password hashing and verification for all accounts including test and admin users.

---

### [MEDIUM] Production Secret Keys Exposed in Version Control
- **File:** backend/.env.example:4
- **Issue:** `backend/.env.example` contains live `JWT_SECRET` strings and test account passwords (`PlayStoreTest2026!`, `AdminPass2026!`).
- **Recommendation:** Replace sensitive secret strings in `.env.example` with dummy placeholders.

---

### [MEDIUM] Missing Authorization Checks on Public Data Mutation Endpoints
- **File:** backend/src/routes/reviewRoutes.js:18
- **Issue:** While `POST /api/reviews` requires authentication (`protect`), any authenticated user with role `visitor` can submit unlimited reviews, opening rate-limiting or spam vectors.
- **Recommendation:** Implement user rate-limiting or anti-spam verification middleware on review creation routes.
