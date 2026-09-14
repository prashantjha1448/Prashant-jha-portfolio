import express from "express";
import { getResume, updateResume } from "../controllers/resumeController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/resume
router.get("/", getResume);

// @route PUT /api/resume
router.put("/", protect, adminOnly, updateResume);

export default router;
