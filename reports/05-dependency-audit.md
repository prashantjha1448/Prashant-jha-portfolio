# 05 - Dependency Audit Report

This report summarizes npm dependency vulnerabilities, outdated major package versions, and unused installed packages across root frontend, admin, backend, and mobile applications.

---

### [HIGH] High-Severity Vulnerabilities in Root Dependencies
- **File:** package.json:33
- **Issue:** `npm audit` in the root workspace identified 10 vulnerabilities (6 High, 2 Moderate, 2 Low), including path traversal and arbitrary file read vulnerabilities in `vite` (7.0.0 - 7.3.3) and DoS issues in `brace-expansion` and `js-yaml`.
- **Recommendation:** Upgrade `vite` and affected devDependencies to patched versions via `npm audit fix`.

---

### [MEDIUM] Unused Dependency Installed in Admin Portal
- **File:** admin/package.json:14
- **Issue:** `lucide-react` (v0.475.0) is listed in `admin/package.json` dependencies but is never imported or used anywhere inside `admin/src/` (which exclusively uses `remixicon`).
- **Recommendation:** Remove `lucide-react` from `admin/package.json` to reduce bundle size and install time.

---

### [MEDIUM] Vulnerabilities in Backend Dependencies
- **File:** backend/package.json:17
- **Issue:** `npm audit` in `backend/` reported 2 moderate vulnerabilities in `uuid` (<11.1.1) and its dependent `gaxios` (buffer bounds check vulnerability).
- **Recommendation:** Update `google-auth-library` and `uuid` to non-vulnerable patch releases in `backend/package.json`.

---

### [LOW] Major Version Gaps in React and Styling Frameworks
- **File:** package.json:18
- **Issue:** Root frontend uses React 19 (`^19.1.1`) and Tailwind CSS 4 (`^4.2.2`), while sub-projects like `mobile/` use React 18 / Expo SDK 52 primitives, leading to potential peer dependency warnings across workspaces.
- **Recommendation:** Lock framework versions across workspace sub-packages or align shared devDependencies.
