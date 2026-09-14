import express from "express";
import {
  getExperiences,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/experience
router.get("/", getExperiences);

// @route POST /api/experience
router.post("/", protect, adminOnly, createExperience);

// @route PUT /api/experience/:id
router.put("/:id", protect, adminOnly, updateExperience);

// @route DELETE /api/experience/:id
router.delete("/:id", protect, adminOnly, deleteExperience);

export default router;
