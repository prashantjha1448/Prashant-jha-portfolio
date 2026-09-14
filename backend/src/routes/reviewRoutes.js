import express from "express";
import {
  getReviews,
  createReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/reviews
router.get("/", getReviews);

// @route   POST /api/reviews
router.post("/", protect, createReview);

// @route   DELETE /api/reviews/:id
router.delete("/:id", protect, deleteReview);

export default router;
