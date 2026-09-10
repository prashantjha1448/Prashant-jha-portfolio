import express from "express";
import Review from "../models/Review.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all public reviews/testimonials
// @access  Public
router.get("/", async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email avatar kycStatus")
      .sort({ createdAt: -1 });

    return res.json(reviews);
  } catch (error) {
    console.error("[Get Reviews Error]:", error);
    return res.status(500).json({ message: "Server error fetching reviews." });
  }
});

// @route   POST /api/reviews
// @desc    Create a new review (1 review per user rate-limited)
// @access  Private (Registered/Logged-in Visitors)
router.post("/", protect, async (req, res) => {
  try {
    const { rating, comment } = req.body;

    // Validation
    const parsedRating = Number(rating);
    if (!parsedRating || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ message: "Please provide a valid rating between 1 and 5 stars." });
    }

    if (!comment || comment.trim().length < 5) {
      return res.status(400).json({ message: "Please provide a meaningful comment (at least 5 characters)." });
    }

    // Rate Limiting Check: 1 review per user
    const existingReview = await Review.findOne({ user: req.user._id });
    if (existingReview) {
      return res.status(400).json({ message: "You have already submitted a review. Thank you for your feedback!" });
    }

    const review = await Review.create({
      user: req.user._id,
      rating: parsedRating,
      comment: comment.trim(),
      verified: req.user.kycStatus === "verified",
    });

    const populatedReview = await Review.findById(review._id).populate("user", "name email avatar kycStatus");

    return res.status(201).json(populatedReview);
  } catch (error) {
    console.error("[Create Review Error]:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "You have already submitted a review." });
    }
    return res.status(500).json({ message: error.message || "Server error creating review." });
  }
});

// @route   DELETE /api/reviews/:id
// @desc    Delete a review (Author or Admin only)
// @access  Private
router.delete("/:id", protect, async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    // Check ownership or admin status
    if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this review." });
    }

    await review.deleteOne();
    return res.json({ message: "Review removed successfully." });
  } catch (error) {
    console.error("[Delete Review Error]:", error);
    return res.status(500).json({ message: "Server error deleting review." });
  }
});

export default router;
