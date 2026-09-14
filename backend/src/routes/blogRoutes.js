import express from "express";
import {
  getBlogs,
  getBlogBySlug,
  createBlog,
  updateBlog,
  deleteBlog,
} from "../controllers/blogController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route GET /api/blogs
router.get("/", getBlogs);

// @route GET /api/blogs/:slug
router.get("/:slug", getBlogBySlug);

// @route POST /api/blogs
router.post("/", protect, adminOnly, createBlog);

// @route PUT /api/blogs/:id
router.put("/:id", protect, adminOnly, updateBlog);

// @route DELETE /api/blogs/:id
router.delete("/:id", protect, adminOnly, deleteBlog);

export default router;
