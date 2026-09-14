# 03 - Database & Schema Audit Report

*(Note: This repository utilizes MongoDB with Mongoose ORM models under `backend/src/models/` rather than Prisma).*

This report documents findings across all Mongoose database models regarding indexes, foreign key constraints, unique fields, timestamps/auditing, and data preservation patterns.

---

### [HIGH] Missing Indexes on Foreign Key and Filter Fields
- **File:** backend/src/models/Review.js:5
- **Issue:** The `user` ObjectId reference field in `reviewSchema` does not have an index (`index: true`). Queries filtering or populating reviews by user perform full collection scans.
- **Recommendation:** Add `{ index: true }` to the `user` ObjectId field definition in `Review.js`.

---

### [MEDIUM] Single-Document Singleton Collections Overwrite Historical Audit Data
- **File:** backend/src/models/Status.js:3
- **Issue:** The `Status` and `Resume` models use single-document replacement patterns (`findOneAndUpdate` with upside upserts). Previous historical status updates and resume download metadata are overwritten rather than preserved for auditing.
- **Recommendation:** Implement historical revision tracking or retain previous records with an `active: boolean` flag.

---

### [MEDIUM] Lack of Unique Indexes on Lookup Fields in Secondary Models
- **File:** backend/src/models/Skill.js:5
- **Issue:** The `Skill` model lacks a unique constraint on `{ name: 1, category: 1 }`. Duplicate skills with identical names can be created in the database.
- **Recommendation:** Add a compound unique index `skillSchema.index({ name: 1, category: 1 }, { unique: true })`.

---

### [LOW] Inconsistent Timestamp Auditing Configuration Across Models
- **File:** backend/src/models/Skill.js:40
- **Issue:** Models such as `Project`, `Blog`, `User`, `Review`, `Status`, and `Resume` enable `{ timestamps: true }`, but field naming and audit parameters lack explicit schema-level getters/virtuals for formatted ISO strings.
- **Recommendation:** Standardize timestamp declarations and JSON transform rules across all Mongoose model definitions.

---

### [LOW] MongoDB ObjectId Usage vs UUID Standardization
- **File:** backend/src/models/User.js:4
- **Issue:** Primary keys use standard MongoDB BSON ObjectIds (`_id`). While native to MongoDB, applications exposing raw ObjectIds across public APIs leak creation timestamps embedded within ObjectIds.
- **Recommendation:** Ensure API responses transform `_id` into string IDs or sanitize internal BSON metadata.
