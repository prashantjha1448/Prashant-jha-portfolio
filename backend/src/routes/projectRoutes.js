import express from "express";
import {
  getProjects,
  getProjectBySlug,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/projects
router.get("/", getProjects);

// @route GET /api/projects/:slug
router.get("/:slug", getProjectBySlug);

// @route POST /api/projects
router.post("/", protect, adminOnly, createProject);

// @route PUT /api/projects/:id
router.put("/:id", protect, adminOnly, updateProject);

// @route DELETE /api/projects/:id
router.delete("/:id", protect, adminOnly, deleteProject);

export default router;
