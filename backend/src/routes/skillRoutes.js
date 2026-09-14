import express from "express";
import {
  getSkills,
  createSkill,
  updateSkill,
  deleteSkill,
} from "../controllers/skillController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/skills
router.get("/", getSkills);

// @route POST /api/skills
router.post("/", protect, adminOnly, createSkill);

// @route PUT /api/skills/:id
router.put("/:id", protect, adminOnly, updateSkill);

// @route DELETE /api/skills/:id
router.delete("/:id", protect, adminOnly, deleteSkill);

export default router;
