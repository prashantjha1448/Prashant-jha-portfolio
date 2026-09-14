import express from "express";
import { getStatus, updateStatus } from "../controllers/statusController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/status
router.get("/", getStatus);

// @route   PUT /api/status
router.put("/", protect, adminOnly, updateStatus);

export default router;
