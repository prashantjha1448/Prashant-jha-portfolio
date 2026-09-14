import Review from "../models/Review.js";

const PROJECT_LINKS = {
  WorkQuora: "https://www.workquora.com",
  "CHH School Management System": "https://chh-school-management-system.vercel.app/",
  Notewave: "https://notewave-frontend.vercel.app",
  Lokpriyatam: "https://github.com/prashantjha1448/Lokpriyatam-frontend",
  "General Portfolio": "https://prashant-jha-portfolio.vercel.app",
};

// @desc    Get all public reviews/testimonials
// @route   GET /api/reviews
// @access  Public
export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("user", "name email avatar city authProvider kycStatus")
      .sort({ createdAt: -1 });

    return res.json(reviews);
  } catch (error) {
    console.error("[Get Reviews Error]:", error);
    return res.status(500).json({ message: "Server error fetching reviews." });
  }
};

// @desc    Create a new review (1 review per user rate-limited)
// @route   POST /api/reviews
// @access  Private (Registered/Logged-in Visitors)
export const createReview = async (req, res) => {
  try {
    const { rating, comment, project, city } = req.body;

    // Validation
    const parsedRating = Number(rating);
    if (!parsedRating || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ message: "Please provide a valid rating between 1 and 5 stars." });
    }

    if (!comment || comment.trim().length < 5) {
      return res.status(400).json({ message: "Please provide a meaningful comment (at least 5 characters)." });
    }

    const targetProject = project || "WorkQuora";
    const targetCity = city || req.user.city || "India";
    const isVerified = req.user.authProvider === "google" || req.user.kycStatus === "verified";

    // Rate Limiting Check: 1 review per user (Allow Google Play Reviewer to re-test)
    const existingReview = await Review.findOne({ user: req.user._id });
    if (existingReview) {
      if (req.user.email === "playstore-reviewer@prashantjha.com") {
        existingReview.rating = parsedRating;
        existingReview.comment = comment.trim();
        existingReview.city = targetCity;
        existingReview.project = targetProject;
        existingReview.projectLink = PROJECT_LINKS[targetProject] || "";
        existingReview.verified = true;
        await existingReview.save();

        const updatedReview = await Review.findById(existingReview._id).populate(
          "user",
          "name email avatar city authProvider kycStatus"
        );
        return res.status(200).json(updatedReview);
      }
      return res.status(400).json({ message: "You have already submitted a review. Thank you for your feedback!" });
    }

    const review = await Review.create({
      user: req.user._id,
      project: targetProject,
      projectLink: PROJECT_LINKS[targetProject] || "",
      rating: parsedRating,
      comment: comment.trim(),
      city: targetCity,
      verified: isVerified,
    });

    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name email avatar city authProvider kycStatus"
    );

    return res.status(201).json(populatedReview);
  } catch (error) {
    console.error("[Create Review Error]:", error);
    if (error.code === 11000) {
      return res.status(400).json({ message: "You have already submitted a review." });
    }
    return res.status(500).json({ message: error.message || "Server error creating review." });
  }
};

// @desc    Delete a review (Author or Admin only)
// @route   DELETE /api/reviews/:id
// @access  Private
export const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    if (review.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this review." });
    }

    await review.deleteOne();
    return res.json({ message: "Review removed successfully." });
  } catch (error) {
    console.error("[Delete Review Error]:", error);
    return res.status(500).json({ message: "Server error deleting review." });
  }
};
