import express from "express";
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/education
router.get("/", getEducation);

// @route POST /api/education
router.post("/", protect, adminOnly, createEducation);

// @route PUT /api/education/:id
router.put("/:id", protect, adminOnly, updateEducation);

// @route DELETE /api/education/:id
router.delete("/:id", protect, adminOnly, deleteEducation);

export default router;
